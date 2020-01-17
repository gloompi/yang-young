import { graphql, useStaticQuery } from 'gatsby';

import { IItem } from 'types/common';

interface IMixed {
  frontmatter: IItem;
}

interface IResult {
  case: IMixed;
  holder: IMixed;
  charger: IMixed;
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      case: mdx(frontmatter: { type: { eq: "case" } }) {
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
      holder: mdx(frontmatter: { type: { eq: "holder" } }) {
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
      charger: mdx(frontmatter: { type: { eq: "charger" } }) {
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
  `);

  return Object.values(data).map(item => ({ ...item.frontmatter }));
};
