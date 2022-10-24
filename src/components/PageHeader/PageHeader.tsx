import { Link, useLocation } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { NavItem } from '../NavBar/types'

export const PageHeader = (props: { nav: NavItem[] }) => {
  const { nav } = props

  const { pathname } = useLocation()
  const currentNav = () => nav.find(({ path }) => path === pathname)

  return (<div className='bg-dark-blue px-5 lg:px-12 pb-5'>
    <Link to='/' className='flex items-center space-x-3'>
      <ArrowBackIcon className='!text-turquoise' />
      <span className='font-bold text-turquoise'>
        Overview
      </span>
    </Link>
    <h1 className='text-3xl font-black text-white'>
      { currentNav()?.header || currentNav()?.title || '' }
    </h1>
  </div>)
}
