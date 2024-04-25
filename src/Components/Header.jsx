import React, { useContext } from 'react'
import UserContext from '../Contexts/User'
import { Link } from 'react-router-dom'

function Header () {
    const {loggedInUser} = useContext(UserContext)

    return (
    <div>
        <h1>NC News</h1>
        <h2>Greetings {loggedInUser.username}!</h2>
        <nav className='main-nav'>
            <Link className="nav-item" key={'Home'} to={`/`}>Home</Link>
            <Link className="nav-item" key={'Articles'} to={'/articles'}>Articles</Link>
            <Link className="nav-item" key={'Topics'} to={'/topics'}>Topics</Link>
            <a>Users</a>
        </nav>
    </div>
    )
}

export default Header