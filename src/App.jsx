import { useState } from 'react'
import './App.css'
import ArticleList from './Components/ArticleList'
import Header from './Components/Header'
import { Route, Routes } from 'react-router'
import UserContext from './Contexts/User'
import Home from './Components/Home'
import SingleArticleList from './Components/SingleArticleList'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "grumpy19",
    name: "jonny",
    avatar_url: "./assets/guest-user-250x250.jpg"
  })

  return (
    <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser}}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles" element={<ArticleList />}/>
        <Route path="/articles/:article_id" element={<SingleArticleList loggedInUser={loggedInUser}/>}/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
