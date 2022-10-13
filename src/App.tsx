import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './routes/components/ErrorBoundary'
import { Routes } from './routes/Routes'
import GlobalStyle from './styles/global'
import 'antd/dist/antd.css'

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </BrowserRouter>
  )
}
