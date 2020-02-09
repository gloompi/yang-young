import { graphql, useStaticQuery } from 'gatsby';

import { IProduct } from 'types/common';

interface IResult {
  api: {
    products: IProduct[];
  };
}

export default () => {
  const { api }: IResult = useStaticQuery(graphql`
    query {
      api {
        products(category: 2, limit: 2) {
          slug
          title
          subtitle
          price
          coverImg
          categories {
            name
          }
          specialOffers {
            name
          }
        }
      }
    }
  `);

  return api.products;
};
