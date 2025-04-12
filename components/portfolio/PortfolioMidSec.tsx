'use client';

import { features } from 'process';
import React from 'react';

interface PortfolioMidSecProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const PortfolioMidSecFeatures = [
    {
      title: 'Creative Ideas',
      image: '/light.png',
      description: 'At Webnexter, we excel in innovative, out-of-the-box solutions. Our creative thinking drives unique, impactful web development and design, ensuring your brand stands out.',
    },
    {
      title: '100% responsive',
      image: '/devices.png',
      description: 'WebnexterOfficial ensures your website looks and works perfectly on all devices. Our responsive design guarantees a seamless user experience on desktops, tablets, and smartphones.',
    },
    {
      title: 'Online Business',
      image: '/online-business.png',
      description: 'Webnexter specializes in empowering your online business with cutting-edge web development and design solutions. We help you establish a strong digital presence, driving growth and success in the competitive online marketplace.',
    },
  ];

const PortfolioMidSec: React.FC<PortfolioMidSecProps> = ({
  title = "Our vision & values.",
  subtitle = "What we Offer",
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    
    <section ref={sectionRef} className="py-16 bg-gradient-to-tr from-secondary-dark/40 via-secondary/60 to-background">
      
        <div className="flex flex-col lg:flex-row items-center justify-center 
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-100px] opacity-0'}`}>
        <h2 className="text-4xl font-bold text-center mb-4 text-text-primary animate-fade-in delay-200">{title}</h2>
          </div>
         <div className={`flex flex-col gap-8 w-full md:w-2/3 lg:w-1/2 mt-5 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[100px] opacity-0'}`}>
            {PortfolioMidSecFeatures.map((item, index)=>(
              <div key={index} className="flex flex-col md:flex-row items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-1/2" />
                <div>
                  <h3 className="text-2xl font-bold text-text-primary text-center md:text-left">{item.title}</h3>
                  <p className="text-text-secondary text-center md:text-left">{item.description}</p>
                </div>
              </div>
            ))}
         </div>   
        </div>
        
      </section>
  );
};

export default PortfolioMidSec; 