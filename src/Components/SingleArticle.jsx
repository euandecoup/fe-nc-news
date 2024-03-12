import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";

function SingleArticleList () {
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { article_id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        fetchData(`/articles/${article_id}`).then(({article}) => {
            setArticle(article)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }, [article_id])

    return isLoading ? (
        <h2>Loading...</h2>
    ) : (
        <div className='article'>
            <h3>{article.title}</h3>
            <p>By {article.author}</p>
            <p>Votes: {article.votes}</p>
            <img className="article-img" src={article.article_img_url}></img>
            <p>{article.body}</p>
            <p>Posted: {new Date(article.created_at).toLocaleString()}</p>
            <div className="comments-list">

{/* if comments.length === 0 so much void OR  */}
                <h4>So much comment...</h4>
                <CommentsList />
            </div>
        </div>
    )
}

export default SingleArticleList