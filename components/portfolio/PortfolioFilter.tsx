'use client';

import React from 'react';
import Link from 'next/link';

interface Service {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

interface PortfolioFilterProps {
  services: Service[];
  selectedService: Service | null;
  onServiceChange: (service: Service | null) => void;
}

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
  services,
  selectedService,
  onServiceChange
}) => {
  return (
    <section className="py-10 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onServiceChange(null)}
            className={`px-6 py-2 rounded-full transition-colors ${
              !selectedService
                ? 'button-tech-big hover:animate-pulse hover:transition-colors hover:duration-300'
                : 'button-tech-big-change hover:animate-pulse hover:transition-colors hover:duration-300'
            }`}
          >
            All Projects
          </button>
          {services.map((service) => (
            <button
              key={service._id}
              onClick={() => onServiceChange(service)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedService?._id === service._id
                  ? 'button-tech-big hover:animate-pulse hover:transition-colors hover:duration-300'
                  : 'button-tech-big-change hover:animate-pulse hover:transition-colors hover:duration-300'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioFilter; 