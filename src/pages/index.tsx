import React, { FC } from 'react';

import Layout from 'components/common/layout';
import SEO from 'components/common/seo';
import Section1 from 'components/home/section-1';

const IndexPage: FC = () => (
  <Layout>
    <SEO title="Home" />
    <Section1 />
  </Layout>
);

export default IndexPage;
