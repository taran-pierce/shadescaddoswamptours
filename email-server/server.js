// get env variables
const dotenv = require('dotenv');
dotenv.config();

const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env.CONNECTION_STRING;
const client = new EmailClient(connectionString);

const dev = process.env.NODE_ENV !== 'production';
const cors = require('cors');

// create allow list
let allowList = [].concat(process.env.ALLOW_LIST.split(','), (dev ? process.env.DEV_ALLOW_LIST.split(',') : []));

// set up CORS options
var corsOptions = {
  origin: [allowList],
  methods: 'POST',
  allowedHeaders: [
    'Accept',
    'Content-Type',
  ]
};

const port = process.env.PORT || 3000;

// set up express
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/**
 * @async
 * @param {string} name - Customer name
 * @param {string} email - Customer email
 * @param {string} message - Message to be emailed from the customer
 */
async function main(name, email, message) {
  if (!name || !email || !message) {
    throw new Error('Info is missing!');
  }
  
  // Message to site owner
  // set up message so we know who was viewing the form
  // this will be forwarded to another email
  let newMessage = `${name} has been viewing your website and has some questions.\n
  Email them back at their email address: ${email}\n\n\n
  Message from ${name}:\n
  ________________________________________\n
  ${message}
  `;

  // main site owner contact email
  const siteOwnerConacts = [
    {
      // address: process.env.SECONDARY_EMAIL,
      address: process.env.EXTRA_CONTACT_EMAIL,
    }
  ];

  // add extra monitoring email if it is set
  // if (process.env?.EXTRA_CONTACT_EMAIL) {
  //   siteOwnerConacts.push(
  //     { address: process.env.EXTRA_CONTACT_EMAIL }
  //   );
  // }

  // Azure Email
  const emailMessage = {
    senderAddress: process.env.AZURE_EMAIL,
    content: {
      subject: 'Website Contact Form',
      plainText: newMessage,
      html: newMessage,
    },
    recipients: {
      to: siteOwnerConacts,
    },
  };

  // Message for customer
  const customerMessage = `We have received your email and we will get in contact with you as soon as we can.\n

  Thank You, Shades Caddo Swamp Tours
  `;

  // Azure Email
  const customerEmailMessage = {
    senderAddress: process.env.AZURE_EMAIL,
    content: {
      subject: 'Website Contact Form',
      plainText: customerMessage,
      html: customerMessage
    },
    recipients: {
      to: [
        { address: email },
      ],
    },
  };

  // send email to site owner
  const poller = await client.beginSend(emailMessage);
  const result = await poller.pollUntilDone();

  // send email to customer
  const customerPoller = await client.beginSend(customerEmailMessage);
  const customerResult = await customerPoller.pollUntilDone();

  return {
    result,
    customerResult,
  };
} 

// data coming in from a form POST so parse it
app.use(bodyParser.urlencoded({extended: true}));

// route for sending the email requests
app.post('/send/mail', [cors(corsOptions)], (req, res, next) => {
  try {
    let reqBody = req.body;

    // TODO something aint right
    // when coming from the site verses command line the data structure is off
    // form possibly needs to submit differently, seems like jumping through extra hoops here
    if (!req?.body?.name) {
      reqBody = JSON.parse(Object.keys(req.body));
    }
  
    // set vars for incoming POST
    const {
      name,
      email,
      message,
    } = reqBody;
  
    console.log('Preparing to send email...');
    console.log(`${name} (${email})`);
  
    // use main to send email
    const sendMail = async () => {  
      const mailData = await main(name, email, message).catch((error) => {
        console.error;
  
        console.log(`There was an error: ${error} `);
  
        res.status(500).send({
          code: 500,
          message: 'Error sending email',
        });
      });
  
      // logging for now for debugging purposes
      console.log({
        mailData,
      });
  
      if (mailData?.customerResult?.status === 'Succeeded') {
        console.log(`Response was: ${mailData.customerResult.status}`);
        console.log(`email from: ${email}`);
  
        res.status(201).send({
          code: 201,
          message: mailData.customerResult.status,
        });
      }
  
      if (mailData?.customerResult?.error) {
        console.log(`There was an issue: ${mailData.customerResult.status}`);
        res.status(500).send({
          code: 500,
          message: mailData.customerResult.status,
        });
      }
  
      return mailData;
    };
  
    sendMail();
  } catch (error) {
    console.log({
      error,
    });
  }
})

// start server
app.listen(port, (err) => {
  if (err) {
    console.log('err: ', err);

    throw err
  }

  console.log(`Listening on ${port}`);
});
