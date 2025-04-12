'use client';

import Link from 'next/link';
import React from 'react';

interface PortfolioHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const technologies = [
  { name: 'React', icon: '/React.png' },
  { name: 'Next.js', icon: '/NextJs.png' },
  { name: 'Tailwind CSS', icon: '/TailwincCss.png' },
  { name: 'Node.js', icon: '/NodeJs.png' },
  { name: 'Vercel', icon: '/vercel.png' },
  { name: 'Framer', icon: '/framer.png' },
]



const PortfolioHero: React.FC<PortfolioHeroProps> = ({
  title = "Our Work Speaks for Itself",
  subtitle = "Featured Work",
  description = "Welcome to our Portfolio a showcase of our passion, creativity, and expertise. Here, you'll find a collection of projects that highlight our commitment to delivering outstanding results across web development, branding, digital marketing, and design.",
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-8 animate-slide-top">
      <h1 className="text-5xl font-bold mb-6 text-text-primary">{title}</h1>
      <p className="text-xl text-text-secondary mt-10 max-w-5xl mx-auto">{description}</p>
      <div className='mt-10'>
        <Link href="/services" className="button-tech-big hover:animate-pulse 
        hover:transition-colors hover:duration-300">
          View All Services
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </Link>
      </div>
      <div className='mt-10'>
          <h1 className='text-5xl font-bold text-text-primary'>Technology We Use</h1>
          <div className='flex flex-wrap gap-8 justify-center items-center mt-10'>
            {technologies.map((tech, index)=>
            <div key={index} className='flex items-center gap-2'>
              <img src={tech.icon} alt={tech.name} className='w-8 h-8' />
              <p>{tech.name}</p>
            </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default PortfolioHero; 