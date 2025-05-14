import React from 'react'
import { Button } from 'antd'
import './Header.scss'
import ava from '../../assets/avatar.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/reducers/userReducer'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)
  const user = currentUser || JSON.parse(localStorage.getItem('user'))

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  debugger

  return (
    <header className="header">
      <button onClick={() => navigate('/')} className="header-left">
        Realworld Blog
      </button>
      {!user ? (
        <div className="header-right">
          <Button onClick={() => navigate('/sign-in')} className="header-right__button header__sign-in">
            Sign In
          </Button>
          <Button onClick={() => navigate('/sign-up')} className="header-right__button header__sign-up">
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="header-right">
          <Button onClick={() => navigate('/new-article')} className="header-right__create">
            Create article
          </Button>
          <button onClick={() => navigate('/profile')} className="header-right__profile">
            {user.username}
            <img className="header-right__avatar" src={user.image || ava} />
          </button>
          <Button onClick={() => onLogout()} className="header-right__button logout">
            Log Out
          </Button>
        </div>
      )}
    </header>
  )
}

export default Header
