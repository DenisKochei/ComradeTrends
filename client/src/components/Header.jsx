import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/theme/themeSlice'
import { signoutSuccess } from '../../redux/user/userSlice'
import { useEffect,useState } from 'react'
import Headroom from 'react-headroom'

export  function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
console.log(searchTerm)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/sign-out', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Headroom>
      <Navbar className='border-b-2 w-full'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xs  font-semibold dark:text-white'>
        <span className=' px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md text-white'>Comrade</span>
        Trends
      </Link>
      <form onSubmit={handleSubmit}>
        {path === '/projects' || '/about' ? 
        (<div></div>): 
        (<TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='w-28 lg:w-full'
          onChange={(e)=>setSearchTerm(e.target.value)}
          sizing='sm'
        />)}
        {path === '/' ? 
        (<TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='w-28 lg:w-full sm:w-full'
          onChange={(e)=>setSearchTerm(e.target.value)}
          sizing='sm'
        />) : (<div></div>) 
        } 
        { path === '/dashboard' ? 
        (<TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='w-28 lg:w-full sm:w-full'
          onChange={(e)=>setSearchTerm(e.target.value)}
          sizing='sm'
        />) : (<div></div>) 
        } 
      </form>
      <div className=' flex justify-between items-center gap-2 md:order-2'>
        <Button 
          color='gray' 
          className='w-9 h-9 focus:ring-0' 
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
            {currentUser && currentUser.isAdmin && (
             <>
              <Link to={'/dashboard?tab=dash'}>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            <Dropdown.Divider /></>
            )}
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='sign-in'>
            <Button className='focus:ring-0' gradientDuoTone='purpleToBlue' outline>
              SignIn
            </Button>
          </Link>
        )}
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
    </Headroom>
  )
}
