import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-8had.onrender.com/api"
})

export const fetchData =  (endpoint) => {
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