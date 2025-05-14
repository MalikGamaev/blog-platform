import React, { useEffect } from 'react'
import './EditArticle.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addTag,
  changeFlagCreate,
  changeTag,
  clearTag,
  deleteTag,
  fetchEditArticle,
} from '../../../store/reducers/articleReducer'

const EditArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tags = useSelector((state) => state.article.tagList)
  const currentTag = useSelector((state) => state.article.currentTag)
  const flagCreate = useSelector((state) => state.article.successArticle)

  const user =
    useSelector((state) => state.user.currentUser) || localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  const article =
    useSelector((state) => state.article.currentArticle) || localStorage.getItem('currentArticle')
      ? JSON.parse(localStorage.getItem('currentArticle'))
      : null
  const { slug } = article
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  })

  const onHandlerSubmit = async (data) => {
    await dispatch(fetchEditArticle({ ...data, tags, slug }))
  }

  const onAddTag = () => {
    if (currentTag.length > 0 && !tags.includes(currentTag)) dispatch(addTag(currentTag))
  }

  const onDeleteTag = (tag) => {
    dispatch(deleteTag(tag))
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
    <form onSubmit={handleSubmit(onHandlerSubmit)} className="edit-article">
      <h2>Edit article</h2>
      <div className="edit-article__title">
        <span className="edit-article__label">Title</span>
        <input
          {...register('title', {
            required: 'Title is required',
          })}
          className="edit-article__input input"
          style={{ borderColor: errors.title && '#F5222D' }}
          type="text"
          placeholder="Title"
        />
        {errors.title && <p className="error-text">{errors.title.message}</p>}
      </div>
      <div className="edit-article__description">
        <span className="edit-article__label">Short description</span>
        <input
          {...register('description', {
            required: 'Description is required',
          })}
          className="edit-article__input input"
          style={{ borderColor: errors.description && '#F5222D' }}
          type="text"
          placeholder="Short description"
        />
        {errors.description && <p className="error-text">{errors.description.message}</p>}
      </div>
      <div className="edit-article__text">
        <span className="edit-article__label">Text</span>
        <textarea
          {...register('body', {
            required: 'text is required',
          })}
          className="edit-article__text--textarea"
          style={{ borderColor: errors.body && '#F5222D' }}
          placeholder="Text"
        />
        {errors.body && <p className="error-text">{errors.body.message}</p>}
      </div>
      <div className="edit-article__tags">
        <span className="edit-article__label">Tags</span>
        <div className="edit-article__tag-list">
          {tags.length > 0 &&
            tags.map((tag) => (
              <div className="edit-article__tag">
                <input disabled value={tag} className="input edit-article__tag--input" type="text" />
                <button type="button" onClick={() => onDeleteTag(tag)} className="edit-article__tag--delete">
                  Delete
                </button>
              </div>
            ))}

          <div className="edit-article__tag">
            <input
              value={currentTag}
              onChange={changeCurrentTag}
              className="input edit-article__tag--input"
              type="text"
              placeholder="Tag"
            />
            <button type="button" onClick={onClearTag} className="edit-article__tag--delete">
              Delete
            </button>
            <button type="button" onClick={onAddTag} className="edit-article__tag--add">
              Add tag
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="edit-article__button">
        Send
      </button>
    </form>
  )
}

export default EditArticle
