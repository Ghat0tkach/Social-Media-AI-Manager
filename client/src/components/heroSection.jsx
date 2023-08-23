import React from 'react';

import { content } from '../assets';
const HeroSection = () => {
  return (
    <div className="flex justify-center items-center">
    <div className="flex flex-col justify-center">
      <img
        alt="Modal video thumbnail"
        loading="lazy"
        width="768"
        height="432"
        decoding="async"
        data-nimg="1"
        style={{ color: 'transparent' }}
        srcSet={content}
        src={content}
      />
      {/*  */}
    </div>
    </div>
  );
};

export default HeroSection;
