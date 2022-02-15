module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
};
