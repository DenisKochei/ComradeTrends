import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export  function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5'>
        <div className='flex-1'>
        <Link to="/" className=' whitespace-nowrap sm:text-4xl text-xl  font-bold dark:text-white'>
          <span className=' px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md text-white'>Comrade</span>
          Trends
        </Link>
        <p className='text-sm mt-5'>A bustling hub of breaking news, Kenya's heartbeat echoing across the digital savanna.</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div className=''>
              <Label value='Your username' />
              <TextInput 
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div className=''>
              <Label value='Your email' />
              <TextInput 
                type='email'
                placeholder='name@gmail.com'
                id='email'
              />
            </div>
            <div className=''>
              <Label value='Your password' />
              <TextInput 
                type='password'
                placeholder='Password'
                id='password'
              />
            </div>
            <Button className='bg-gradient-to-r from-cyan-500 to-blue-600' type='submit'>
            Sign Up
          </Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-cyan-500'>Signin</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
