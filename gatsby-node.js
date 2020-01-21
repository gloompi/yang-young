const path = require('path');
const YAML = require('yamljs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');

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

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx(filter: { frontmatter: { id: { regex: "/item/" } } }) {
        nodes {
          frontmatter {
            id
            type
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create item pages', result.errors);
  }

  const items = result.data.allMdx.nodes;

  items.forEach(item => {
    actions.createPage({
      path: `${item.frontmatter.type}/${item.frontmatter.id}`,
      component: require.resolve('./src/templates/item.tsx'),
      context: {
        id: item.frontmatter.id,
      },
    });
  });
};
