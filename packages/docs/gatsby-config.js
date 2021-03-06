require('dotenv').config();

module.exports = {
    siteMetadata: {
        title: `MBKit`,
        description: `Discover our component library and learn our best practices for content and design`,
        author: `@czaas`,
    },
    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-layout`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: '2rb53inahems',
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                downloadLocal: true,
                environment: process.env.NODE_ENV === 'development' ? 'content-updates' : 'content-updates', // change back to master after full deploy
            },
        },
        `@contentful/gatsby-transformer-contentful-richtext`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
