// const withSass = require('@zeit/next-sass');
// module.exports = withSass();

const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');

module.exports = withCSS(withSass({
  webpack: (config, { isServer }) => {
    if (isServer) return config;
    return commonsChunkConfig(config, /\.(sass|scss|css)$/);
  },
}));
