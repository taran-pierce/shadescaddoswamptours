import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

import styles from './form.module.scss';

export default function Form() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({
    hasError: false,
    message: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    // set loading state in case the post takes a while for some reason
    setIsLoading(true);

    const contactForm = document.getElementById('contact') as HTMLFormElement;
    const formData = new FormData(contactForm);

    const rawFormData = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const url = process.env.NEXT_PUBLIC_CONTACT_FORM_URL as string;

      // send info to the form
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(rawFormData),
      }).then((response) => response.json())
        .then((data) => {
          // if response was bad, set error state
          if (data?.code === 500) {
            setHasError({
              hasError: true,
              message: 'There was an error, please try again later',
            });
          }

          // if a 201 comes back then show submission as success
          if (data?.code === 201) {
            setHasSubmitted(true);
          }

          return data;
        }).catch((error) => {
          console.error('Error: ', error);
        })

  
      // turn loading state off
      setIsLoading(false);
    } catch (error: any) {
      console.log({
        error,
      });
      // set error state
      setHasError({
        hasError: true,
        message: error?.message,
      });

      // turn off loading if we know we have an error
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.formWrapper}>
      {isLoading && (
        <LoadingSpinner />
      )}
      {hasError.hasError && (
        <div className={styles.errorMessageWrapper}>
          <p>Looks like we had an issue sending the email!</p>
          <p>Please try again later or contact via phone.</p>
        </div>
      )}
      <h3>Contact via email</h3>
      {!hasSubmitted && (
        <form
          onSubmit={(e: React.FormEvent<HTMLElement>) => handleSubmit(e)}
          id="contact"
          className={styles.form}
        >
          <fieldset disabled={isLoading}>
            <label id="name" htmlFor="name">Name: 
              <input
                id="name"
                type="text"
                name="name"
                placeholder='Name'
                required
                className={`${hasError.hasError ? styles.hasError : ''}`}
              />
            </label>
            <label id="email" htmlFor="email">Email: 
              <input
                id="email"
                name="email"
                type="email"
                placeholder='Email'
                required
                className={`${hasError.hasError ? styles.hasError : ''}`}
              />
            </label>
            <label id="message" htmlFor="message">Message: 
              <textarea
                id="message"
                name="message"
                required
                className={`${hasError.hasError ? styles.hasError : ''}`}
              ></textarea>
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      )}
      {hasSubmitted && (
        <div>
          <h4>Thank you!</h4>
          <p>We will be in contact with you as soon as we can!</p>
        </div>
      )}
    </div>
  );
};
