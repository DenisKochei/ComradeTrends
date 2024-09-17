import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { signoutSuccess } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export  function DashSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search]);
  const handleSignout = async (req,res,next) =>{
    try{
      const res = await fetch('/api/user/sign-out',{
        method: 'POST'
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <Sidebar className='w-full sm:w-52'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer' >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
