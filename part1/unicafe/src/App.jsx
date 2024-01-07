import React, { useState } from 'react'
import ButtonHub from './components/ButtonHub'
import Statistics from './components/Statistics'

function App() {

  const prompt = "Give Feedback"
  const alternatives = ['good', 'neutral', 'bad']
  const [clickerCounter, setClickerCounter] = useState(Array(alternatives.length).fill(0));

  const incrementOne = (index) => {
    var newList = [...clickerCounter]
    
    newList[index] = newList[index] + 1
    setClickerCounter(newList)
  } 

  const buttonHubOnClick = (value) => {
    incrementOne(alternatives.findIndex((item) => item === value))
  }

  const buttons = {
    values: {alternatives},
    clicks: {clickerCounter}
  }

  return (
    <>
      <ButtonHub prompt={prompt} alternatives={alternatives} onButtonClick={buttonHubOnClick} />
      <Statistics alternatives={alternatives} counts={clickerCounter} />
    </>
  )
}

export default App
