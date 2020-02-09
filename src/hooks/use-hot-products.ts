import { graphql, useStaticQuery } from 'gatsby';

import { IProduct } from 'types/common';

interface IResult {
  api: {
    products: IProduct[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      api {
        products(hot: true, limit: 6) {
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

  return data.api.products;
};
