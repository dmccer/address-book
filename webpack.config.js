var webpack = require('webpack');
var path = require('path');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

module.exports = {
  watch: true,
  entry: {
    'score-rule': './src/asset/js/score-rule/index.js',
    my: './src/asset/js/my/index.js',
    login: './src/asset/js/login/index.js',
    'biz-card-certify': './src/asset/js/biz-card/certify/index.js',
    'biz-card-certified-ok': './src/asset/js/biz-card/certified-ok/index.js',
    'biz-card-certified-fail': './src/asset/js/biz-card/certified-fail/index.js',
    'lib-react': ['react', 'react-dom'],
    ved: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server']
  },
  output: {
    path: path.resolve(__dirname, pkg.dest),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  resolve: {
    alias: {
      zepto: path.resolve(__dirname, './node_modules/zepto/dist/zepto.js'),
      'lodash-fn': path.resolve(__dirname, './node_modules/lodash/function.js')
    }
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('ved', 'ved.bundle.js'),
    new webpack.optimize.CommonsChunkPlugin('zepto', 'zepto.bundle.js'),
    new webpack.ProvidePlugin({
      $: 'zepto',
      zepto: 'zepto',
      'window.zepto': 'zepto',
      'root.zepto': 'zepto'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: '我的 - 货运通讯录',
      template: './src/page/index.html',
      filename: 'index.html',
      chunks: ['ved', 'lib-react', 'zepto', 'my'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '积分规则 - 货运通讯录',
      template: './src/page/index.html',
      filename: 'score-rule.html',
      chunks: ['ved', 'lib-react', 'zepto', 'score-rule'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '登录 - 货运通讯录',
      template: './src/page/index.html',
      filename: 'login.html',
      chunks: ['ved', 'lib-react', 'zepto', 'login'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证 - 货运通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-certify.html',
      chunks: ['ved', 'lib-react', 'zepto', 'biz-card-certify'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证成功 - 货运通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-certified-ok.html',
      chunks: ['ved', 'lib-react', 'zepto', 'biz-card-certified-ok'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证失败 - 货运通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-certified-fail.html',
      chunks: ['ved', 'lib-react', 'zepto', 'biz-card-certified-fail'],
      inject: 'body'
    })
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'source-map'
    }],
    loaders: [{
      test: /\.less$/,
      loaders: [
        'style',
        'css',
        'less'
      ]
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css'
      ]
    }, {
      test: /\.(png|jpg|gif|svg|ttf)(#[a-zA-Z])*$/,
      loaders: [
        'url?limit=8192',
        'img'
      ]
    }, {
      test: /\.(html|htm)$/,
      loader: 'html-loader'
    }, {
      test: /\.(woff|eot)(#[a-zA-Z])*$/,
      loader: 'file-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [
        'react-hot',
        'babel?presets[]=react,presets[]=es2015'
      ]
    }, {
      test: /zepto(\.min)?\.js$/,
      loader: "exports?Zepto; delete window.$; delete window.Zepto;"
    }]
  },
  lessLoader: {
    lessPlugins: [
      new LessPluginCleanCSS({ advanced: true, keepSpecialComments: false }),
      new LessPluginAutoPrefix({ browsers: ['last 3 versions', 'Android 4'] })
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};
