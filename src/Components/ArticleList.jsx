import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/api'

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
            <li className='article' key={index}>
                <h2>{article.title}</h2>
                <p>By {article.author}</p>
                <p>Votes: {article.votes}</p>
            </li>
        ))}
    </ul>
    </>
}

export default ArticleList