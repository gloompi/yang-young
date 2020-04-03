import { graphql, useStaticQuery } from 'gatsby';

import { ICountry } from 'types/common';

interface IResult {
  api: {
    countries: ICountry[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      api {
        countries {
          id
          name
          nameCN
        }
      }
    }
  `);

  return data.api.countries;
};
