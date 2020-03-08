import { graphql, useStaticQuery } from 'gatsby';

import { ICategory } from 'types/common';

interface IResult {
  api: {
    categories: ICategory[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      api {
        categories {
          id
          name
          title
          titleCN
        }
      }
    }
  `);

  return data.api.categories;
};
