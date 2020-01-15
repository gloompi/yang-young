import React, { FC } from 'react';

import Layout from 'components/common/layout';
import SEO from 'components/common/seo';
import Banner from 'components/home/banner';
import Section1 from 'components/home/section-1';
import Section2 from 'components/home/section-2';
import Section3 from 'components/home/section-3';

const IndexPage: FC = () => (
  <Layout>
    <SEO title="Home" />
    <Section1 />
    <Banner />
    <Section2 />
    <Section3 />
  </Layout>
);

export default IndexPage;
