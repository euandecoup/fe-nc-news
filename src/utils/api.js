import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-8had.onrender.com/api"
})

export const fetchData =  (article_id, addToEndpoint) => {
    let endpoint = '/articles'
    if (article_id) {
        endpoint += `/${article_id}`
    }
    if (addToEndpoint) {
        endpoint += addToEndpoint
    }
    return newsApi.get(endpoint)
    .then((response) => {
        return response.data
    })
}

export const patchArticle = (article_id, voteChange) => {
    const patchBody = {
        inc_votes: voteChange
    }
    return newsApi.patch(`/articles/${article_id}`, patchBody)
    .then((response) => {
        return response.data
    })
}

export const postComment = (article_id, loggedInUser, newCommentText) => {
    const {username} = loggedInUser.loggedInUser
    const postBody = {
        username: username,
        body: newCommentText
    }
    return newsApi.post(`/articles/${article_id}/comments`, postBody)
    .then(({data}) => {
        return data.comment
    })
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`)
}