import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/api'
import { useParams } from 'react-router-dom'

function CommentsList () {
    const [comments, setComments] = useState([])
    const { article_id } = useParams()

    useEffect(() => {
        fetchData(`/articles/${article_id}/comments`).then(({comments}) => {
            setComments(comments)
        }).catch((err) => {
            console.log(err);
        })
    }, [article_id])

    return (
        <div className='comments-list'>
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