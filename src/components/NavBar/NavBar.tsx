import { Link, useLocation, matchPath } from 'react-router-dom'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import './styles.css'
import { NavItem } from './types'

export const NavBar = (props: { nav: NavItem[] }) => {
  const { nav } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { pathname } = useLocation()

  const navItemComponent = (navItem: NavItem) => (
    <li key={navItem.path} className={matchPath(navItem.path, pathname) ? 'text-turquoise' : ''}>
      <Link to={navItem.path}>{ navItem.title }</Link>
    </li>
  )

  return (
    <div className='bg-dark-blue flex justify-between items-center px-5 lg:px-12 py-7'>
      <h1 className='text-lg font-black text-white'>
        StashAway
      </h1>

      <button className='block lg:hidden' onClick={onOpen}>
        <HamburgerIcon className='!text-white' />
      </button>

      <ul className='space-x-5 hidden lg:flex'>
        {
          nav.map((navItem) => (
            navItem.component ? navItem.component : navItemComponent(navItem)
          ))
        }
      </ul>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <ul className='space-y-7 mt-10'>
            {
              nav.map((navItem) => (
                navItem.component ? navItem.component : navItemComponent(navItem)
              ))
            }
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
