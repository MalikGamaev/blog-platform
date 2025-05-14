import React, { useEffect } from 'react'
import './CreateArticle.scss'
import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addCreateTag,
  changeFlagCreate,
  changeTag,
  clearTag,
  deleteCreateTag,
  fetchCreateArticle,
} from '../../../store/reducers/articleReducer'

const CreateArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tags = useSelector((state) => state.article.createTags)
  const currentTag = useSelector((state) => state.article.currentTag)
  const flagCreate = useSelector((state) => state.article.successArticle)
  const user =
    useSelector((state) => state.user.currentUser) || localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const onHandlerSubmit = async (data) => {
    await dispatch(fetchCreateArticle({ ...data, tags }))
  }

  const onAddTag = () => {
    if (currentTag.length > 0 && !tags.includes(currentTag)) dispatch(addCreateTag(currentTag))
  }

  const onDeleteTag = (tag) => {
    dispatch(deleteCreateTag(tag))
  }

  const onClearTag = () => {
    dispatch(clearTag())
  }

  const changeCurrentTag = (e) => {
    dispatch(changeTag(e.target.value))
  }

  useEffect(() => {
    if (flagCreate) {
      navigate('/')
      reset()
      dispatch(changeFlagCreate())
    }
  }, [flagCreate, navigate, reset, dispatch])

  useEffect(() => {
    if (!user) navigate('/sign-in')
  }, [])

  return (
    <form onSubmit={handleSubmit(onHandlerSubmit)} className="create-article">
      <h2>Create new article</h2>
      <div className="create-article__title">
        <span className="create-article__label">Title</span>
        <input
          {...register('title', {
            required: 'Title is required',
          })}
          className="create-article__input input"
          style={{ borderColor: errors.title && '#F5222D' }}
          type="text"
          placeholder="Title"
        />
        {errors.title && <p className="error-text">{errors.title.message}</p>}
      </div>
      <div className="create-article__description">
        <span className="create-article__label">Short description</span>
        <input
          {...register('description', {
            required: 'Description is required',
          })}
          className="create-article__input input"
          style={{ borderColor: errors.description && '#F5222D' }}
          type="text"
          placeholder="Short description"
        />
        {errors.description && <p className="error-text">{errors.description.message}</p>}
      </div>
      <div className="create-article__text">
        <span className="create-article__label">Text</span>
        <textarea
          {...register('body', {
            required: 'text is required',
          })}
          className="create-article__text--textarea"
          style={{ borderColor: errors.body && '#F5222D' }}
          placeholder="Text"
        />
        {errors.body && <p className="error-text">{errors.body.message}</p>}
      </div>
      <div className="create-article__tags">
        <span className="create-article__label">Tags</span>
        <div className="create-article__tag-list">
          {tags.length > 0 &&
            tags.map((tag) => (
              <div className="create-article__tag">
                <input disabled value={tag} className="input create-article__tag--input" type="text" />
                <button type="button" onClick={() => onDeleteTag(tag)} className="create-article__tag--delete">
                  Delete
                </button>
              </div>
            ))}
          <div className="create-article__tag">
            <input
              value={currentTag}
              onChange={changeCurrentTag}
              className="input create-article__tag--input"
              type="text"
              placeholder="Tag"
            />
            <button type="button" onClick={onClearTag} className="create-article__tag--delete">
              Delete
            </button>
            <button type="button" onClick={onAddTag} className="create-article__tag--add">
              Add tag
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="create-article__button">
        Send
      </button>
    </form>
  )
}

export default CreateArticle
