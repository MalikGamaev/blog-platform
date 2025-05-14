import React from 'react'
import './ArticleList.scss'
import { format } from 'date-fns'
import ava from '../../../assets/avatar.png'
import { normalDescription, normalTag, normalTitle } from '../../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddFavorited, fetchDeleteFavorited, fetchGetArticle } from '../../../store/reducers/articleReducer'

const ArticleItem = ({ data }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.currentUser) || localStorage.getItem('user')

  const onHandlerArticle = async (e) => {
    e.preventDefault()
    await dispatch(fetchGetArticle(data.slug))
    navigate(`/articles/${data.slug}/`)
  }

  const onHandlerLiked = async () => {
    if (!user) return
    if (localStorage.getItem(data.slug) === 'true') {
      localStorage.setItem(data.slug, 'false')
      await dispatch(fetchDeleteFavorited(data.slug))
    } else {
      localStorage.setItem(data.slug, 'true')
      await dispatch(fetchAddFavorited(data.slug))
    }
  }

  return (
    <li className="article-item">
      <div className="article-item__left">
        <div className="article-item__title">
          <Link onClick={onHandlerArticle} to={`/articles/${data.slug}`}>
            {normalTitle(data.title)}
          </Link>
          <div className="article-item__like">
            <button
              onClick={onHandlerLiked}
              className={
                localStorage.getItem(data.slug) === 'true' && user
                  ? 'article-item__liked--button'
                  : 'article-item__like--button'
              }
            ></button>
            {data.favoritesCount}
          </div>
        </div>
        <div className="article-item__tags">
          {data.tagList.length > 0 &&
            data.tagList.map((tag) => {
              if (tag !== '') {
                return <button className="article-item__tag">{normalTag(tag)}</button>
              }
              return
            })}
        </div>
        <div className="article-item__description">{normalDescription(data.description)}</div>
      </div>
      <div className="article-item__right">
        <div className="article-item__profile">
          {data.author.username}
          <div className="article-item__date">{format(data.createdAt, 'MMMM d, y')}</div>
        </div>
        <img src={data.author.image || ava} alt="avatar" className="article-item__avatar" />
      </div>
    </li>
  )
}

export default ArticleItem
