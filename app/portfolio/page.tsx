'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { client, projectsQuery, servicesQuery, projectsByServiceQuery } from '@/lib/sanity';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioFilter from '@/components/portfolio/PortfolioFilter';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import PortfolioMidSec from '@/components/portfolio/PortfolioMidSec';

interface Service {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
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

function PortfolioContent() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get('service');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await client.fetch(servicesQuery);
        setServices(servicesData || []);
        
        if (serviceSlug) {
          const service = servicesData.find((s: Service) => s.slug.current === serviceSlug);
          if (service) {
            setSelectedService(service);
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services');
      }
    };

    fetchServices();
  }, [serviceSlug]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let projectsData;
        if (selectedService) {
          projectsData = await client.fetch(projectsByServiceQuery, { serviceId: selectedService._id });
        } else {
          projectsData = await client.fetch(projectsQuery);
        }
        
        setProjects(projectsData || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [selectedService]);

  const handleServiceChange = (service: Service | null) => {
    setSelectedService(service);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Error Loading Projects</h2>
          <p className="text-text-secondary mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
      <PortfolioHero />
      <PortfolioMidSec />
      <div className="text-center mt-12 mb-2">
        <h1 className="text-5xl font-bold mb-4 text-text-primary">Explore our recent work below.</h1>
      </div>
      <PortfolioFilter 
        services={services}
        selectedService={selectedService}
        onServiceChange={handleServiceChange}
      />
      <PortfolioGrid projects={projects} />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-16 bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  );
} 