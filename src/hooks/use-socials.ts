import { graphql, useStaticQuery } from 'gatsby';

import { ISocial } from 'types/common';

interface IResult {
  api: {
    socials: ISocial[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      api {
        socials {
          id
          name
          faIcon
          link
        }
      }
    }
  `);

  return data.api.socials;
};
