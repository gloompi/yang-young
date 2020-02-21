import { graphql, useStaticQuery } from 'gatsby';

import { ICategory } from 'types/common';

interface IResult {
  api: {
    categories: ICategory[];
  };
}

export default () => {
  const result: IResult = useStaticQuery(graphql`
    query {
      api {
        categories {
          id
          name
          title
          coverImg
          products {
            slug
            title
            subtitle
            price
            coverImg
            animatedImg
            categories {
              name
            }
            specialOffers {
              name
            }
          }
        }
      }
    }
  `);

  return result.api.categories.map(category => ({
    ...category,
    products: category.products.slice(0, 2),
  }));
};
