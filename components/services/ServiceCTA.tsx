import React from 'react';
import Link from 'next/link';

interface ServiceCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title = "Let's Talk",
  description = "Got a question or want to discuss your project? We'd love to hear from you! Drop us a message to say hi, and our friendly team will get back to you soon.",
  buttonText = "Start your project",
  buttonLink = "/contact"
}) => {
  return (
    <section className="py-20 bg-gradient-to-bl from-secondary-dark/50 via-secondary/60 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{description}</p>
          <Link
            href={buttonLink}
            className="button-tech-big hover:animate-pulse hover:transition-colors hover:duration-300"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA; 