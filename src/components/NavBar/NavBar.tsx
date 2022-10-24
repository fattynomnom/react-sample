import {
  Popover as ChakraPopover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import './styles.css'

export const NavBar = () => {
  return (
    <div className='bg-dark-blue flex justify-between items-center px-12 py-7'>
      <h1 className='text-lg font-black text-white'>
        StashAway
      </h1>
      <ul className='flex space-x-5'>
        <li>Home</li>
        <li>Manage deposits</li>
        <li>Refer a friend</li>
        <li>Support</li>
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
      </ul>
    </div>
  )
}
