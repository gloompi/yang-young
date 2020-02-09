const createProductsPage = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      api {
        products {
          slug
          categories {
            name
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create item pages', result.errors);
  }

  const products = result.data.api.products;

  products.forEach(product => {
    actions.createPage({
      path: `${product.categories[0].name}/${product.slug}`,
      component: require.resolve('../src/templates/product.tsx'),
      context: {
        slug: product.slug,
      },
    });
  });
};

module.exports = {
  createProductsPage,
};
