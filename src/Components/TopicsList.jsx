import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import capitaliseFirstLetter from "../utils/capitaliseFirstLetter";
import { fetchTopics } from "../utils/api";

function TopicsList ({articles}) {
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        fetchTopics().then(({topics}) => {
            setTopics(topics)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return <>
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
    </>
}

export default TopicsList