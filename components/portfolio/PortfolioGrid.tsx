'use client';

import React from 'react';
import Link from 'next/link';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import VideoPlayer from '@/app/components/VideoPlayer';
import { getImageUrl } from '@/lib/sanity';

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
  technologies: string[];
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

interface PortfolioGridProps {
  projects: Project[];
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

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">

        <h2 className="text-2xl font-bold mb-4 text-text-primary">No Projects Found</h2>
        <p className="text-text-secondary mb-8">No projects found. Please check back later.</p>
        <Link
          href="/portfolio"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
        >
          View All Projects
        </Link>
      </div>
    );
  }

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {projects.map((project) => (
        <div key={project._id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg 
            transition-shadow hover-lift bg-gradient-to-br from-secondary-light to-secondary 
            hover:bg-gradient-to-br hover:from-secondary hover:to-secondary-dark duration-500">
          <Link href={`/portfolio/${project.slug.current}`}>
            <div className="relative aspect-video">
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
              <h3 className="text-xl font-bold text-text-primary mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies && project.technologies.slice(0, 2).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-sm font-bold 
                    rounded-full bg-gradient-to-br from-primary to-secondary"
                  >
                    Tech: {tech}
                  </span>
                ))}
              </div>
              <div className="text-text-secondary">
                <PortableText value={project.description.slice(0, 2)} components={portableTextComponents} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid; 