/**
 * @type {import('next').NextConfig}
 */

const { i18n } = require('./next-i18next.config');
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n,
})
