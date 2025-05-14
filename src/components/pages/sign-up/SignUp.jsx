import React from 'react'
import './SignUp.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { fetchNewUser } from '../../../store/reducers/userReducer'

const SignUp = () => {
  const dispatch = useDispatch()
  const errSignUp = useSelector((state) => state.user.signUpErr)
  console.log(errSignUp)

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onHandlerSubmit = async (data) => {
    await dispatch(fetchNewUser(data))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onHandlerSubmit)} className="sign-up">
      <h2>Create new account</h2>
      <div className="sign-up__data">
        <div className="sign-up__username">
          <label className="sign-up__label">Username</label>
          <input
            className="input"
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Your username must have at least 3 characters' },
              maxLength: { value: 20, message: 'Your username should have no more than 20 characters' },
            })}
            style={{ borderColor: (errSignUp.username || errors.username) && '#F5222D' }}
            placeholder="Username"
          />
          {errors.username && <p className="error-text">{errors.username.message}</p>}
          {errSignUp.username && <p className="error-text">UserName {errSignUp.username}</p>}
        </div>
        <div className="sign-up__email">
          <span className="sign-up__label">Email adress</span>
          <input
            className="input"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /(^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/,
                message: 'Email incorrect',
              },
            })}
            style={{ borderColor: (errSignUp.email || errors.email) && '#F5222D' }}
            placeholder="Email adress"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
          {errSignUp.email && <p className="error-text">Email {errSignUp.email}</p>}
        </div>
        <div className="sign-up__password">
          <span className="sign-up__label">Password</span>
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
        <div className="sign-up__password">
          <span className="sign-up__label">Repeat Password</span>
          <input
            className="input"
            type="password"
            {...register('repeatPassword', {
              required: 'Please repeat password!',
              validate: (data) => data === watch('password') || 'Please repeat password!',
            })}
            style={{ borderColor: errors.repeatPassword && '#F5222D' }}
            placeholder="Password"
          />
          {errors.repeatPassword && <p className="error-text">{errors.repeatPassword.message}</p>}
        </div>
      </div>
      <div className="sign-up__agree">
        <div className="sign-up__agree-wrapper">
          <input
            type="checkbox"
            {...register('agree', {
              required: 'You must give your consent',
            })}
            className="checkbox sign-up__checkbox"
          />
          <div className="sign-up__agree--text">I agree to the processing of my personal information</div>
        </div>
        {errors.agree && <p className="error-text">{errors.agree.message}</p>}
      </div>
      <div className="sign-up__footer">
        <button type="submit" className="sign-up__button">
          Create
        </button>
        <div className="sign-up__footer--text">
          Already have an account?{' '}
          <Link to={'/sign-in'} className="sign-up__link">
            Sign In
          </Link>
          .
        </div>
      </div>
    </form>
  )
}

export default SignUp
