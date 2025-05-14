import React, { useEffect } from 'react'
import './SignIn.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserLogin } from '../../../store/reducers/userReducer'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signInError = useSelector((state) => state.user.signInErr)
  const isLogin = useSelector((state) => state.user.isLogin)
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onHandlerSubmit = async (data) => {
    await dispatch(fetchUserLogin(data))
  }

  useEffect(() => {
    if (isLogin) {
      navigate('/')
      reset()
    }
  }, [isLogin, navigate, reset])

  return (
    <form onSubmit={handleSubmit(onHandlerSubmit)} className="sign-in">
      <h2>Sign In</h2>
      <div className="sign-in__data">
        <div className="sign-in__email">
          <span className="sign-in__label">Email adress</span>
          <input
            {...register('email', { required: 'Email is required' })}
            style={{ borderColor: (signInError || errors.email) && '#F5222D' }}
            className="input"
            placeholder="Email adress"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
          {signInError && <p className="error-text">Email or password is invalid</p>}
        </div>
        <div className="sign-in__password">
          <span className="sign-in__label">Password</span>
          <input
            {...register('password', { required: 'Password is required' })}
            style={{ borderColor: (signInError || errors.password) && '#F5222D' }}
            className="input"
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>
      </div>
      <div className="sign-in__footer">
        <button type="submit" className="sign-in__button">
          Login
        </button>
        <div className="sign-in__footer--text">
          Don’t have an account?{' '}
          <Link to={'/sign-up'} className="sign-in__footer--link">
            Sign Up
          </Link>
          .
        </div>
      </div>
    </form>
  )
}

export default SignIn
