import React, { useContext, useEffect, useState } from "react";
import { fetchArticleById, patchArticle } from "../utils/api";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import UserContext from "../Contexts/User";

function SingleArticleList () {
    const {loggedInUser} = useContext(UserContext)
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [votes, setVotes] = useState(0)
    const [votesLoading, setVotesLoading] = useState(false)
    const { article_id } = useParams()

    useEffect(() => {
        setIsLoading(true)
        fetchArticleById(article_id).then((data) => {
            setArticle(data.article)
            setVotes(data.article.votes)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }, [article_id])

    function handleUpvote (article_id) {
        setVotesLoading(true)
        setVotes((currentVotes) => currentVotes +1)
        patchArticle(article_id, 1)
        .then((data) => {
            setVotes(data.article.votes)
            setVotesLoading(false)
            })
        .catch((err) => {
            console.log(err);
            setVotes((currentVotes) => currentVotes -1)
            setVotesLoading(false)
        })
    }

    function handleDownvote (article_id) {
        setVotesLoading(true)
        setVotes((currentVotes) => currentVotes -1)
        patchArticle(article_id, -1)
        .then((data) => {
            setVotes(data.article.votes)
            setVotesLoading(false)
            })
        .catch((err) => {
            console.log(err);
            setVotes((currentVotes) => currentVotes +1)
            setVotesLoading(false)
        })
    }

    return isLoading ? (
        <h2>Loading...</h2>
    ) : (
        <div className='article'>
            <div className="article-header">
                <h3>{article.title}</h3>
                <p>By {article.author}</p>
                <p>Votes: {votesLoading ? '...' : votes}</p>
                <button onClick={() => {handleUpvote(article.article_id)}}>
                    <span aria-label="upvote this article"> 👍</span>
                </button>
                <button onClick={() => {handleDownvote(article.article_id)}}>
                    <span aria-label="downvote for this article"> 👎</span>
                </button>
            </div>
           <img className="article-img" src={article.article_img_url}></img>
            <p>{article.body}</p>
            <p>Posted: {new Date(article.created_at).toLocaleString()}</p>
            <div className="comments-list">
                <CommentsList loggedInUser={loggedInUser}/>
            </div>
        </div>
    )
}

export default SingleArticleList