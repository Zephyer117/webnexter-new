'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client, servicesQuery, featuredProjectsQuery, getImageUrl } from '@/lib/sanity';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import VideoPlayer from './components/VideoPlayer';

interface Service {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: any;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  features: Array<{
    title: string;
    description?: string;
  }>;
  order: number;
  isFeatured: boolean;
}

interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: any;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
    caption?: string;
  };
  service: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  technologies: string[];
  featured: boolean;
  client?: string;
  projectUrl?: string;
  completionDate?: string;
  video?: {
    asset: {
      _ref: string;
      _type: string;
    };
    title?: string;
    description?: string;
    thumbnail?: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt?: string;
    };
  };
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-text-secondary">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4 text-text-primary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-3 text-text-primary">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-text-secondary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-text-secondary">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [servicesData, projectsData] = await Promise.all([
          client.fetch(servicesQuery),
          client.fetch(featuredProjectsQuery),
        ]);
        setServices(servicesData || []);
        setFeaturedProjects(projectsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          if (entry.target.hasAttribute('data-testimonial-card')) {
            entry.target.classList.add('translate-y-0');
          }
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe testimonial elements
    const testimonialTitle = document.querySelector('[data-testimonial-title]');
    const testimonialCards = document.querySelectorAll('[data-testimonial-card]');
    
    if (testimonialTitle) observer.observe(testimonialTitle);
    testimonialCards.forEach(card => observer.observe(card));

    return () => {
      if (testimonialTitle) observer.unobserve(testimonialTitle);
      testimonialCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const testimonials = [
    {
      name: 'John Smith',
      position: 'CEO, Tech Solutions',
      content: 'Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations in terms of quality and functionality.',
      image: '/testimonial1.jpg',
    },
    {
      name: 'Sarah Johnson',
      position: 'Marketing Director',
      content: 'The website they designed for us has significantly improved our online presence and conversion rates. Their attention to detail and user experience focus is impressive.',
      image: '/testimonial2.jpg',
    },
    {
      name: 'Michael Brown',
      position: 'Founder, Startup Inc.',
      content: 'They transformed our outdated website into a modern, responsive platform that our customers love. Their expertise and professionalism made the process smooth and efficient.',
      image: '/testimonial3.jpg',
    },
  ];

  const stats = [
    { label: 'Years of Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Awards Won', value: '10+' },
  ];

  const socialmedia = [
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      url: 'https://www.facebook.com/webnexter',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/webnexter',
    },
    {
      name: 'Twitter',  
      icon: <FaTwitter />,
      url: 'https://www.twitter.com/webnexter',
    },
    {
      name: 'Whatsapp',
      icon: <FaWhatsapp />,
      url: 'https://wa.me/+8801756680320',
    },
  ];

  const heroinfo = [
    {
      title: 'Creative Thinking',
      image: '/light.png',
      description: 'At Webnexter, we excel in innovative, out-of-the-box solutions. Our creative thinking drives unique, impactful web development and design, ensuring your brand stands out.',
    },
    {
      title: 'Sales Strategy',
      image: '/price.png',
      description: 'Our sales strategy at Webnexter focuses on understanding client needs, delivering tailored solutions, and building long-term relationships. We aim to boost your ROI with targeted, effective strategies.',
    },
    {
      title: 'Problem solving',
      image: '/chat.png',
      description: 'Webnexter excels in problem-solving, tackling challenges with innovative solutions to ensure seamless web development and design experiences. We turn obstacles into opportunities for your brand.',
    },
  ];

  const heroinfoFeatures = [
    {
      title: 'Approval',
      image: '/approval.png',
      description: 'At Webnexter, client satisfaction is our top priority. We ensure every step of our process meets your approval, from initial concepts to final delivery. Your feedback drives our continuous improvement and guarantees a result that exceeds your expectations.',
    },
    {
      title: 'For All Devices',
      image: '/devices.png',
      description: 'WebnexterOfficial ensures your website looks and works perfectly on all devices. Our responsive design guarantees a seamless user experience on desktops, tablets, and smartphones.',
    },
    {
      title: 'Online Business',
      image: '/online-business.png',
      description: 'Webnexter specializes in empowering your online business with cutting-edge web development and design solutions. We help you establish a strong digital presence, driving growth and success in the competitive online marketplace.',
    },
  ];


  return (
    <main className="min-h-screen">
<section className="relative pt-36 pb-32 md:pt-44 md:pb-40 overflow-hidden">
  {/* Gradient Background Layers */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background z-0" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-40 z-0" />

  {/* Floating Decorative Blobs */}
  <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-3xl animate-pulse-slow rotate-[40deg] scale-110 z-0" />
  <div className="absolute bottom-1/4 right-1/4 w-[26rem] h-[26rem] bg-secondary/20 rounded-full blur-3xl animate-pulse-slow -rotate-[50deg] scale-110 z-0" />
  <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-accent/20 rounded-full blur-2xl animate-pulse z-0" />
  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-float z-0" />
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-float-delayed z-0" />

  {/* Container */}
  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-4xl text-center mx-auto">
      {/* Animated Title */}

      <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary tracking-tight leading-tight flex justify-center flex-wrap gap-1 animate-fade-in-down">
        {"Webnexter".split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block animate-fade-up"
            style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
          >
            {letter}
          </span>
        ))}
      </h1>
      
      <div className='animate-slide-top duration-1000'>
      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-text-secondary mt-6 mb-4">
        Crafting Digital Experiences from sleek logos to interactive platforms.
      </p>

      {/* Description */}
      <p className="text-base md:text-lg text-text-secondary/90 mb-10 max-w-3xl mx-auto leading-relaxed">
        At Webnexter, we specialize in branding, animations, UI/UX, and full-stack web development. Whether you're a startup or an enterprise, we bring ideas to life with creativity, performance, and style.
      </p>

 
      </div>
     {/* CTA + Social */}
     <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-6 animate-slide-left">
        <Link
          href="#contact"
          className="inline-block bg-gradient-to-r from-primary to-secondary 
          text-white font-semibold px-8 py-4 rounded-full shadow-lg 
          hover:scale-105 transition-transform duration-300"
        >
          Let's Build Together 🚀
        </Link>

        <div className="flex gap-4">
          {socialmedia.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="group relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 p-3 rounded-xl text-2xl text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              <span className="relative z-10">{item.icon}</span>
            </Link>
          ))}
          </div>
        </div>
    </div>
  </div>

  {/* Scroll Down Indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
    <div className="w-8 h-14 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
      <div className="w-2 h-2 bg-white/60 rounded-full animate-scroll-dot" />
    </div>
    <p className="mt-2 text-sm text-white/60">Scroll down</p>
  </div>

  {/* Extra Keyframe Animation Styles */}
  <style jsx>{`
    @keyframes scroll-dot {
      0%, 100% { transform: translateY(0); opacity: 0.5; }
      50% { transform: translateY(6px); opacity: 1; }
    }
    .animate-scroll-dot {
      animation: scroll-dot 1.5s infinite;
    }
    @keyframes fade-up {
      0% {
        transform: translateY(20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .animate-fade-up {
      animation: fade-up 0.5s forwards;
    }
    `}</style>
  </section>


      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />

  {/* Accent Lines */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-[2deg]" />
  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent -rotate-[2deg]" />

  {/* Floating Glow Elements */}
  <div className="absolute top-1/2 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
  <div className="absolute bottom-1/2 -right-16 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float-delayed" />
  <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse" />
  <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse" />

  {/* Stats Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-slide-bottom">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group text-center p-8 rounded-2xl border border-white/10 
          bg-gradient-to-br from-white/5 via-white/10 to-white/5 
          shadow-md backdrop-blur-sm relative overflow-hidden transition-all duration-300 
          hover:scale-105 hover:shadow-2xl hover:border-primary/20 cursor-pointer"
        >
          {/* Gradient Glow Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md rounded-2xl pointer-events-none" />

          {/* Light Glow Shimmer */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 
          transition-opacity duration-300 rounded-2xl blur-sm pointer-events-none" />

          <div className="relative z-10">
            <div className="text-4xl font-extrabold text-primary group-hover:text-secondary transition-colors duration-300">
              {stat.value}
            </div>
            <div className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      

      {/* We love what we do Section */}
      <section className="py-16 bg-background">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='w-full lg:w-1/2'>
        <h2 className="text-5xl font-bold text-center mb-4 animate-slide-down text-text-primary">We love what we do.</h2>
          </div>
         <div className="flex flex-col gap-8 w-full md:w-2/3 lg:w-1/2 mt-5">
            {heroinfo.map((item, index)=>(
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

      {/* heroinfoFeatures Section */}
      <section className="py-16 bg-gradient-to-r from-secondary/10 via-secondary/80 to-background">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='w-full sm:w-2/3 block lg:hidden '>
          <h2 className="text-5xl font-bold text-center mb-4 animate-slide-down text-text-primary">
          Why we stand out among the crowd.</h2>
        </div>
        <div className="flex flex-col gap-8 w-full md:w-2/3 lg:w-1/2 mt-5">
            {heroinfoFeatures.map((item, index)=>(
              <div key={index} className="flex flex-col md:flex-row items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-1/2" />
                <div>
                  <h3 className="text-2xl font-bold text-text-primary text-center md:text-left">{item.title}</h3>
                  <p className="text-text-secondary text-center md:text-left">{item.description}</p>
                </div>
              </div>
            ))}
         </div>   
        <div className='w-1/2 lg:block hidden'>
          <h2 className="text-4xl font-bold text-center mb-4 animate-slide-down text-text-primary ml-20">
          Why we stand out among the crowd.</h2>
        </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className='text-4xl font-bold text-center animate-slide-down mb-2'>
            Build Your Business.            
          </h2>
          <h1 className="text-4xl md:text-7xl font-extrabold text-text-primary 
          tracking-tight leading-tight 
          flex justify-center flex-wrap gap-1 animate-fade-in-down mb-2">
        {"Our  Services".split("").map((letter, index) => (
          <span
            key={index}
            className="inline-block animate-pulse"
            style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
          >
            {letter}
          </span>
        ))}
      </h1>
          <p className="text-xl text-text-secondary text-center 
          mb-12 max-w-3xl mx-auto animate-slide-down">
            We offer a range of services to help bring your digital vision to life
          </p>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
              {services.map((service) => (
                <Link
                  key={service._id}
                  href={`/services/${service.slug.current}`}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg 
                  transition-shadow hover-lift bg-gradient-to-br from-secondary-light to-secondary"
                >
                  <div className="relative h-48 bg-secondary-dark">
                    {service.mainImage ? (
                      <img
                        src={getImageUrl(service.mainImage) || undefined}
                        alt={service.mainImage.alt || service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-text-light">
                        Service Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-3xl font-semibold mb-4 text-text-primary">{service.title}</h3>
                    <div className="text-text-secondary text-lg mb-6">
                      <PortableText 
                        value={service.description.slice(0, 2)}
                        components={portableTextComponents}
                      />
                    </div>
                    <div className="text-primary font-medium hover:text-primary-dark transition-colors inline-flex w-full">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gradient-to-r from-secondary/10 via-secondary/80 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 animate-slide-down text-text-primary">Creative Solutions.</h2>
          <p className="text-2xl text-text-secondary mb-12 max-w-2xl animate-slide-down">
          Look at our previous work and projects which our team has already accomplished. 
          </p>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {featuredProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/portfolio/${project.slug.current}`}
                  className="bg-gradient-to-br from-secondary-dark to-secondary-light 
                  rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow hover-lift"
                >
                  <div className="relative h-48 bg-secondary">
                  {project.video ? (
                      <VideoPlayer video={project.video} />
                    ) : (
                      <img
                        src={getImageUrl(project.mainImage) || undefined}
                        alt={project.mainImage.alt || project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-md font-semibold text-primary 
                    bg-gradient-to-br from-primary-dark to-secondary-light rounded-full mb-2">
                      {project.service?.title || 'Uncategorized'}
                    </span>
                    <h3 className="text-2xl font-semibold mb-2 text-text-primary">{project.title}</h3>
                    <div className="text-text-secondary text-md mb-4">
                      <PortableText 
                        value={project.description.slice(0, 2)}
                        components={portableTextComponents}
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                          <p className='font-semibold text-text-primary mb-2'>
                            Technologies Used:
                          </p>
                      </div> 
                      <div className='flex flex-wrap gap-2'>
                        {project.technologies?.map((technology, index) => (
                          <p key={index} className='button-tech hover:button-tech 
                          hover:animate-pulse duration-500'>
                            {technology}
                          </p>
                        ))}
                      </div>
                      <div>
                        <p className='text-2xl bg-gradient-to-br from-text-primary to-accent text-transparent bg-clip-text font-semibold mt-3'>
                          {project?.client}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-14">
            <Link
              href="/portfolio"
              className="bg-gradient-to-r from-primary-dark to-primary text-xl text-primary 
              px-8 py-3 rounded-full font-bold
              hover:bg-gradient-to-br hover:from-secondary-dark 
              hover:to-secondary-light transition-colors duration-700 "
            >
              See Our Works
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-16 overflow-hidden mb-20" id="testimonials">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/5 to-background" />
        {/* Enhanced 3D-like Background Elements */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-text-primary relative opacity-0 transition-opacity duration-1000" 
              data-testimonial-title>
            What Our Clients Say
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-secondary/5 backdrop-blur-sm p-8 rounded-2xl shadow-lg 
                hover:shadow-xl hover:-translate-y-1
                border border-secondary/10 relative overflow-hidden opacity-0 translate-y-20 transition-all duration-1000"
                data-testimonial-card
                style={{ transitionDelay: `${index * 200}ms` }}
              > 
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-text-secondary">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary italic relative pl-6">
                    <span className="absolute left-0 top-0 text-4xl text-primary/20 group-hover:text-primary/30 transition-colors duration-300">"</span>
                    {testimonial.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/10 via-secondary/80 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-slide-down">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-slide-down hidden">
            Let's work together to bring your ideas to life. Contact me today to discuss your project.
          </p>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-slide-down">
          Got a question or want to discuss your project? 
          We'd love to hear from you! Drop us a message to say hi, 
          and our friendly team will get back to you soon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-primary-dark to-primary text-xl text-primary 
              px-8 py-3 rounded-full font-bold
              hover:bg-gradient-to-br hover:from-secondary-dark 
              hover:to-secondary-light transition-colors duration-700"
            >
              Get In Touch
            </Link>
            <Link
              href="/portfolio"
              className="bg-gradient-to-br from-secondary-dark to-secondary text-xl text-primary 
              px-8 py-3 rounded-full font-bold 
              hover:bg-gradient-to-tl hover:from-secondary-light
              hover:to-primary-dark transition-colors duration-700"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
      <section>
      </section>
    </main>
  );
}
