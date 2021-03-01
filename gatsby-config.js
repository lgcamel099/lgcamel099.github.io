module.exports = {
  siteMetadata: {
     siteUrl: `https://thetechreview.tk`,
	    },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          `http://cloudspy.ddns.net:12080/graphql`,
	production: {
           allow404Images: true
           },
        schema: {
         requestConcurrency: 20,
         previewRequestConcurrency: 20,
       }
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
              site {
              siteMetadata {
              title
              description
              siteUrl
                  }
              }
          }
        `,
      feeds: [
          {
          serialize: ({ query: { site, allWpPost } }) => {
          return allWpPost.edges.map(edge => {
          return Object.assign({}, edge.node, {
          description: edge.node.excerpt,
          date: edge.node.date,
          url: site.siteMetadata.siteUrl + edge.node.slug,
          guid: site.siteMetadata.siteUrl + edge.node.slug,
          custom_elements: [{ "content:encoded": edge.node.content }],
            })
           })
          },
      query: ` {
	                allWpPost(sort: {order: DESC, fields: date}) {
	                   edges {
                             node {
                               date
                               title
                               content
                        excerpt
                         slug
			 }
                        }
                  }
                }
              `,
      output: "/rss.xml",
      title: `RSS Feed`,
           },
       ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-5KJR6HSH0D", // Google Analytics / GA
        ],
      },
    },
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
       base64Width: 20,
       forceBase64Format: `webp`, // valid formats: png,jpg,webp
       useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
       stripMetadata: true,
       defaultQuality: 50,
       failOnError: true,
    },
  },
  {
      resolve: "gatsby-plugin-load-script",
       options: {
        id: "s9-sdk",
        async: true,
        defer: true,
        content: "2383da631ec84f069fe7833cc7e858b2",
        src: "/socialshare.min.js"
     },
   },

    `gatsby-transformer-sharp`,
    `gatsby-theme-90s`,

   {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gaming Origin`,
        short_name: `GO`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
     },
   },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
  ],
}
