import {
    Popover as ChakraPopover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
  } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const Popover = (props: {
    children: ReactNode
}) => {
    const { children } = props

    return (<ChakraPopover>
    <PopoverTrigger>
        { children }
    </PopoverTrigger>
    <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>More actions here</PopoverBody>
    </PopoverContent>
    </ChakraPopover>)
}
