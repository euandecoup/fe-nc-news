import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/api'
import { Link } from 'react-router-dom'

function ArticleList () {
const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchData("/articles").then(({articles}) => {
            setArticles(articles)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return <>
    <h2>So much content...</h2>
    <ul className='article-list'>
        {articles.map((article, index) => (
                <Link to={`/articles/${article.article_id}`} key={index}>
            <li className='article'>
                    <h3>{article.title}</h3>
                    <p>By {article.author}</p>
                    <img className="thumbnail-img" src={article.article_img_url}></img>
                    <p>Votes: {article.votes}</p>
            </li>
                </Link>
        ))}
    </ul>
    </>
}

export default ArticleList