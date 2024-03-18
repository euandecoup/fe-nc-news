import React, {useState, useContext} from 'react'
import { postComment } from '../utils/api'
import UserContext from '../Contexts/User'

function CommentAdder ({article_id, setComments}) {
    const {loggedInUser} = useContext(UserContext)
    const [newComment, setNewComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)

    function handleCommentInput (e) {
        setNewComment(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault()
        if (newComment.trim() === '') {
            setError('Comment cannot be empty')
            return
        }
        setError(null)
        setIsSubmitting(true)
        postComment(article_id, {loggedInUser}, newComment)
        .then((newCommentFromApi) => {
            setNewComment('')
            setIsSubmitting(false)
            setComments((currComments) => {
                return [newCommentFromApi, ...currComments]
            })
        })
        .catch((err) => {
            console.log(err);
            setIsSubmitting(false)
            setError('Failed to post comment. Please try again.')
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>What did you think?</label>
            <textarea value={newComment} onChange={handleCommentInput} rows="4" placeholder="Enter a comment here..."></textarea>
            <p>{error}</p>
            <input type='submit' value='Add Comment' disabled={isSubmitting}/>
            {isSubmitting && <p>Posting comment...</p>}
        </form>
    )
}

export default CommentAdder