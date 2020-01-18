import { FluidObject } from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

export interface ISlide {
  frontmatter: {
    slug: string;
    title: string;
    label: string;
    image: {
      sharp: {
        fluid: FluidObject;
      };
    };
  };
  excerpt: string;
}

export interface IPrettySlide {
  title: string;
  slug: string;
  label: string;
  fluid: FluidObject;
  body: string;
  prev: IPrettySlide | null;
  next: IPrettySlide | null;
}

interface IResponse {
  allMdx: {
    nodes: ISlide[];
  };
}

export default (): IPrettySlide[] => {
  const response: IResponse = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: frontmatter___slug }
        filter: { frontmatter: { slug: { regex: "/slide/" } } }
      ) {
        nodes {
          frontmatter {
            slug
            title
            label
            image: img {
              sharp: childImageSharp {
                fluid(maxWidth: 900) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          excerpt
        }
      }
    }
  `);

  const nodes = response.allMdx.nodes;
  const initialAcc: { prev: IPrettySlide | null; result: IPrettySlide[] } = {
    prev: null,
    result: [],
  };

  const { result } = nodes.reduce((acc, slide) => {
    const item = {
      slug: slide.frontmatter.slug,
      title: slide.frontmatter.title,
      label: slide.frontmatter.label,
      fluid: slide.frontmatter.image.sharp.fluid,
      body: slide.excerpt,
      prev: acc.prev,
      next: null,
    };

    if (acc.prev !== null) {
      acc.prev.next = item;
    }

    return {
      prev: item,
      result: [...acc.result, item],
    };
  }, initialAcc);

  return result;
};
