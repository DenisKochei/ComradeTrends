import { Footer } from 'flowbite-react'
import {BsFacebook,BsTiktok,} from 'react-icons/bs'
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { FaPhone,FaWhatsapp } from 'react-icons/fa'
import { CiMail } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
//import { Link } from 'react-router-dom'


export default function FooterComp() {
  return (
  <Footer container className='flex-col gap-4 border border-t-2 border-cyan-800 sm:flex-row p-5 sm:justify-around sm:items-center justify-center items-start'>
   <div className='flex mt-0.5 flex-col gap-2 md:w-1/3 w-full'>
   <Footer.Title className='mb-0 sm:mt-7' title={<Logo/>}/>
   <Footer.Divider className='mt-2'/>
   <Link to='/privacy-policy'>
      <span className='flex items-center gap-1'><IoIosArrowForward className='text-sky-600'/>Pricacy Policy</span>
    </Link>
   <Link to='/projects'>
      <span className='flex items-center gap-1'><IoIosArrowForward className='text-sky-600'/>Projects</span>
    </Link>
    <Link to='/about'>
      <span className='flex items-center gap-1'><IoIosArrowForward className='text-sky-600'/>About</span>
    </Link>
    <Link to='/'>
      <span className='flex items-center gap-1'><IoIosArrowForward className='text-sky-600'/>Home</span>
    </Link>
   </div>
   <div className='flex flex-col sm:justify-start gap-2 md:w-1/3 w-full'>
   <Footer.Title className='mb-0 sm:mb-1 mt-5 sm:mt-0' title='Contacts'/>
   <Footer.Divider className='mt-1'/>
   <span className='flex items-center gap-1'><FaPhone className='text-sky-600'/><a href='tel:+254759117496'>+(254)759117496</a></span>
   <span className='flex items-center gap-1'><FaWhatsapp className='text-sky-600'/><a href="https://wa.me/+254753868958?text=Hello!">+(254)753868958</a></span>
   <span className='flex items-center gap-1'><CiMail className='text-sky-600'/><a href='mailto:comradetrends.info@gmail.com'>comradetrends.info@gmail.com</a></span>
   </div>
   <div className='md:w-1/3 mt-5 sm:mt-0 w-full flex flex-col'>
    <Footer.Title className='mb-1 ' title='Socials' />
    <Footer.Divider className='mt-0.5'/>
    <div className='flex flex-col gap-2'>
    <Footer.LinkGroup >
      <Footer.Link
        href='https://www.tiktok.com/@comrade.trends'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='flex gap-1'>
        <Footer.Icon fill='rgb(2,132,199,100)' className='w-6 h-6' icon={BsTiktok} /> 
        Tiktok
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
        <Footer.Icon fill='rgb(2,132,199,100)' icon={BsFacebook} />
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
        <Footer.Icon fill='rgb(2,132,199,100)' icon={RiTwitterXFill} />
        X
      </div>
      </Footer.Link>
      </Footer.LinkGroup>

    </div>
   </div>
   
  </Footer>
  )
}
