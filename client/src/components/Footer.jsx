import React from 'react'
import { Footer } from 'flowbite-react'
import {BsFacebook,BsTwitter,BsInstagram,BsYoutube,} from 'react-icons/bs'
//import { Link } from 'react-router-dom'


export default function FooterComp() {
  return (
  <Footer container className='border border-t-8  border-teal-500'>
    <div className="">
      <div>
        <div>
        <span className=' px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md text-white'>Comrade</span>
          Trends
        </div>
        <div className='grid grid-col grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6'>
          <div>
            <Footer.Title title='About'/>
            <Footer.LinkGroup col>
              <Footer.Link
                href='http://www.tiktok.com/Denis_Kochei'
                target='_blank'
                rel='noopener noreferrer'
              >
                TikTok
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className='flex justify-between items-center'>
        <div><Footer.Copyright href='#' by='DenisKochei' year={new Date().getFullYear()} /></div>
        <div className='flex gap-3'>
          <Footer.Icon href='#' icon={BsFacebook} />
          <Footer.Icon href='#' icon={BsInstagram} />
          <Footer.Icon href='#' icon={BsYoutube} />
          <Footer.Icon href='#' icon={BsTwitter} />
        </div>
      </div>
    </div>
   </Footer>
  )
}
