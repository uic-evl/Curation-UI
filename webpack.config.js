const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const output_path = 'dist';


module.exports = {
  mode: 'development',
  entry: ['./src/index.jsx'],
  output: {
    path: path.resolve(__dirname, output_path),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'stage-2'],
        },
      }, {
        test: '/\.(jpe?g|png|gif)$/',
        use: [
          {
            loader: 'url-loader',
          }
        ],
      }, {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url-loader?limit=10000',
        exclude: /node_modules|SVGIcon\/icons/,
      }, {
        test: /\.(scss|css)$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    minimize: {
                        safe: true
                    }
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    autoprefixer: {
                        browsers: ["last 2 versions"]
                    },
                    plugins: () => [
                        autoprefixer
                    ]
                },
            },
            {
                loader: "sass-loader",
                options: {}
            }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      globals: path.resolve(process.cwd(), 'src', '_globals.scss'),
    },
    extensions: ['.scss', '.css', '.js', '.jsx'],
    mainFiles: ['index', 'index.jsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      'src',
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnError: false,
        },
        context: '/',
        postcss: [autoprefixer],
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'PUBLIC_PATH': JSON.stringify('images'),
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
