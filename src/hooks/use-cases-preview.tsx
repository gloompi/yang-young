import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

interface ICase {
  frontmatter: {
    id: string;
    imgSrc: { sharp: { fluid: FluidObject } };
    specialOffers: string[];
    title: string;
    subtitle: string;
    price: number;
  };
}

interface IResult {
  allMdx: {
    nodes: ICase[];
  };
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "case" } } }, limit: 3) {
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
