import './styles.css'

export const NavBar = () => {
    return (<div className='bg-blue-900 flex justify-between items-center px-12 py-7'>
        <h1 className='text-lg font-bold text-white'>
            StashAway
        </h1>
        <ul className='flex space-x-5'>
            <li>Home</li>
            <li>Manage deposits</li>
            <li>Refer a friend</li>
            <li>Support</li>
        </ul>
    </div>)
}
