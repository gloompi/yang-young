import { graphql, useStaticQuery } from 'gatsby';

import { IItem } from 'types/common';

interface ICase {
  frontmatter: IItem;
}

interface IResult {
  allMdx: {
    nodes: ICase[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "protector" } } }, limit: 1) {
        nodes {
          frontmatter {
            id
            title
            subtitle
            price
            specialOffers
            imgSrc {
              sharp: childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.allMdx.nodes.map(({ frontmatter }) => ({ ...frontmatter }));
};
