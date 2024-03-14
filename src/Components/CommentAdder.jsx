import React, {useState} from 'react'
import { postComment } from '../utils/api'

function CommentAdder ({article_id, loggedInUser, setComments}) {
    const [newComment, setNewComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleCommentInput (e) {
        setNewComment(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault()
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
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Write a comment...</label>
            <input type='text' value={newComment} onChange={handleCommentInput}></input>
            <input type='submit' value='Add Comment' disabled={isSubmitting}/>
        </form>
    )
}

export default CommentAdder