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
        }
      }
    }
  `);

  return result.api.categories;
};
