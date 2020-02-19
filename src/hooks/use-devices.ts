import { graphql, useStaticQuery } from 'gatsby';

import { IDevice } from 'types/common';

interface IResult {
  api: {
    devices: IDevice[];
  };
}

export default () => {
  const result: IResult = useStaticQuery(graphql`
    query {
      api {
        devices {
          id
          name
        }
      }
    }
  `);

  return result.api.devices;
};
