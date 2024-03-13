import React, { useEffect, useState } from "react";
import { fetchData, patchArticle } from "../utils/api";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";

function SingleArticleList () {
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [votes, setVotes] = useState(0)
    const [votesLoading, setVotesLoading] = useState(false)
    const { article_id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        fetchData(`/articles/${article_id}`).then((data) => {
            setArticle(data.article)
            setVotes(data.article.votes)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }, [article_id])

    function handleUpvote (article_id) {
        setVotesLoading(true)
        setVotes(votes +1)
        patchArticle(article_id, 1)
        .then((data) => {
            setVotes(data.article.votes)
            setVotesLoading(false)
            })
        .catch((err) => {
            console.log(err);
            setVotes(votes)
            setVotesLoading(false)
        })
    }

    function handleDownvote (article_id) {
        setVotesLoading(true)
        setVotes(votes -1)
        patchArticle(article_id, -1)
        .then((data) => {
            setVotes(data.article.votes)
            setVotesLoading(false)
            })
        .catch((err) => {
            console.log(err);
            setVotes(votes)
            setVotesLoading(false)
        })
    }

    return isLoading ? (
        <h2>Loading...</h2>
    ) : (
        <div className='article'>
            {article.title && <h3>{article.title}</h3>}
            {article.author && <p>By {article.author}</p>}
            <p>Votes: {votesLoading ? '...' : votes}</p>
            <button onClick={() => {handleUpvote(article.article_id)}}>
                <span aria-label="upvote this article"> 👍</span>
            </button>
            <button onClick={() => {handleDownvote(article.article_id)}}>
                <span aria-label="downvote for this article"> 👎</span>
            </button>
           {article.article_img_url && <img className="article-img" src={article.article_img_url}></img>}
            {article.body && <p>{article.body}</p>}
            {article.created_at && <p>Posted: {new Date(article.created_at).toLocaleString()}</p>}
            <div className="comments-list">
{/* if comments.length === 0 so much void OR  */}
                <h4>So much comment...</h4>
                <CommentsList />
            </div>
        </div>
    )
}

export default SingleArticleList