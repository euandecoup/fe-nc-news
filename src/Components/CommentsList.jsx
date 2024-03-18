import React, { useEffect, useState, useContext } from 'react'
import { deleteComment, fetchCommentByArticleId } from '../utils/api'
import { useParams} from 'react-router-dom'
import CommentAdder from './CommentAdder'
import UserContext from '../Contexts/User'

function CommentsList () {
    const {loggedInUser} = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState(null)
    const { article_id } = useParams()

    useEffect(() => {
        fetchCommentByArticleId(article_id).then(({comments}) => {
            setComments(comments)
        }).catch((err) => {
            console.log(err);
        })
    }, [article_id])

    function handleDeleteComment (comment_id) {
        setIsDeleting(true)
        deleteComment(comment_id)
        .then(() => {
            setComments((currentComments) => {
                return currentComments.filter((comment) => comment.comment_id !== comment_id)
            })
            setIsDeleting(false)
        })
        .catch((err) => {
            console.log(err);
            setIsDeleting(false)
            setError('Failed to delete comment. Please try again.')
        })
    }

    return (
        <div className='comments-list'>
            <h4>{comments.length === 0 ? 'so much void...': 'So much comment...'}</h4>
            <CommentAdder article_id={article_id} setComments={setComments}/>
            {error && <p>{error}</p>}
            {comments.map((comment) => (
                <div className='comment' key={comment.comment_id}>
                    <h4>{comment.username}</h4>
                    <p>{comment.body}</p>
                    <p>Votes: {comment.votes}</p>
                    <p>Posted: {new Date(comment.created_at).toLocaleString()}</p>
                    {loggedInUser.username === comment.author && (
                        <button onClick={() => handleDeleteComment(comment.comment_id)} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete Comment'}
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CommentsList