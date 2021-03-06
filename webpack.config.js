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
    'private-msg-send': './src/asset/js/message/private/send/index.js',
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
      react: path.resolve(__dirname, './node_modules/react/'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/index.js'),
      zepto: path.resolve(__dirname, './node_modules/zepto/dist/zepto.js')
    }
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'ved',
      chunks: ['ved']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'zepto',
      chunks: ['zepto']
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'lib-react',
    //   chunks: ['react', 'react-dom']
    // }),
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
      title: '我的 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'index.html',
      chunks: ['ved', 'zepto', 'my'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '积分规则 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'score-rule.html',
      chunks: ['ved', 'zepto', 'score-rule'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '登录 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'login.html',
      chunks: ['ved', 'zepto', 'login'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '实名认证 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-certify.html',
      chunks: ['ved', 'zepto', 'biz-card-certify'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证成功 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-certified-ok.html',
      chunks: ['ved', 'zepto', 'biz-card-certified-ok'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证失败 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-certified-fail.html',
      chunks: ['ved', 'zepto', 'biz-card-certified-fail'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片认证申请已提交 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-certified.html',
      chunks: ['ved', 'zepto', 'biz-card-certified'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '通讯录 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'address-book.html',
      chunks: ['ved', 'zepto', 'address-book'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '通讯录详情 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'address-book-detail.html',
      chunks: ['ved', 'zepto', 'address-book-detail'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'my-biz-card.html',
      chunks: ['ved', 'zepto', 'my-biz-card'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片交换 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-swap.html',
      chunks: ['ved', 'zepto', 'biz-card-swap'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片管理 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-manage.html',
      chunks: ['ved', 'zepto', 'biz-card-manage'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片搜索 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'search-biz-card.html',
      chunks: ['ved', 'zepto', 'search-biz-card'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '管理分组 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'group-manage.html',
      chunks: ['ved', 'zepto', 'group-manage'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '新建名片 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-create.html',
      chunks: ['ved', 'zepto', 'biz-card-create'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片详情 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-detail.html',
      chunks: ['ved', 'zepto', 'biz-card-detail'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '消息 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'message.html',
      chunks: ['ved', 'zepto', 'message'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '私信列表 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'private-msg-list.html',
      chunks: ['ved', 'zepto', 'private-msg-list'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '选择通讯录类型 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'select-ab-type.html',
      chunks: ['ved', 'zepto', 'select-ab-type'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '新建通讯录 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'create-ab.html',
      chunks: ['ved', 'zepto', 'create-ab'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '成员搜索 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'ab-member-search.html',
      chunks: ['ved', 'zepto', 'ab-member-search'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片交换申请消息 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-application-msg.html',
      chunks: ['ved', 'zepto', 'biz-card-application-msg'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '名片交换回复消息 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'biz-card-reply-msg.html',
      chunks: ['ved', 'zepto', 'biz-card-reply-msg'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '通讯录申请审核消息 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'ab-application-msg-list.html',
      chunks: ['ved', 'zepto', 'ab-application-msg-list'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '通讯录申请回复消息 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'ab-reply-msg-list.html',
      chunks: ['ved', 'zepto', 'ab-reply-msg-list'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '搜索通讯录 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'search-ab.html',
      chunks: ['ved', 'zepto', 'search-ab'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: '发送私信 - 物流通讯录',
      template: './src/page/index.html',
      filename: 'private-msg-send.html',
      chunks: ['ved', 'zepto', 'private-msg-send'],
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
      },
      '/pim/*': {
        target: 'http://m.yqkyun.com/',
        // target: 'http://api.ttyhuo.com:83/mvc/',
        secure: false
      },
      '/mvc/pim/*': {
        target: 'http://api.ttyhuo.com:83',
        secure: false
      },
      '/mvc/v2/*': {
        target: 'http://api.ttyhuo.com:85',
        secure: false
      }
    }
  }
};
