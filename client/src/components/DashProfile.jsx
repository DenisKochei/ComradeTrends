import { Button, TextInput } from 'flowbite-react'
import {useSelector} from 'react-redux'

export  function DashProfile() {
  const {currentUser} = useSelector( state=> state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='gap-4 flex flex-col'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <img 
          src={currentUser.profilePicture} 
          alt="User" 
          className='rounded-full w-full h-full border-4 border-slate-500 object-cover' 
        />
        </div>
        
        <TextInput
        type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username} 
        />
        <TextInput 
          type='email' 
          id='email' 
          placeholder='email' 
          defaultValue={currentUser.email} 
        />
        <TextInput 
          type='password' 
          id='password' 
          placeholder='password'  
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline >
          Update
        </Button>
        <div className='flex justify-between text-red-500 mt-5'>
          <span className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer'> Sign Out </span>
        </div>
        
      </form>
    </div>
  )
}
