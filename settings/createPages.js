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
    reporter.panic('failed to create product pages', result.errors);
  }

  const products = result.data.api.products;

  products.forEach(product => {
    if (!product.categories.length) return null;

    actions.createPage({
      path: `${product.categories[0].name}/${product.slug}`,
      component: require.resolve('../src/templates/product.tsx'),
      context: {
        slug: product.slug,
      },
    });
  });
};

const createCategoriesPage = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      api {
        categories {
          id
          name
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create category pages', result.errors);
  }

  const categories = result.data.api.categories;

  categories.forEach(category => {
    actions.createPage({
      path: category.name,
      component: require.resolve('../src/templates/category.tsx'),
      context: {
        id: category.id,
      },
    });
  });
};

module.exports = {
  createProductsPage,
  createCategoriesPage,
};
