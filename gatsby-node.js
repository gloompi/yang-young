const path = require('path');
const YAML = require('yamljs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');

const { createProductsPage } = require('./settings/createPages');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
      new CopyWebpackPlugin(
        [
          {
            from: SRC_DIR + '/locales/**/*.yml',
            to: DIST_DIR + '/[path]/[name].json',
            transform: content => JSON.stringify(YAML.parse(content.toString())),
            toType: 'template',
            context: SRC_DIR,
          },
        ],
      ),
    ],
  });
};

exports.createPages = async (props) => {
  await createProductsPage(props);
};
