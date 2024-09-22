import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Projects } from './pages/Projects'
import { Dashboard } from './pages/Dashboard'
import { Header } from './components/header'
import Footer from './components/Footer'
import { PrivateRoute } from './components/privateRoute'
import { OnlyAdminPrivateRoute } from './components/OnlyAdminPrivateRoute copy'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import { PostPage } from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className='min-h-screen'>
      <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/projects' element={<Projects />} />
        <Route element={ <PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/post/:postslug' element={<PostPage />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}