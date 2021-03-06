import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const author = data.ghostAuthor
    const post = data.ghostPost
    const twitterUrl = post.primary_author.twitter ? `https://twitter.com/${post.primary_author.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = post.primary_author.facebook ? `https://www.facebook.com/${post.primary_author.facebook.replace(/^\//, ``)}` : null

    return (
            <>
                <MetaData
                    data={data}
                    location={location}
                    type="article"
                />
                <Layout>
                    <div className="container">
                        <article className="content">
                            { post.feature_image ?
                                <figure className="post-feature-image">
                                    <img src={post.feature_image} alt={post.title} title={post.title}/>
                                </figure> : null }
                            <section className="post-full-content">
                                <h1 className="content-title">{post.title}</h1>
                                <div >
                                    <header className="author-header">
                                        <div className="author-header-content">
                                            <h2>By {post.primary_author.name}</h2>
                                            {/* {post.primary_author.bio && <p>{post.primary_author.bio}</p>} */}
                                        </div>
                                        <div className="author-header-image-top">
                                            {post.primary_author.profile_image && <img src={post.primary_author.profile_image} alt={post.primary_author.name} />}
                                        </div>
                                    </header>
                                </div>
                                <hr />
                                {/* The main post content */ }
                                <section
                                    className="content-body load-external-scripts"
                                    dangerouslySetInnerHTML={{ __html: post.html }}
                                />
                                {/* Author div page bottom*/}
                                <hr />
                                <div >
                                    <header className="author-header">
                                        <div className="author-header-content">
                                            <h1>About the author</h1>
                                            <h2>{post.primary_author.name}</h2>
                                            {post.primary_author.bio && <p>{post.primary_author.bio}</p>}
                                            <div className="author-header-meta">
                                                {post.primary_author.website && <a className="author-header-item" href={post.primary_author.website} target="_blank" rel="noopener noreferrer">Github</a>}
                                                {/* {post.primary_author.twitterUrl && <a className="author-header-item" href={post.primary_author.twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>} */}
                                                {/* {post.primary_author.facebookUrl && <a className="author-header-item" href={post.primary_author.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>} */}
                                                {twitterUrl && <a className="author-header-item" href={twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>}
                                                {facebookUrl && <a className="author-header-item" href={facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>}
                                            </div>
                                            {/* <div>
                                                <span className="author-location">{post.primary_author.location}</span>.<span className="author-stats">{post.primary_author.stats}</span>
                                            </div> */}
                                        </div>
                                        <div className="author-header-image">
                                            {post.primary_author.profile_image && <img src={post.primary_author.profile_image} alt={post.primary_author.name} />}
                                        </div>
                                    </header>
                                </div>
                            </section>
                        </article>
                    </div>
                </Layout>
            </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
