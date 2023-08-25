import React, { useState } from 'react';

const Popup = ({ isOpen, onClose, mediaUrl, caption }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 z-10 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
      <Post caption={caption} imageUrl={mediaUrl}/>
      
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};




import { download } from '../assets';
import {downloadImage} from '../utils'
import Post from './post';

const Card = ({ _id, name, prompt, photo }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
     // Prevent the event from propagating
    setPopupOpen(true);
  };
  
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardHover card'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <button
           className='outline-none bg-transparent text-blue-600 border-none'
            onClick={(e) => {
    e.stopPropagation(); // Prevent event propagation
    handleOpenPopup();
            }}>
            Post To Twitter
          </button>
          <button type='button' onClick={()=>downloadImage(_id,photo)} className='outline-npne bg-transparent bordere-none'>
            <img src={download} alt="download" className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
      </div>
      <Popup
        isOpen={popupOpen}
        onClose={handleClosePopup}
        mediaUrl={photo}
        caption={prompt}
      />
    </div>
  );
};

export default Card;