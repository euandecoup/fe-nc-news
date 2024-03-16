import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-8had.onrender.com/api"
})

export const fetchArticles = (topic, sort_by = 'created_at', order = 'desc') => {
    return newsApi.get('/articles', {params: {topic, sort_by, order}})
    .then((response) => {
        return response.data
    })
}

export const fetchArticleById =  (article_id) => {
    return newsApi.get(`/articles/${article_id}`)
    .then((response) => {
        return response.data
    })
}

export const fetchCommentByArticleId =  (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`)
    .then((response) => {
        return response.data
    })
}

export const fetchTopics =  () => {
    return newsApi.get(`/topics`)
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