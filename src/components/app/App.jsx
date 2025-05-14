import { Route, Router, Routes } from 'react-router-dom'
import Header from '../header/Header'
import Article from '../pages/artcle/Article'
import ArticleList from '../pages/article-list/ArticleList'
import CreateArticle from '../pages/create-article/CreateArticle'
import EditArticle from '../pages/edit-article/EditArticle'
import Profile from '../pages/profile/Profile'
import SignIn from '../pages/sign-in/SignIn'
import SignUp from '../pages/sign-up/SignUp'
import './App.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetArticle, fetchGetArticles } from '../../store/reducers/articleReducer'

const App = () => {
  const slug = useSelector((state) => state.article.slug)

  const dispatch = useDispatch()
  console.log(localStorage.getItem('currentArticle'))

  useEffect(() => {
    if (slug === '') return

    dispatch(fetchGetArticle(slug))
  }, [slug, dispatch])

  useEffect(() => {
    dispatch(fetchGetArticles())
  }, [])

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/" element={<ArticleList />} />
        <Route path="/articles/:id/" element={<Article />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:id/edit" element={<EditArticle />} />
      </Routes>
    </div>
  )
}

export default App
