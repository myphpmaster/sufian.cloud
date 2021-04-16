const webpack = require('webpack');
 
module.exports = {
  trailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  },
  env: {  
	MONGODB_URI_AZURE: process.env.MONGODB_URI,
  MONGODB_URI_ALIBABA: process.env.MONGODB_URI_ALIBABA,
	MONGODB_DB: process.env.MONGODB_DB,
  MONGODB_SERVER: process.env.MONGODB_SERVER,
  MONGODB_FORM_ID: process.env.MONGODB_FORM_ID,
  MONGODB_FORM_PATH: process.env.MONGODB_FORM_PATH,
  FORMIO_URL: process.env.FORMIO_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  SECRET: process.env.SECRET,
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  FACEBOOK_ID: process.env.FACEBOOK_ID,
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    
      config.node = {
        fs: 'empty',
        dns: 'empty',
        net: 'empty',
        tls: 'empty',
        module: 'empty',
        aws4: 'empty',
      }
      
      config.plugins.push(new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
      }))
      
      // Important: return the modified config
      return config;
  }
}