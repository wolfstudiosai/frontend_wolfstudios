/** @type {import('next').NextConfig} */
const config = {
  trailingSlash: false,
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'gravatar.com',
      'avatar.iran.liara.run',
      'picsum.photos',
      'images.unsplash.com',
      'bryrhmtbdhskxqbdbryf.supabase.co',
      'cdn.prod.website-files.com',
      'regular-media.s3.eu-north-1.amazonaws.com',
    ],
  },
};

export default config;
