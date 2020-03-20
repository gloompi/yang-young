import React, { FC } from 'react';
import { Link } from 'gatsby';

import Layout from 'components/common/layout';
import SEO from 'components/common/seo';

const NotFoundPage: FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
      }}
    >
      <h1>Transaction completed</h1>
      <Link to="/">Go to home page &larr;</Link>
    </div>
  </Layout>
);

export default NotFoundPage;
