'use client';

import { useEffect } from 'react';
import { Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FooterAnimation = () => {
  const letter = 'WOLF STUDIOS®'.split('');

  useEffect(() => {
    gsap.to('.h1 .letter', {
      opacity: 1,
      y: -200,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '#page1',
        start: 'top top',
        end: 'bottom 20%',
        markers: false,
      },
    });
  }, []);
  return (
    <>
      <div id="page1" style={{ backgroundColor: 'var(--mui-palette-background-paper)', zIndex: 100 }}>
        <Typography className="h1">
          {letter.map((letter, index) => (
            <span key={index} className="letter a" style={{ color: 'var(--mui-palette-text-primary)' }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </Typography>
      </div>
    </>
  );
};
