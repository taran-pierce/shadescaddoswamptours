import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const getContent = async (id) => {
  try {
    const response = await client.getEntries().then((entries) => {
      const { items } = entries;

      const selectedItem = items && items.filter((item) => item.sys.id === id)[0];

      if (!selectedItem) {
        // we had an issue
        return null;
      }

      const content = selectedItem.fields;

      return content;
    });

    return response;
  } catch (error) {
    console.error('Error fetching content from Contentful:', error);
    return null;
  }
};
