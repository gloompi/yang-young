import { graphql, useStaticQuery } from 'gatsby';

import { IColor } from 'types/common';

interface IResult {
  api: {
    colors: IColor[];
  };
}

export default () => {
  const result: IResult = useStaticQuery(graphql`
    query {
      api {
        colors {
          id
          name
        }
      }
    }
  `);

  return result.api.colors;
};
