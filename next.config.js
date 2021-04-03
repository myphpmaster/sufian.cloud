const webpack = require('webpack');
 
module.exports = {
  trailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  },
  env: {  
	MONGODB_URI: process.env.MONGODB_URI,
	MONGODB_DB: process.env.MONGODB_DB
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