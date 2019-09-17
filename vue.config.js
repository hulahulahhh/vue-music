const path = require('path');
const Config = require('webpack-chain');
// const webpackApiMocker = require('mocker-api');
const projectConfig = require('./project-config');
// const SpritesmithPlugin = require('webpack-spritesmith');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
// const CodeframeFormatter = require('stylelint-codeframe-formatter');

// const isDev = process.env.NODE_ENV === 'development';
// const isTestEnv = process.env.VUE_APP_ENV === 'test';
// const appServerHost = process.env.APP_HOST;
// const APP_NS = process.env.APP_NS;

console.log('hello');


module.exports = {
//   baseUrl: isDev
//   ? '/'
//   : `//${appServerHost}/sy/project/${projectConfig.projectName}/${APP_NS}`,
  /**
   * https://github.com/neutrinojs/webpack-chain
   * @param {Config} webpackConfig
   */
  // prettier-ignore
  chainWebpack(webpackConfig) {
    const context = webpackConfig.store.get('context');
    const resolve = (...paths) => path.resolve(context, ...paths);

    // console.log(webpackConfig)

    // --------- Rem ---------
    webpackConfig.when(typeof projectConfig.css.rem === 'object', config => {
      config
        .plugin('html')
          .tap(args => {
            args[0].remUnit = projectConfig.css.rem.remUnit;
            return args;
      });
    });



  },
  // prettier-ignore-end
  crossorigin: '',
  devServer: {
    allowedHosts: [
      ...projectConfig.dev.allowedHosts,
    ],
    // before(app) {
    //   if (projectConfig.dev.mock) {
    //     webpackApiMocker(app, path.resolve('./mock/index.ts'));
    //   }
    // },
    proxy: projectConfig.dev.proxy,
  }
};
