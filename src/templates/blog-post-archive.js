import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Image from "gatsby-image"

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add posts to your content and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <SEO title="All posts" />


      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title

          const featuredImage = {
                fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
                alt: post.featuredImage?.node?.alt || ``,
                }

          return (
            <li key={post.uri}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.uri} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
	              {featuredImage?.fluid && (
	              <Image
	               fluid={featuredImage.fluid}
	               alt={featuredImage.alt}
	               style={{ marginBottom: 50 }}
	               />
	               )}
                  </h2>
                  <small>{post.date}</small>
                </header>
                <section itemProp="description">{parse(post.excerpt)}</section>
              </article>
            </li>
          )
        })}
      </ol>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
	featuredImage {
	        node {
		          altText
			            localFile {
				                childImageSharp {
						              fluid(maxWidth: 1000, quality: 100) {
							                      ...GatsbyImageSharpFluid_tracedSVG
									                    }
											                }
													          }
														          }
															        }
      }
    }
  }
`
