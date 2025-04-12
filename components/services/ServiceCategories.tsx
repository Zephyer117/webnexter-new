'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client, servicesQuery, featuredProjectsQuery, getImageUrl } from '@/lib/sanity';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { ArrowRight } from 'lucide-react';


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

export default function serviceCategory() {
  const [services, setServices] = useState<Service[]>([]);
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
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

return (
  <section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className='text-6xl font-bold text-center animate-slide-down mb-2 duration-1000'>
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
            transition-shadow hover-lift bg-gradient-to-br from-secondary-light to-secondary 
            hover:bg-gradient-to-br hover:from-secondary hover:to-secondary-dark duration-500"
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
              <h3 className="text-2xl font-semibold mb-4 text-text-primary">{service.title}</h3>
              <div className="text-text-secondary text-lg mb-6">
                <PortableText 
                  value={service.description.slice(0, 2)}
                  components={portableTextComponents}
                />
              </div>
              <div className="text-2xl bg-gradient-to-br from-text-primary to-accent text-transparent bg-clip-text font-semibold mt-3">
                <span>Learn More </span>
                <ArrowRight className='inline-block' />
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
</section>

)

}