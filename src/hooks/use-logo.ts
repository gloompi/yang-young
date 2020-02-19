import { graphql, useStaticQuery } from 'gatsby';

import { IImage } from 'types/common';

interface IResult {
  image: IImage;
  whiteImage: IImage;
}

export default () => {
  const data: IResult = useStaticQuery(graphql`
    query {
      image: imageSharp(fluid: { src: { regex: "/YANGYOUNG-LOGO/" } }) {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      whiteImage: imageSharp(fluid: { src: { regex: "/YANGYOUNG-LOGO/" } }) {
        fluid(
          quality: 100
          duotone: { highlight: "#ffffff", shadow: "#ffffff" }
        ) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `);

  return data;
};
