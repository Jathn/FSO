import './App.css'
import Header from './components/Header'
import NumberManipulator from './components/NumberManipulator'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header title="Redux Numbers" />
      <NumberManipulator />
      <Footer />
    </>
  )
}

export default App
