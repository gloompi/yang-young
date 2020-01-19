import { useStaticQuery, graphql } from 'gatsby';

export interface IDeliverable {
  frontmatter: {
    title: string;
    slug: string;
    icon: string;
  };
  body: string;
}

export interface IPrettyDeliverable {
  title: string;
  slug: string;
  icon: string;
  body: string;
}

interface IResponse {
  allMdx: {
    nodes: IDeliverable[];
  };
}

export default (): IPrettyDeliverable[] => {
  const response: IResponse = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: frontmatter___slug, order: ASC }
        filter: { frontmatter: { slug: { regex: "/deliverable/" } } }
      ) {
        nodes {
          frontmatter {
            slug
            title
            icon
          }
          body
        }
      }
    }
  `);

  return response.allMdx.nodes.map(deliverable => ({
    title: deliverable.frontmatter.title,
    slug: deliverable.frontmatter.slug,
    icon: deliverable.frontmatter.icon,
    body: deliverable.body,
  }));
};
