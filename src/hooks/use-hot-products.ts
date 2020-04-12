import { graphql, useStaticQuery } from 'gatsby';

import { IProduct } from 'types/common';

interface IResult {
  api: {
    allProducts: IProduct[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      api {
        allProducts(hot: true, limit: 6) {
          slug
          title
          titleCN
          subtitle
          subtitleCN
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
  `);

  return data.api.allProducts;
};
