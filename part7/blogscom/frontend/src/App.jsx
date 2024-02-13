import './App.css'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { notificationTimeout } from './reducers/notificationReducer'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogView from './components/BlogView'

import loginService from './services/login'
import storageService from './services/storage'


function App() {
  const [user, setUser] = useState('')
  const dispatch = useDispatch()

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
    } catch(e) {
      console.error(e)
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
  }

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(notificationTimeout('Blogs loaded', 5))
  }, [])

  if (!user) {
    return (
      <div>
        <LoginForm onLogin={login} />
      </div>
    )
  }

  return (
    <div className='container'>
      <div className="content">
        <p>{user.username} logged in
        <button onClick={logout}>logout</button></p>
      </div>
      <div className="content">
        <h1 className="title">Blogs</h1>
        <BlogForm />
        <BlogView user={user}/>
      </div>
    </div>
  )
}

export default App
