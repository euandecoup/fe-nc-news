import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useParams } from "react-router-dom";

function ArticleCard () {
    const [article, setArticle] = useState({})
    const { article_id } = useParams()

    useEffect(() => {
        fetchData(`/articles/${article_id}`).then(({article}) => {
            setArticle(article)
        }).catch((err) => {
            console.log(err);
        })
    }, [article_id])

    return (
        <div className='article'>
            <h3>{article.title}</h3>
            <p>By {article.author}</p>
            <p>Votes: {article.votes}</p>
            <img className="article-img" src={article.article_img_url}></img>
            <p>{article.body}</p>
            <p>Posted: {new Date(article.created_at).toLocaleString()}</p>
        </div>
    )
}

export default ArticleCard