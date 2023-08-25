// import React from 'react';
// import { content } from '../assets';
import { Link } from 'react-router-dom';
import { FeatureBox, HeroSection } from '../components';
import React from 'react';
 function FeaturesBlocks() {
    return (
      <section className="relative ">
  
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
        <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>
  
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
  
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h2 className="h2 mb-4 text-xl">Our Services</h2>
              <p className="text-xl text-gray-600">Assure overall growth with AI management</p>
            </div>
  
            {/* Items */}
            <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
  
              {/* 1st item */}
              <Link to='/chatbot'>
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-105 transition-all">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path className="stroke-current text-blue-300" d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285" />
                      <path className="stroke-current text-white" d="M20.571 37.714h5.715L36.57 26.286h8" />
                      <path className="stroke-current text-blue-300" strokeLinecap="square" d="M41.143 34.286l3.428 3.428-3.428 3.429" />
                      <path className="stroke-current text-white" strokeLinecap="square" d="M41.143 29.714l3.428-3.428-3.428-3.429" />  
                    </g>
                  </g>
                </svg>
                <Link to='/chatbot' className="text-xl font-bold leading-snug tracking-tight mb-1">Content Generation</Link>
                <p className="text-gray-600 text-center">Analyze latest social media trends and provides the best content !</p>
              </div>
              </Link>
  
              {/* 2nd item */}
              <Link to='/generateImages'>
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl scale-105 transition-all">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2" transform="translate(19.429 20.571)">
                      <circle className="stroke-current text-white" strokeLinecap="square" cx="12.571" cy="12.571" r="1.143" />
                      <path className="stroke-current text-white" d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696" />
                      <path className="stroke-current text-blue-300" d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835" />
                    </g>
                  </g>
                </svg>
                <Link to='/generateImages' className="text-xl font-bold leading-snug tracking-tight mb-1">Generate Images</Link>
                <p className="text-gray-600 text-center">Craft or search beautiful appealing images for your needs</p>
              </div>
              </Link>
  
              {/* 3rd item */}
              <Link to='/dashboard'>
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-105 transition-all">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path className="stroke-current text-blue-300" d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286" />
                      <path className="stroke-current text-white" strokeLinecap="square" d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286" />
                      <path className="stroke-current text-blue-300" d="M36.571 32H40" />
                      <path className="stroke-current text-white" d="M24 32h3.429" strokeLinecap="square" />
                    </g>
                  </g>
                </svg>
                <Link to='/dashboard' className="text-xl font-bold leading-snug tracking-tight mb-1">Collection</Link>
                <p className="text-gray-600 text-center">Saves your generated images or download them at Click</p>
              </div>
              </Link>
              {/* 4th item */}
              <Link to='./captionGPT'>
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-105 transition-all" >
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path className="stroke-current text-white" d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714" />
                      <path className="stroke-current text-white" d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286" />
                      <path className="stroke-current text-white" d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286" />
                      <path className="stroke-current text-blue-300" d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572" strokeLinecap="square" />
                    </g>
                  </g>
                </svg>
                <Link to='./captionGPT' className="text-xl font-bold leading-snug tracking-tight mb-1">Image-to-Caption</Link>
                <p className="text-gray-600 text-center">Generate mesmerising captions with your uploaded Photos!</p>
              </div>
              </Link>
  
              {/* 5th item */}
              <Link to='./schedulePost'>
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-110 transition-all">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2">
                      <path className="stroke-current text-white" d="M19.429 32a12.571 12.571 0 0021.46 8.89L23.111 23.11A12.528 12.528 0 0019.429 32z" />
                      <path className="stroke-current text-blue-300" d="M32 19.429c6.943 0 12.571 5.628 12.571 12.571M32 24a8 8 0 018 8" />
                      <path className="stroke-current text-white" d="M34.286 29.714L32 32" />
                    </g>
                  </g>
                </svg>
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Automate Posting!</h4>
                <p className="text-gray-600 text-center">Automate user-generated photos with captions !</p>
              </div>
              </Link>
  
              {/* 6th item */}
              <Link to='./socialMediaManagerGPT'>
              <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl hover:scale-105 transition-all">
                <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <g strokeWidth="2" strokeLinecap="square">
                      <path className="stroke-current text-white" d="M29.714 40.358l-4.777 2.51 1.349-7.865-5.715-5.57 7.898-1.147L32 21.13l3.531 7.155 7.898 1.147L40 32.775" />
                      <path className="stroke-current text-blue-300" d="M44.571 43.429H34.286M44.571 37.714H34.286" />
                    </g>
                  </g>
                </svg>
                <Link to='./socialMediaManagerGPT' className="text-xl font-bold leading-snug tracking-tight mb-1">Powerful AI</Link>
                <p className="text-gray-600 text-center">Generate , visualise and post content with a Single click</p>
              </div>
              </Link>
            </div>
  
          </div>
        </div>
      </section>
    )
  }
function FeatureSection() {
  return (
    <>
   
   <section className="relative">

<div className="max-w-6xl mx-auto px-4 sm:px-6">

  {/* Hero content */}
  <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        {/* Section header */}
        <div className="text-center pb-12 md:pb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Manage Social Media <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">with AI</span></h1>
          <div className="max-w-3xl mx-auto" >
            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                Manage your social media with our AI 
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
              <div>
              <a className="mb-2 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0 bg-blue-500"
        href="#!" role="button">Get started</a>
      <a className="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:hover:bg-neutral-800 dark:hover:bg-opacity-60
      bg-blue-300
      text-white"
         href="#!" role="button">Learn more</a>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
    </section>
    <HeroSection/>
    <FeatureBox/>
    <FeaturesBlocks/>
    </>

  

  );
}



export default FeatureSection;
