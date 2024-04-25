import React, { useEffect, useState } from 'react'
import { fetchArticles } from '../utils/api'
import { Link, useSearchParams } from 'react-router-dom'

function ArticleList ({articles, setArticles}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const topic = searchParams.get('topic')
    const [sortSelect, setSortSelect] = useState(searchParams.get('sort_by') || 'created_at')
    const [orderSelect, setOrderSelect] = useState(searchParams.get('order') || 'desc')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchArticles(topic).then(({articles}) => {
            setArticles(articles)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
            setError('Failed to fetch articles. Please try again.')
        })
    }, [topic])

    function handleSortChange (e) {
        setSortSelect(e.target.value)
    }

    function handleOrderChange (e) {
        setOrderSelect(e.target.value)
    }

    function handleSubmit () {
        fetchArticles(topic, sortSelect, orderSelect)
            .then(({articles}) => {
                setArticles(articles)
                setSearchParams({sort_by: sortSelect, order: orderSelect})
            })
            .catch((err) => {
                console.log(err);
                setError('Failed to sort articles. Please try again.')
            })
   }

    return isLoading ? (
        <h2>Loading...</h2>
    ) : error ? (
        <p>{error}</p>
    ) : (<>
    <h2>So much content...</h2>
    <div>
        <select value={sortSelect} onChange={handleSortChange}>
            <option value="created_at">Date Added</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
        </select>
        <select value={orderSelect} onChange={handleOrderChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
        </select>
        <button onClick={handleSubmit}>Sort</button>
    </div>
    <ul className='article-list'>
        {articles.map((article, index) => (
                <Link to={`/articles/${article.article_id}`} key={index}>
            <li className='article'>
                    <h3>{article.title}</h3>
                    <p>By {article.author}</p>
                    <img className="thumbnail-img" src={article.article_img_url}></img>
                    <p>Votes: {article.votes}</p>
                    <p>Comments: {article.comment_count}</p>
            </li>
                </Link>
        ))}
    </ul>
    </>)
}

export default ArticleList