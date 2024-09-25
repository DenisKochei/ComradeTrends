import React from 'react'
import { Footer } from 'flowbite-react'
import {BsFacebook,BsTwitter,BsTiktok,} from 'react-icons/bs'
import { Link } from 'react-router-dom'
//import { Link } from 'react-router-dom'


export default function FooterComp() {
  return (
  <Footer container className='border border-t-8 m-0 border-teal-500'>
    <div className="">
      <div>
        <div>
        <span className=' px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md text-white'>Comrade</span>
          Trends
        </div>
        <div className='flex justify-around'>
          
          <div className='flex justify-start flex-col gap-1'>
          <Footer.Title className='my-3' title='Socials:'/>
            <Footer.LinkGroup col >
              <Footer.Link
                href='https://www.tiktok.com/@comrade.trends'
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='flex gap-1'>
                <Footer.Icon icon={BsTiktok} /> 
                Titok
                </div>
              </Footer.Link>
              </Footer.LinkGroup>
              <Footer.LinkGroup col>
              <Footer.Link
                href='https://www.facebook.com/profile.php?id=61566437698996'
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='flex gap-1'>
                <Footer.Icon icon={BsFacebook} />
                Facebook
                </div>
              </Footer.Link>
              </Footer.LinkGroup>
             <Footer.LinkGroup >
             <Footer.Link
                href='https://www.x.com/@ComradeTrends'
                target='_blank'
                rel='noopener noreferrer' 
              >
              
              <div className='flex gap-1'>
                <Footer.Icon  icon={BsTwitter} />
                Twitter
              </div>
              </Footer.Link>
             </Footer.LinkGroup>
            
          </div>
          <div className='flex flex-col mt-9 gap-1 underline text-cyan-500'>
            <Link to='/projects'>
              Projects
            </Link>
            <Link to='/about'>
              About
            </Link>
            <Link to='/'>
              Home
            </Link>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className='flex justify-between items-center'>
        <div><Footer.Copyright href='#' by='ComradeTrends' year={new Date().getFullYear()} /></div>
      </div>
    </div>
    
   </Footer>
  )
}
