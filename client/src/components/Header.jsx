import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link ,useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/theme/themeSlice'

export  function Header() {
  const {currentUser} = useSelector( state=> state.user)
  const {theme} = useSelector( state=> state.theme)
  const path = useLocation().pathname
  const dispatch = useDispatch();

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className=' px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md text-white'>Comrade</span>
        Trends
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='w-28 lg:w-full sm:w-full'
        />
      </form>
      <div className='flex justify-between items-center gap-2 md:order-2'>
        <Button 
          color='gray' 
          className='w-9 h-9' 
          pill
          onClick={()=>dispatch(toggleTheme())}
        >
          { theme === 'dark' ? <FaMoon/> : <FaSun />}
          
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false} inline label ={ 
              <Avatar alt='User' img={currentUser.profilePicture} rounded/>}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              SignIn
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className=''>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={'div'}>
          <Link to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
