import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import './styles.css'
import { ReactNode } from 'react'

export const NavBar = () => {
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
  const nav: { title: string; component?: ReactNode }[] = [
    { title: 'Home' },
    { title: 'Manage deposits' },
    { title: 'Refer a friend' },
    { title: 'Support' },
    { title: 'Oliver', component: profileComponent },
  ]

  const { isOpen, onOpen, onClose } = useDisclosure()

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
            navItem.component ? navItem.component : (<li>{ navItem.title }</li>)
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
                navItem.component ? navItem.component : (<li>{ navItem.title }</li>)
              ))
            }
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
