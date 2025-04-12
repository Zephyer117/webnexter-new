'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { client, serviceBySlugQuery, projectsByServiceQuery } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { getImageUrl } from '@/lib/sanity';

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
    caption?: string;
  };
  features: Array<{
    title: string;
    description?: string;
  }>;
  order: number;
  isFeatured: boolean;
  metaDescription?: string;
  metaKeywords?: string[];
}

interface Project {
  _id: string;
  title: string;
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
  slug: {
    current: string;
  };
  client?: string;
  projectUrl?: string;
  completionDate?: string;
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

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<Service | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const serviceData = await client.fetch(serviceBySlugQuery, { slug });
        setService(serviceData);
        
        if (serviceData && serviceData._id) {
          const projectsData = await client.fetch(projectsByServiceQuery, { serviceId: serviceData._id });
          setRelatedProjects(projectsData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-primary">Service Not Found</h1>
          <p className="text-xl text-text-secondary mb-8">The service you're looking for doesn't exist.</p>
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
          >
            View All Services
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 min-h-screen pt-24 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Header */}
        <div className="text-left mb-16">
          <div className='animate-slide-left'>
          <Link
            href="/services"
            className="button-tech-big button-tech-big-hover text-white
            hover:duration-600 hover:shadow-lg hover:scale-3d hover:animate-pulse"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Services
          </Link>
          </div>

          
          <h1 className="animate-slide-left text-4xl font-bold mb-6 text-text-primary text-left">{service.title}</h1>
          
          {service.mainImage && (
            <div className="mx-auto mb-8 animate-slide-right">
              <img
                src={getImageUrl(service.mainImage) || ''}
                alt={service.mainImage?.alt || service.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {service.mainImage.caption && (
                <p className="text-sm text-text-secondary mt-2 text-center">{service.mainImage.caption}</p>
              )}
            </div>
          )}
          
          <div className="mx-auto prose prose-invert text-left animate-slide-up">
            <PortableText 
              value={service.description}
              components={portableTextComponents}
            />
          </div>
        </div>

        {/* Features Grid */}
        {service.features && service.features.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-text-primary text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-secondary p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-primary mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-text-secondary">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Projects Button */}
        <div className="text-center mb-16">
          <Link
            href={`/portfolio?service=${service.slug.current}`}
            className="inline-flex items-center button-tech-big button-tech-big-hover text-white
            hover:duration-600 hover:shadow-lg hover:scale-3d hover:animate-pulse"
          >
            View All {service.title} Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-text-primary text-center">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {relatedProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/portfolio/${project.slug.current}`}
                  className="bg-secondary rounded-lg shadow-lg overflow-hidden 
                  hover:shadow-xl group
                  transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105"
                >
                  <div className="relative h-48 w-full bg-secondary-dark overflow-hidden">
                    {project.mainImage && (
                      <img
                        src={getImageUrl(project.mainImage) || ''}
                        alt={project.mainImage?.alt || project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-semibold">View Project →</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-text-primary">{project.title}</h3>
                    <div className="text-text-secondary mb-4">
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
                          <p key={index} className='button-tech button-tech-hover 
                          hover:animate-pulse hover:transform-all hover:duration-600'>
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
          </div>
        )}
      </div>
    </div>
  );
} 