import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/api'
import { useParams, useSearchParams } from 'react-router-dom'
import CommentAdder from './CommentAdder'

function CommentsList ({loggedInUser}) {
    const [comments, setComments] = useState([])
    const { article_id } = useParams()

    useEffect(() => {
        const addToEndpoint = '/comments'
        fetchData(article_id, addToEndpoint).then(({comments}) => {
            setComments(comments)
        }).catch((err) => {
            console.log(err);
        })
    }, [article_id])

    return (
        <div className='comments-list'>
            <h4>{comments.length === 0 ? 'so much void...': 'So much comment...'}</h4>
            <CommentAdder article_id={article_id} loggedInUser={loggedInUser} setComments={setComments}/>
            {comments.map((comment) => (
                <div className='comment' key={comment.comment_id}>
                    <h4>{comment.username}</h4>
                    <p>{comment.body}</p>
                    <p>Votes: {comment.votes}</p>
                    <p>Posted: {new Date(comment.created_at).toLocaleString()}</p>
                </div>
            ))}
        </div>
    )
}

export default CommentsList