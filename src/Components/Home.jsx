import React, { useEffect, useState } from 'react'
import { fetchArticles } from '../utils/api'
import { Link } from 'react-router-dom'

function Home () {
    const [topArticle, setTopArticle] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchArticles().then(({articles}) => {
            const sortedArticles = articles.sort((a, b) => b.votes - a.votes)
            setTopArticle(sortedArticles[0])
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    })

    return isLoading ? (
        <h2>Loading...</h2>
    ) : (
        <div>
            <h2>Top Voted Article</h2>
            {topArticle && (
                <Link to={`/articles/${topArticle.article_id}`} key={topArticle.article_id}>
                    <div className='article'>
                        <h3>{topArticle.title}</h3>
                        <p>By {topArticle.author}</p>
                        <img className="thumbnail-img" src={topArticle.article_img_url}></img>
                        <p>Votes: {topArticle.votes}</p>
                        <p>{topArticle.body}</p>
                        <p>Comments: {topArticle.comment_count}</p>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Home