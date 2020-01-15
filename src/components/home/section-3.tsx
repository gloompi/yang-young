import React, { FC } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';

interface IResponse {
  bgImg: {
    fluid: {
      src: string;
    };
  };
}

const Section1: FC = () => {
  const response: IResponse = useStaticQuery(graphql`
    query {
      bgImg: imageSharp(fluid: { originalName: { eq: "bg-1.png" } }) {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `);

  return <BackgroundImage bgImgSrc={response.bgImg.fluid.src} />;
};

const BackgroundImage: StyledComponent<
  {},
  { bgImgSrc: string },
  {}
> = styled.section`
  height: 100vh;
  width: 100%;
  background: url(${props => props.bgImgSrc || ''}) no-repeat center;
  background-size: cover;
`;

export default Section1;
