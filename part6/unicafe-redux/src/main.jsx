import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App.jsx'
import countReducer from './reducers/countReducer.js'

const store = createStore(countReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
