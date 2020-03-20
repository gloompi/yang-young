import { graphql, useStaticQuery } from 'gatsby';

import { ITemplatePage } from 'types/common';

interface IResult {
  api: {
    templatePages: ITemplatePage[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      api {
        templatePages {
          id
          title
          titleCN
          content
          contentCN
          coverImg
        }
      }
    }
  `);

  return data.api.templatePages;
};
