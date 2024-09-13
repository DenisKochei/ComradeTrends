import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export  function Signup() {

  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.id] : e.target.value.trim()})
    console.log(formData)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password ){
      setLoading(false);
      return setError('Please fill out all fields.')
    }
    try{
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/signup',{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false){
        setLoading(false);
        return setError(data.message)
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }

    }catch(err){
      setError(err.message);
      setLoading(false);
    }
  }

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
          <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
            <div className=''>
              <Label value='Your username' />
              <TextInput 
                type='text'
                placeholder='Username'
                id='username'
                onChange={changeHandler}
              />
            </div>
            <div className=''>
              <Label value='Your email' />
              <TextInput 
                type='email'
                placeholder='name@gmail.com'
                id='email'
                onChange={changeHandler}
              />
            </div>
            <div className=''>
              <Label value='Your password' />
              <TextInput 
                type='password'
                placeholder='Password'
                id='password'
                onChange={changeHandler}
              />
            </div>
            <Button className='bg-gradient-to-r from-cyan-500 to-blue-600' type='submit' disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className='pl-3'>Loading...</span>
              </> 
            ) : 'Signup'}
          </Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-cyan-500'>Signin</Link>
          </div>
          {
            error && (
              <Alert className='mt-5' color='failure'>
                {error}
              </Alert>
            )
          }
        </div>
        
      </div>
    </div>
  )
}
 