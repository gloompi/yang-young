import React, { FC } from 'react';
import { Link } from 'gatsby';

import Layout from 'components/common/layout';
import SEO from 'components/common/seo';

const SecondPage: FC = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">&larr;Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
