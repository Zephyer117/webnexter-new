import Link from 'next/link';
import React from 'react';

interface ServiceHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title = "Our Services",
  subtitle = "What We Offer",
  description = "Ready to receive our service just start a simple project with us and WebNexter will handle the rest for you. Look at our projects which our team has already accomplished."
}) => {
  return (
    <section className="py-20 animate-slide-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
        <h1 className="text-4xl md:text-7xl font-extrabold text-text-primary 
    tracking-tight leading-tight 
    flex justify-center flex-wrap gap-1 animate-fade-in-down mb-2">
    {"What  We  Offer".split("").map((letter, index) => (
    <span
      key={index}
      className="inline-block animate-pulse"
      style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
    >
      {letter}
    </span>
  ))}
  </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto">{description}</p>
        </div>
      </div>
      <div className='mt-10 text-center'>
        <Link href="/portfolio" className="button-tech-big hover:animate-pulse 
        hover:transition-colors hover:duration-300">
          View All Projects
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </Link>
      </div>    
    </section>
  );
};

export default ServiceHero; 