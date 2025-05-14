import React, { useEffect } from 'react'
import './Profile.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditProfile } from '../../../store/reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)

  const user = currentUser || localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    defaultValues: {
      username: user?.username ?? '',
      email: user?.email ?? '',
      image: user?.image ?? '',
    },
  })

  const onHandlerSubmit = async (data) => {
    await dispatch(fetchEditProfile(data))
  }

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
      reset()
    }
  }, [user, navigate, reset])

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onHandlerSubmit)} className="profile">
      <h2>Edit Profile</h2>
      <div className="profile__data">
        <div className="profile__username">
          <span className="profile__label">Username</span>
          <input
            className="input"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Your username must have at least 3 characters' },
              maxLength: { value: 20, message: 'Your username should have no more than 20 characters' },
            })}
            style={{ borderColor: errors.username && '#F5222D' }}
            placeholder="Username"
          />
          {errors.username && <p className="error-text">{errors.username.message}</p>}
        </div>
        <div className="profile__email">
          <span className="profile__label">Email adress</span>
          <input
            className="input"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /(^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/,
                message: 'Email incorrect',
              },
            })}
            style={{ borderColor: errors.email && '#F5222D' }}
            placeholder="Email adress"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div className="profile__password">
          <span className="profile__label">New password</span>
          <input
            className="input"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Your password must have at least 6 characters' },
              maxLength: { value: 40, message: 'Your password should have no more than 40 characters' },
            })}
            style={{ borderColor: errors.password && '#F5222D' }}
            placeholder="Password"
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>
        <div className="profile__ava">
          <span className="profile__label">Avatar image (url)</span>
          <input
            {...register('image', {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/[^\s]*)?$/,
                message: 'URL incorrect',
              },
            })}
            type="text"
            className="input"
            placeholder="Avatar image"
          />
        </div>
      </div>
      <button className="profile__button">Save</button>
    </form>
  )
}

export default Profile
