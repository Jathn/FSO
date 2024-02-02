import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Stats from './components/Stats'

function App() {
  
  return (
    <div>
      <Header title='Unicafe' />
      <Stats />
      <Footer />
    </div>
  )
}

export default App
