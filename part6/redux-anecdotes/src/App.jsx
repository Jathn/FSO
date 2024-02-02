import { useState } from 'react'
import './App.css'

import Header from './components/Header'
import Anecdotes from './components/Anecdotes'
import Footer from './components/Footer'
function App() {
  return (
    <>
      <Header title="Anecdotes" />
      <Anecdotes />
      <Footer />
    </>
  )
}

export default App
