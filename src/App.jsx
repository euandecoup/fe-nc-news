import { useState } from 'react'
import './App.css'
import ArticleList from './Components/ArticleList'
import Header from './Components/Header'
import { Route, Routes } from 'react-router'
import UserContext from './Contexts/User'
import Home from './Components/Home'
import SingleArticleList from './Components/SingleArticle'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "Guest",
    name: "Guest",
    avatar_url: "./assets/guest-icon-orange.png"
  })

  return (
    <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser}}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles" element={<ArticleList />}/>
        <Route path="/articles/:article_id" element={<SingleArticleList />}/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
