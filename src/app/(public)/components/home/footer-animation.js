"use client";

import { useEffect,  } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FooterAnimation = () => {
  const letter = "WOLF STUDIOS®".split("");

  useEffect(() => {
    gsap.to(".h1 .letter", {
      opacity: 1,
      y:-200,
      duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
        trigger: "#page1",  
        start: "top 80%",   
        end: "bottom 20%",   
        toggleActions: "restart pause reverse pause",  
        markers: false  
        }
    });
  }, []);
  return (
    <>
    <div id="page1">
        <h1 className='h1'>
            {letter.map((letter, index) => (
                <span key={index} className='letter a'>
                {letter === " " ? "\u00A0" : letter}
                </span>
            ))}
        </h1>
    </div>
    </>
  )
}

