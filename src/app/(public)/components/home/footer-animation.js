'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

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
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'restart pause reverse pause',
        markers: false,
      },
    });
  }, []);
  return (
    <>
      <div id="page1" style={{ backgroundColor: 'var(--mui-palette-background-paper)' }}>
        <h1 className="h1">
          {letter.map((letter, index) => (
            <span key={index} className="letter a" style={{ color: 'var(--mui-palette-text-primary)' }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
      </div>
    </>
  );
};
