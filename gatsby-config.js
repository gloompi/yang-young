module.exports = {
  siteMetadata: {
    title: `Yang Yong`,
    description: `Iphone cases`,
    author: `gloompi`,
  },
  plugins: [
    'gatsby-plugin-typescript',
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'API',
        fieldName: 'api',
        url: `https://yang-young.herokuapp.com/graphql/`,
        refetchInterval: 60,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/common/layout.tsx'),
        },
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-images' },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'slides',
        path: `${__dirname}/src/assets/slides`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'deliverables',
        path: `${__dirname}/src/assets/deliverables`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `yang-young`,
        short_name: `YY`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png`,
      },
    },
  ],
};
