'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { usePathname } from 'next/navigation';
import Image from 'next/image';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-light to-secondary-dark 
                rounded-lg flex items-center justify-center 
                text-text-primary font-bold text-xl mr-2 
                shadow-md group-hover:shadow-lg transition-all 
                duration-600 transform group-hover:scale-105">
                  <Image src="/webnexter.png" alt="logo" width={40} height={40} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-text-primary to-primary bg-clip-text text-transparent">
                  Webnexter
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-2 py-2 text-md font-semibold transition-all duration-300 ${
                    isActive(link.path) ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                  } group`}
                >
                  {link.name}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform origin-left transition-transform duration-300 ${
                      isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
              {isSignedIn ? (
                <div className="hover:scale-105 transition-transform">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{ elements: { avatarBox: "w-9 h-9" } }}
                  />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors z-[101] outline-none focus:outline-none hover:outline-none active:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute w-full h-0.5 bg-text-primary transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`} />
                <span className={`absolute w-full h-0.5 bg-text-primary transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-3'}`} />
                <span className={`absolute w-full h-0.5 bg-text-primary transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden z-[99] ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ top: '64px' }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-secondary/80 hover:text-text-primary'
                }`}
                onClick={handleMenuItemClick}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-secondary/20">
              {isSignedIn ? (
                <div className="px-4 py-2">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{ elements: { avatarBox: "w-9 h-9" } }}
                  />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button 
                    className="w-full px-4 py-3 rounded-lg text-center font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all duration-300"
                    onClick={handleMenuItemClick}
                  >
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar; 