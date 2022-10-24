import { ArrowBackIcon } from '@chakra-ui/icons'

export const PageHeader = () => {
    return (<div className='bg-dark-blue px-12 pb-5'>
        <div className='flex items-center space-x-3'>
            <ArrowBackIcon className='!text-turquoise' />
            <span className='font-bold text-turquoise'>
                Overview
            </span>
        </div>
        <h1 className='text-3xl font-black text-white'>
            General investing
        </h1>
    </div>)
}
