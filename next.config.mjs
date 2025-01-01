/** @type {import('next').NextConfig} */
const config = {
  trailingSlash: false,
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    domains: ['res.cloudinary.com', 'gravatar.com', 'avatar.iran.liara.run', 'picsum.photos'],
  },
};

export default config;
