const pwaBuilder = require('razzle-plugin-pwa').default
const path = require('path');

const pwaConfig = {
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /images/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: new RegExp(
        '^https://fonts.(?:googleapis|gstatic).com/(.*)'
      ),
      handler: 'cacheFirst'
    },
    {
      urlPattern: /.*/,
      handler: 'networkFirst'
    }
  ]
};

const manifestConfig = {
  background_color: '#ffffff',
  description: 'Razzle Rocks!',
  display: 'fullscreen',
  filename: 'manifest.json',
  name: 'Razzle App',
  orientation: 'portrait',
  related_applications: [],
  short_name: 'Razzle',
  start_url: '.',
  theme_color: '#ffffff',
  icons: [
    {
      src: path.resolve('public/icon.png'),
      sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
    }
  ]
};

const pwaPlugin = pwaBuilder({ pwaConfig, manifestConfig })

module.exports = {
  plugins: [
    { func: pwaPlugin },
  ],
};
