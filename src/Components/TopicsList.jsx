import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import capitaliseFirstLetter from "../utils/capitaliseFirstLetter";
import { fetchTopics } from "../utils/api";

function TopicsList () {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetchTopics().then(({topics}) => {
            setTopics(topics)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
            setError('Failed to fetch topics. Please try again.')
        })
    }, [])

    return isLoading ? (
        <h2>Loading...</h2>
    ) : error ? (
        <p>{error}</p>
    ) : (<>
    <h2>So topical...</h2>
    <ul className='topic-list'>
        {topics.map((topic, index) => (
                <Link to={`/articles?topic=${topic.slug}`} key={index}>
            <li className='topic'>
                    <h3>{capitaliseFirstLetter(topic.slug)}</h3>
                    <p>{topic.description}</p>
            </li>
                </Link>
        ))}
    </ul>
    </>)
}

export default TopicsList