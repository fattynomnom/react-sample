import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ChakraProvider,
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { NavBar } from './components/NavBar/NavBar'
import { PageHeader } from './components/PageHeader/PageHeader'
import { NavItem } from './components/NavBar/types.d'
import './App.css'
import { Home } from './pages/Home/Home'
import { ComingSoon } from './pages/ComingSoon/ComingSoon'

const App = () => {
  const profileComponent = (
    <li>
      <ChakraPopover>
        <PopoverTrigger>
          <button className='flex items-center space-x-2'>
            <span>Oliver</span>
            <ChevronDownIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody className='text-black'>More actions here</PopoverBody>
        </PopoverContent>
      </ChakraPopover>
    </li>
  )
  const nav: NavItem[] = [
    { title: 'Home', path: '/', page: <Home /> },
    { title: 'Manage deposits', path: '/deposits', page: <ComingSoon /> },
    { title: 'Refer a friend', path: '/refer', page: <ComingSoon /> },
    { title: 'Support', path: '/support', page: <ComingSoon /> },
    { title: 'Oliver', component: profileComponent, path: '' },
  ]

  return (
    <ChakraProvider>
      <Router>
        <div>
          <NavBar nav={nav} />
          <PageHeader />
          <Routes>
            {
              nav.filter(({ page }) => !!page).map(nav => (
                <Route
                  key={nav.title}
                  path={nav.path}
                  element={nav.page}
                />
              ))
            }
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  )
}

export default App;
