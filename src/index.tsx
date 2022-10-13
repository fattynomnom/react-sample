import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import mockServiceWorker from 'src/plugins/msw'

mockServiceWorker.start()

const rootElement = document.getElementById('root')

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
)
