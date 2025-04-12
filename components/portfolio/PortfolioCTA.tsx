'use client';

import React from 'react';
import Link from 'next/link';

interface PortfolioCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const PortfolioCTA: React.FC<PortfolioCTAProps> = ({
  title = "Ready to Start Your Project?",
  description = "Let's discuss how we can help bring your ideas to life. Contact us today for a free consultation.",
  buttonText = "Get in Touch",
  buttonLink = "/contact"
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{description}</p>
          <Link
            href={buttonLink}
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/10 hover:text-white transition-colors duration-300 border border-white/20"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCTA; 