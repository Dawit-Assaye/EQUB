import React, { useState, useEffect, useRef } from 'react';
import EqubSlides from './subComponents/EqubSlides';

function EqubSlider({ slides }) {
 

  // Set the width of the slider container to the total width of all slides


  // Scroll to the next slide when currentIndex changes
  // useEffect(() => {
  //   sliderRef.current.scrollTo({
  //     left: slideWidth.current * currentIndex,
  //     behavior: 'smooth'
  //   });
  // }, [currentIndex]);

  // Automatically slide to next element every 5 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((currentIndex + 1) % slides.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [currentIndex, slides.length]);



  return (
      <div className="equb-slider">
        {slides.map(slide => (
          <EqubSlides key={slide.id} {...slide} />
        ))}
      </div>
  );
}

export default EqubSlider;
