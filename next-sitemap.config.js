/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rhythmicbytes.vercel.app", // 🔁 replace with your domain
  generateRobotsTxt: true, // (optional)
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/panel"], // pages you don't want to include
};
