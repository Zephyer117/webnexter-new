'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { client, projectBySlugQuery, getImageUrl, relatedProjectsQuery } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import VideoPlayer from '@/app/components/VideoPlayer';

interface Project {
  _id: string;
  title: string;
  description: any;
  mainImage: any;
  service: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  technologies: string[];
  featured: boolean;
  content: any[];
  gallery: any[];
  client: string;
  projectUrl: string;
  completionDate: string;
  slug: {
    current: string;
  };
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

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  


  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const projectData = await client.fetch(projectBySlugQuery, { slug });
        if (!projectData) {
          setError('Project not found');
          return;
        }
        setProject(projectData);

        // Fetch related projects
        if (projectData.service?._id) {
          const relatedProjectsData = await client.fetch(relatedProjectsQuery, {
            serviceId: projectData.service._id,
            slug: projectData.slug.current
          });
          console.log('Related projects:', relatedProjectsData); // Debug log
          setRelatedProjects(relatedProjectsData || []);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

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
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Error Loading Project</h2>
          <p className="text-text-secondary mb-8">{error}</p>
          <Link
            href="/portfolio"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Project Not Found</h2>
          <p className="text-text-secondary mb-8">The project you're looking for doesn't exist.</p>
          <Link
            href="/portfolio"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/portfolio" className="text-primary hover:text-primary-dark flex items-center hover:animate-pulse">
          <div className="mt-8 mb-6 button-tech-big button-tech-big-hover animate-slide-left hover:duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Portfolio
          </div>
        </Link>

        <div className="prose prose-lg max-w-none mt-5">
          <h1 className="text-4xl font-bold text-text-primary mb-6 animate-slide-left">{project.title}</h1>
          
          <div className="relative aspect-video mb-10 animate-slide-right">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 animate-slide-up">
            <div className="md:col-span-2">
              <div className="mb-8">
                <PortableText value={project.description} components={portableTextComponents} />
              </div>
              
              {/* {project.content && project.content.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Project Details</h2>
                  <PortableText value={project.content} components={portableTextComponents} />
                </div>
              )}
              */}
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-semibold bg-gradient-to-r from-text-primary to-primary-dark text-transparent bg-clip-text mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies && project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 font-semibold rounded-lg cursor-pointer text-sm bg-gradient-to-br from-primary to-secondary 
            hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark 
            hover:duration-600 hover:shadow-lg hover:scale-3d hover:animate-pulse"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.client && (
                <div>
                  <h3 className="text-3xl font-semibold bg-gradient-to-r from-text-primary to-secondary text-transparent bg-clip-text">Client</h3>
                  <p className="text-text-secondary text-xl font-bold">{project.client}</p>
                </div>
              )}

              {project.completionDate && (
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Completion Date</h3>
                  <p className="text-text-secondary">{project.completionDate}</p>
                </div>
              )}

              {project.projectUrl && (
                <div>
                  <h3 className="text-3xl font-semibold text-text-primary mb-2">Project URL</h3>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold bg-gradient-to-tr from-text-primary to-primary text-transparent bg-clip-text hover:animate-pulse"
                  >
                    {project.projectUrl}
                  </a>
                </div>
              )}
            </div>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={getImageUrl(image) || undefined}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => {
                  console.log('Rendering related project:', relatedProject); // Debug log
                  return (
                    <Link
                      key={relatedProject._id}
                      href={`/portfolio/${relatedProject.slug.current}`}
                      className="bg-gradient-to-br from-secondary-dark to-secondary-light 
                      rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow hover-lift"
                    >
                      <div className="relative h-48 bg-secondary">
                        {relatedProject.mainImage && (
                          <img
                            src={relatedProject.mainImage.asset.url}
                            alt={relatedProject.mainImage.alt || relatedProject.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white font-semibold">View Project →</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-text-primary mb-2">{relatedProject.title}</h3>
                        {relatedProject.service && (
                          <p className="text-text-secondary text-sm">
                            {relatedProject.service.title}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 