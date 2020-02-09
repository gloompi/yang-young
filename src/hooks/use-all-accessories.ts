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
        products(category: 2) {
          slug
          title
          subtitle
          price
          coverImg
          specialOffers {
            name
          }
        }
      }
    }
  `);

  return data.api.products;
};
