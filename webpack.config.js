const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader');

const isDevMode = process.env.NODE_ENV === 'dev' ? true : false;
const isBuildImageMode = process.env.BUILD_IMAGE === 'true' ? true : false;

const outputDir = 'dist';
const ejsDir = './src/ejs/pages/';

const getHtmlWebpackPlugin = (key, pageData, isProductsPage = false) => {
  const options = {
    htmlLoaderOption: {
      sources: false,
      minimize: false
    },
    templatePath: `${ejsDir}${key}.ejs`,
  };
  // テンプレートに渡すJSONデータを設定
  if (typeof pageData !== 'undefined') {
    options.templateEjsLoaderOption = { data: pageData };
  }
  // html出力先、ファイル名の設定
  let filename = '';

  if (isProductsPage) {
    filename = `../products/${pageData.id}/index.html`;
  } else if (key === 'index') {
    filename = `../index.html`;
  } else {
    filename = `../${key}/index.html`;
  }

  return new HtmlWebpackPlugin({
    filename,
    template: htmlWebpackPluginTemplateCustomizer(options),
    inject: false,
    minify: false,
  });
};

const htmlGlobPlugins = () => {
  const productsData = require('./src/json/products.json');
  const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, `${ejsDir}**/*.ejs`)], {
    ignore: path.resolve(__dirname, `${ejsDir}**/_*.ejs`),
  })();
  // プロダクトページは、後段で別途処理するため削除
  delete entries.products;

  const pagePlugins = Object.keys(entries).map(key => getHtmlWebpackPlugin(key, { productsData }));
  const productsPagePlugins = productsData.map(value => getHtmlWebpackPlugin('products', value, true));
  const plugins = pagePlugins.concat(productsPagePlugins);

  return plugins;
};

const initPlugins = () => {
  let plugins = [
    new MiniCssExtractPlugin({
      filename: '../css/style.css',
    }),
    ...htmlGlobPlugins(),
  ];

  /**
   * yarn build:image 実行時は以下も含める
   * 画像圧縮、WebP変換、/dist/images ディレクトリ削除、画像コピー（/src -> /dist）
   */
  if (isBuildImageMode) {
    plugins = plugins.concat([
      new CopyWebpackPlugin({
        patterns: [{
          from: 'src/images/',
          to: path.join(__dirname, `${outputDir}/images`)
        }],
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: path.join(__dirname, `${outputDir}/images/*`),
      }),
      new ImageMinimizerPlugin({
        test: /\.(png|jpe?g)$/i,
        minimizer: {
          filename: '[path][name].webp',
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              webp: {
                lossless: 1,
              },
            },
          },
        },
        deleteOriginalAssets: false,
      }),
      new ImageMinimizerPlugin({
        test: /\.(png|jpe?g)$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 85,
              },
              oxipng: {
                level: 3,
                interlace: false,
              }
            },
          },
        },
      }),
    ]);
  }

  return plugins;
}

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  devServer: {
    static: path.resolve(__dirname, outputDir),
    open: true
  },
  target: 'web',
  entry: path.join(__dirname, 'src/js/app.js'),
  output: {
    path: path.join(__dirname, `${outputDir}/js`),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ['html-loader','template-ejs-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }]
              ],
            },
          },
        ],
      },
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: isDevMode,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevMode,
              plugins: [require('autoprefixer')({})]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevMode
            }
          }
        ]
      }
    ],
  },
  plugins: initPlugins(),
};