'use client';

export default function imageLoader({
  src,
  width,
  quality,
}) {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`;
  
  return `${baseUrl}${src}?w=${width}&q=${quality || 70}`;
}
