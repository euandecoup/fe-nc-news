import React, { useContext } from 'react'
import UserContext from '../Contexts/User'
import { Link } from 'react-router-dom'

function Header () {
    const {loggedInUser} = useContext(UserContext)

    return (
    <div>
        <h1>NC News</h1>
        <p>Greetings {loggedInUser.username}!</p>
        <img id= 'itemImg' src={loggedInUser.avatar_url}></img>
        <nav className='main-nav'>
            <Link className="link" key={'Home'} to={`/`}>Home</Link>
            <Link className="link" key={'Articles'} to={'/articles'}>Articles</Link>
            <Link className="link" key={'Topics'} to={'/topics'}>Topics</Link>
            <a>Users</a>
        </nav>
    </div>
    )
}

export default Header