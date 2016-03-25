var webpack = require('webpack');
var path = require('path');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/');

var pkg = require('./package.json');

module.exports = {
  watch: true,
  entry: {
    'score-rule': './src/asset/js/score-rule/index.js',
    my: './src/asset/js/my/index.js',
    login: './src/asset/js/login/index.js',
    'group-manage': './src/asset/js/biz-card/group-manage/index.js',
    'search-biz-card': './src/asset/js/biz-card/search/index.js',
    'biz-card-create': './src/asset/js/biz-card/create/index.js',
    'biz-card-detail': './src/asset/js/biz-card/detail/index.js',
    'my-biz-card': './src/asset/js/biz-card/my/index.js',
    'biz-card-swap': './src/asset/js/biz-card/swap/index.js',
    'biz-card-manage': './src/asset/js/biz-card/manage/index.js',
    'biz-card-certify': './src/asset/js/biz-card/certify/index.js',
    'biz-card-certified-ok': './src/asset/js/biz-card/certified-ok/index.js',
    'biz-card-certified-fail': './src/asset/js/biz-card/certified-fail/index.js',
    'biz-card-certified': './src/asset/js/biz-card/certified/index.js',
    'address-book': './src/asset/js/address-book/home/index.js',
    'address-book-detail': './src/asset/js/address-book/detail/index.js',
    'message': './src/asset/js/message/index.js',
    'private-msg-list': './src/asset/js/message/private/index.js',
    'select-ab-type': './src/asset/js/address-book/create/select-ab-type/index.js',
    'create-ab': './src/asset/js/address-book/create/index.js',
    'ab-member-search': './src/asset/js/address-book/member-search/index.js',
    'ab-application-msg-list': './src/asset/js/message/ab-application/index.js',
    'ab-reply-msg-list': './src/asset/js/message/ab-reply/index.js',
    'biz-card-application-msg': './src/asset/js/message/biz-card-application/index.js',
    'biz-card-reply-msg': './src/asset/js/message/biz-card-reply/index.js',
    'search-ab': './src/asset/js/address-book/search/index.js',
    'private-msg-send': './src/asset/js/message/private/send/index.js'
  },
  output: {
    path: path.resolve(__dirname, pkg.dest),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react/'),
      // 'react-dom': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom.min.js'),
      fetch: path.resolve(__dirname, './node_modules/whatwg-fetch/')
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'lib-react',
    //   chunks: ['react', 'react-dom']
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'fetch',
      chunks: ['fetch']
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      title: '我的 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'index.html',
      chunks: ['fetch', 'my'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '积分规则 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'score-rule.html',
      chunks: ['fetch', 'score-rule'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '登录 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'login.html',
      chunks: ['fetch', 'login'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '实名认证 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-certify.html',
      chunks: ['fetch', 'biz-card-certify'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证成功 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-certified-ok.html',
      chunks: ['fetch', 'biz-card-certified-ok'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证失败 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-certified-fail.html',
      chunks: ['fetch', 'biz-card-certified-fail'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证申请已提交 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-certified.html',
      chunks: ['fetch', 'biz-card-certified'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '通讯录 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'address-book.html',
      chunks: ['fetch', 'address-book'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '通讯录详情 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'address-book-detail.html',
      chunks: ['fetch', 'address-book-detail'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'my-biz-card.html',
      chunks: ['fetch', 'my-biz-card'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片交换 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-swap.html',
      chunks: ['fetch', 'biz-card-swap'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片管理 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-manage.html',
      chunks: ['fetch', 'biz-card-manage'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片搜索 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'search-biz-card.html',
      chunks: ['fetch', 'search-biz-card'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '管理分组 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'group-manage.html',
      chunks: ['fetch', 'group-manage'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '新建名片 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-create.html',
      chunks: ['fetch', 'biz-card-create'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片详情 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-detail.html',
      chunks: ['fetch', 'biz-card-detail'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '消息 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'message.html',
      chunks: ['fetch', 'message'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '私信列表 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'private-msg-list.html',
      chunks: ['fetch', 'private-msg-list'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '选择通讯录类型 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'select-ab-type.html',
      chunks: ['fetch', 'select-ab-type'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '新建通讯录 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'create-ab.html',
      chunks: ['fetch', 'create-ab'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '成员搜索 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'ab-member-search.html',
      chunks: ['fetch', 'ab-member-search'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片交换申请消息 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-application-msg.html',
      chunks: ['fetch', 'biz-card-application-msg'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片交换回复消息 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'biz-card-reply-msg.html',
      chunks: ['fetch', 'biz-card-reply-msg'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '通讯录申请审核消息 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'ab-application-msg-list.html',
      chunks: ['fetch', 'ab-application-msg-list'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '通讯录申请回复消息 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'ab-reply-msg-list.html',
      chunks: ['fetch', 'ab-reply-msg-list'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '搜索通讯录 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'search-ab.html',
      chunks: ['fetch', 'search-ab'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '发送私信 - 物流通讯录',
      template: './src/page/index.ejs',
      filename: 'private-msg-send.html',
      chunks: ['fetch', 'private-msg-send'],
      inject: 'body'
    })
  ],
  module: {
    noParse: /\.min\.js$/,
    preLoaders: [{
      test: /\.js?$/,
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
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [
        'react-hot',
        'babel-loader'
      ]
    }, {
      test: /zepto(\.min)?\.js$/,
      loader: "exports?Zepto; delete window.$; delete window.Zepto;"
    }]
    // noParse: [pathToReact]
  },
  lessLoader: {
    lessPlugins: [
      new LessPluginCleanCSS({ advanced: true, keepSpecialComments: false }),
      new LessPluginAutoPrefix({ browsers: ['last 3 versions', 'Android 4'] })
    ]
  }
};
