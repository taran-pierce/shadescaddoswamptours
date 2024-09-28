import Head from 'next/head';
import cloudinary from 'cloudinary';
import Hero from '../src/components/Hero';
import PhotoGallery from '../src/components/PhotoGallery'
import SplitContent from '../src/components/SplitContent';
import { getContent } from '../src/utils/contentfulService.js';

export default function Page({
  content,
  photoGalleryImages,
}) {
  const {
    splitContentSections,
    hero,
  } = content || null;

  return (
    <main>
      <Head>
        <title>{content.pageTitle}</title>
        <link rel="canonical" href="https://www.shadescaddoswamptours.com/photo-gallery" />
      </Head>
      {splitContentSections && splitContentSections.map((splitContentSection) => (
        <SplitContent
          key={splitContentSection.sys.id}
          contentfulData={splitContentSection}
          imageFirst={splitContentSection?.fields?.imageFirst}
        />
      ))}
      <PhotoGallery images={photoGalleryImages} />
    </main>
  );
}

export async function getStaticProps() {
  cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  // ID for Contentful "Page" entry
  const page = await getContent("5MlBXoVESzysHVpF5ELFJY");
  const content = page;


  // get images from Cloudinary tagged with 'gallery'
  const photoGalleryImages = await cloudinary.v2.api.resources_by_tag('gallery', {
    max_results: 50,
  }).then((res) => {
    const imageArray = res?.resources;

    return imageArray;
  });

  return {
    props: {
      content,
      photoGalleryImages,
    },
  }
}
