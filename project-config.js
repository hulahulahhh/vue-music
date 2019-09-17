module.exports = {
    projectName: 'music-app',
    topDomain: true,
    css: {
      stylelint: false,
      sprites: false,
      globalResource: [],
      rem: {
        remUnit: 20
      }
    },
    dev: {
      proxy: {
        '/api': {
          target: 'https://u.y.qq.com',
          pathRewrite: {
            '^/api': ''
          },
        }
      },
      mock:false,
      allowedHosts: []
    }
  }
  