const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = (options, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: argv.mode,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                  numericSeparator: false,
                  classPrivateProperty: false,
                  privateMethod: false,
                  classProperty: false,
                  functionBind: false,
                  decorators: false,
                  decoratorsBeforeExport: false,
                },
                transform: {
                  react: {
                    pragma: 'React.createElement',
                    pragmaFrag: 'React.Fragment',
                    throwIfNamespace: true,
                    development: false,
                    useBuiltins: false,
                  },
                  optimizer: {
                    globals: {
                      vars: {
                        __DEBUG__: 'true',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|xml)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new webpack.ProvidePlugin({
        React: 'react',
        '{ h }': 'preact',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      // bundle analyzer http://127.0.0.1:8888/
      new BundleAnalyzerPlugin({
        analyzerMode: isProd ? 'static' : 'server',
      }),
      isProd
        && new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          },
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      isProd
        && new WebpackObfuscator({
          rotateStringArray: true,
        }, []),
      isProd
        && new CopyPlugin({
          patterns: [
            'public',
          ],
        }),
    ].filter(Boolean),
    devServer: {
      hot: true,
      historyApiFallback: true,
    },
  };
};
