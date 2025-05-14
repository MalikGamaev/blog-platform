import React, { useEffect } from 'react'
import './Article.scss'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { Popconfirm } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { normalTag, normalTitle } from '../../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import {
  changeFlagCreate,
  fetchAddFavorited,
  fetchDeleteArticle,
  fetchDeleteFavorited,
} from '../../../store/reducers/articleReducer'

const Article = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentArticle = useSelector((state) => state.article.currentArticle)

  const user = useSelector((state) => state.user.currentUser) || JSON.parse(localStorage.getItem('user'))

  const data = currentArticle ? currentArticle : JSON.parse(localStorage.getItem('currentArticle'))
  const { title, slug, description, body, tagList, createdAt, author, favorited, favoritesCount } = data
  const flagArticle = useSelector((state) => state.article.successArticle)

  const confirm = async () => {
    await dispatch(fetchDeleteArticle(slug))
  }

  const onHandlerLiked = async () => {
    if (!user) return
    if (favorited) {
      await dispatch(fetchDeleteFavorited(slug))
    } else {
      await dispatch(fetchAddFavorited(slug))
    }
  }

  useEffect(() => {
    if (flagArticle) {
      navigate('/articles/')
      dispatch(changeFlagCreate())
      localStorage.removeItem('currentArticle')
    }
  }, [flagArticle, navigate, dispatch])

  return (
    <div className="article">
      <div className="article__header">
        <div className="article__left">
          <div className="article__title">
            {normalTitle(title)}
            <div className="article__like">
              <button
                onClick={onHandlerLiked}
                className={
                  favorited && user ? 'article__liked--button' : 'article__like--button'
                }
              ></button>
              {favoritesCount}
            </div>
          </div>
          <div className="article__tags">
            {tagList.length > 0 &&
              tagList.map((tag) => {
                if (tag !== '') {
                  return <button className="article__tag">{normalTag(tag)}</button>
                }
              })}
          </div>
          <div className="article__description">{description}</div>
        </div>
        <div className="article__right">
          <div className="article__profile">
            {author.username}
            <div className="article__date">{format(createdAt, 'MMMM d, y')}</div>
          </div>
          <img src={author.image} alt="avatar" className="article__avatar" />
          {user.username === author.username && (
            <div className="article__change">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this article?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
                placement={'right'}
              >
                <button className="article__change-delete">Delete</button>
              </Popconfirm>
              <Link to={`/articles/${data.slug}/edit`} className="article__change-edit">
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="article__text">
        <Markdown>{body}</Markdown>
      </div>
    </div>
  )
}

export default Article
