import Head from 'next/head';
import cloudinary from 'cloudinary';
import Hero from '../src/components/Hero';
import SplitContent from '../src/components/SplitContent';
import { getContent } from '../src/utils/contentfulService.js';

export default function Page({
  content,
  heroImageData,
}) {
  const {
    splitContentSections,
    hero,
  } = content || null;

  return (
    <main>
      <Head>
        <title>{content.pageTitle}</title>
        <link rel="canonical" href="https://www.shadescaddoswamptours.com/directions" />
      </Head>
      {hero && (
        <Hero
          imagePath={hero.fields.imageName}
          alt={hero.fields.imageAltText}
          heroImageData={heroImageData}
        />
      )}
      {splitContentSections && splitContentSections.map((splitContentSection) => (
        <SplitContent
          key={splitContentSection.sys.id}
          contentfulData={splitContentSection}
          imageFirst={splitContentSection?.fields?.imageFirst}
        />
      ))}
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
  const page = await getContent("6m4YtcsvZ9FwHbRrNPgCVa");
  const content = page;

  // get hero image info so we can preload the image since it is above the fold
  const heroImageData = await cloudinary.v2.api.resources_by_tag('hero').then((res) => {
    const heroData = res.resources;

    return heroData;
  });

  return {
    props: {
      content,
      heroImageData,
    },
  };
}
