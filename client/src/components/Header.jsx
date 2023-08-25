import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {vite} from '../assets/index'
import Dropdown from 'react-dropdown';
import MobileMenu from './mobile-menu'

export default function Header() {

  const [top, setTop] = useState(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }  

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            
            <Link to='/'>
                <img src={vite}/>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
            <li><Link to='./Chatbot'>AI-Bot</Link></li>
              <li>
                <Link to='/collections' className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Dashboard</Link>
              </li>
              <li>
                <Link to='/CaptionGPT' className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Image Analysis</Link>
              </li>
              <li>
                <Link to='/generateImage' className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Generate Image</Link>
              </li>
              <li>
                <Link to="/schedulePost" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                  <span>Schedule posts</span>
                </Link>
              </li>
              <li>
              <Link to="/socialMediaManagerGPT" className="inline-block px-4 py-2 bg-blue-900 text-gray-200 hover:bg-gray-800 transition duration-300 ease-in-out ml-3 rounded-lg shadow">
              SocialMediaManagerGPT
             </Link>
  
              </li>
            </ul>

          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
