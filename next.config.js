/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  headers: () => [
    {
      source: "/homefeed",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};
