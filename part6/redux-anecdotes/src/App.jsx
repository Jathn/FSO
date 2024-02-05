import { useEffect } from 'react'
import './App.css'

import Header from './components/Header'
import Filter from './components/Filter'
import Anecdotes from './components/Anecdotes'
import Footer from './components/Footer'

import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])

  return (
    <>
      <Header title="Anecdotes" />
      <Filter />
      <Anecdotes />
      <Footer />
    </>
  )
}

export default App
