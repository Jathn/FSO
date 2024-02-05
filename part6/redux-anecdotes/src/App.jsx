import { useState } from 'react'
import './App.css'

import Header from './components/Header'
import Filter from './components/Filter'
import Anecdotes from './components/Anecdotes'
import Footer from './components/Footer'
function App() {
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
