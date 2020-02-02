const createProductsPage = async ({ actions, graphql, reporter }) => {
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
      component: require.resolve('../src/templates/item.tsx'),
      context: {
        id: item.frontmatter.id,
      },
    });
  });
};

module.exports = {
  createProductsPage,
};
