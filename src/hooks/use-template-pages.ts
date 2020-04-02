import { graphql, useStaticQuery } from 'gatsby';

import { ITemplateCategory } from 'types/common';

interface IResult {
  api: {
    templateCategories: ITemplateCategory[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      api {
        templateCategories {
          id
          name
          nameCN
          templates {
            id
            title
            titleCN
            coverImg
            content
            contentCN
          }
        }
      }
    }
  `);

  return data.api.templateCategories;
};
