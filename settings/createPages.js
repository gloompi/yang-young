const createProductsPage = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      api {
        allProducts {
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

  const products = result.data.api.allProducts;

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

const createTemplatePage = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      api {
        templatePages {
          id
          title
          titleCN
          content
          contentCN
          coverImg
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create template pages', result.errors);
  }

  const templatePages = result.data.api.templatePages;

  templatePages.forEach(templatePage => {
    actions.createPage({
      path: templatePage.title,
      component: require.resolve('../src/templates/page.tsx'),
      context: {
        id: templatePage.id,
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
      path: `category/${category.name}`,
      component: require.resolve('../src/templates/category.tsx'),
      context: {
        id: category.id,
      },
    });
  });
};

const createSubCategoriesPage = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      api {
        subcategories {
          id
          name
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create subcategory pages', result.errors);
  }

  const subcategories = result.data.api.subcategories;

  subcategories.forEach(subcategory => {
    actions.createPage({
      path: `subcategory/${subcategory.name}`,
      component: require.resolve('../src/templates/subcategory.tsx'),
      context: {
        id: subcategory.id,
      },
    });
  });
};

module.exports = {
  createProductsPage,
  createCategoriesPage,
  createSubCategoriesPage,
  createTemplatePage,
};
