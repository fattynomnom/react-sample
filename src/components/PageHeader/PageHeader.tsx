import { ArrowBackIcon } from '@chakra-ui/icons'

export const PageHeader = () => {
    return (<div className='bg-blue-900 px-12 pb-5'>
        <div className='flex items-center space-x-3'>
            <ArrowBackIcon className='!text-emerald-700' />
            <span className='font-bold text-emerald-700'>
                Overview
            </span>
        </div>
        <h1 className='text-xl text-white'>
            General investing
        </h1>
    </div>)
}
