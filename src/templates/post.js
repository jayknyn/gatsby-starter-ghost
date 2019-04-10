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
    const post = data.ghostPost

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
                                    <img src={ post.feature_image } alt={ post.title } />
                                </figure> : null }
                            <section className="post-full-content">
                                <h1 className="content-title">{post.title}</h1>
                                <div className="container">
                                        {/* <div className="post-card-avatar">
                                            {post.primary_author.profile_image ?
                                                <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
                                                <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
                                            }
                                        </div> */}
                                    <header className="author-header">
                                        <div className="author-header-content">
                                            <h2>By {post.primary_author.name}</h2>
                                            {post.primary_author.bio && <p>{post.primary_author.bio}</p>}
                                        </div>
                                        <div className="author-header-image">
                                            {post.primary_author.profile_image && <img src={post.primary_author.profile_image} alt={post.primary_author.name} />}
                                        </div>
                                    </header>
                                </div>
                                {/* The main post content */ }
                                <section
                                    className="content-body load-external-scripts"
                                    dangerouslySetInnerHTML={{ __html: post.html }}
                                />
                                <div className="container">
                                    <header className="author-header">
                                        <div className="author-header-content">
                                            <h2>{post.primary_author.name}</h2>
                                            {post.primary_author.bio && <p>{post.primary_author.bio}</p>}
                                            <div className="author-header-meta">
                                                {post.primary_author.website && <a className="author-header-item" href={post.primary_author.website} target="_blank" rel="noopener noreferrer">Website</a>}
                                                {twitterUrl && <a className="author-header-item" href={twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>}
                                                {facebookUrl && <a className="author-header-item" href={facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>}
                                            </div>
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
