import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Create a client with proper token handling
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'paoqp1wp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-04-05',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
  withCredentials: true,
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio'
  }
});

// Debug logging for environment variables
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  hasToken: !!process.env.SANITY_API_TOKEN
});

// Add error logging for client initialization
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.warn('Missing NEXT_PUBLIC_SANITY_DATASET');
}
if (!process.env.SANITY_API_TOKEN) {
  console.warn('Missing SANITY_API_TOKEN');
}

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) {
    console.log('No source provided to urlFor');
    return null;
  }

  console.log('Source type:', source._type);
  console.log('Source asset:', source.asset);
  console.log('Full source:', source);

  // Handle image assets
  if (source._type === 'image') {
    return builder.image(source);
  }

  // Handle file assets (like videos)
  if (source._type === 'file' || (source.asset && source.asset._ref)) {
    const assetId = source.asset?._ref || source._ref;
    if (!assetId) {
      console.log('No asset ID found');
      return null;
    }

    // Extract the file ID and extension from the asset reference
    const matches = assetId.match(/^file-(.+)-(.+)$/);
    if (!matches) {
      console.log('Invalid asset ID format:', assetId);
      return null;
    }

    const [, fileId, extension] = matches;
    
    // Construct the URL with the proper file extension
    const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.${extension}`;
    console.log('Constructed video URL:', url);
    return url;
  }

  // Handle direct asset references
  if (source._type === 'reference' && source._ref) {
    const matches = source._ref.match(/^file-(.+)-(.+)$/);
    if (!matches) {
      console.log('Invalid reference format:', source._ref);
      return null;
    }

    const [, fileId, extension] = matches;
    const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.${extension}`;
    console.log('Constructed reference URL:', url);
    return url;
  }

  // Handle nested asset references (like in video.asset)
  if (source._ref && source._type === 'reference') {
    // Remove any query parameters but keep the file extension
    const cleanAssetId = source._ref.split('?')[0];
    console.log('Clean nested reference asset ID:', cleanAssetId);
    
    const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${cleanAssetId}`;
    console.log('Constructed nested reference URL:', url);
    return url;
  }

  console.log('No matching type found for source');
  return null;
}

// Utility function to safely get URL from Sanity assets
export function getImageUrl(source: any): string | null {
  if (!source) {
    console.log('No source provided to getImageUrl');
    return null;
  }
  
  const urlBuilder = urlFor(source);
  if (!urlBuilder) {
    console.log('No URL builder returned from urlFor');
    return null;
  }

  if (typeof urlBuilder === 'string') {
    console.log('URL builder is string:', urlBuilder);
    return urlBuilder;
  }

  if (typeof urlBuilder === 'object' && 'url' in urlBuilder) {
    const url = urlBuilder.url();
    console.log('URL builder is object, constructed URL:', url);
    return url;
  }

  console.log('URL builder is neither string nor object with url method');
  return null;
}

// GROQ Queries
export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    features,
    order,
    isFeatured,
    metaDescription
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    features,
    order,
    isFeatured,
    metaDescription,
    metaKeywords
  }
`;

export const projectsQuery = `
  *[_type == "project"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    service->{
      _id,
      title,
      slug
    },
    technologies,
    featured,
    client,
    projectUrl,
    completionDate,
    metaDescription,
    video {
      asset {
        _ref,
        _type
      },
      title,
      description,
      thumbnail {
        asset {
          _ref,
          _type
        },
        alt
      }
    }
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    service->{
      _id,
      title,
      slug
    },
    technologies,
    featured,
    content,
    gallery,
    client,
    projectUrl,
    completionDate,
    metaDescription,
    video {
      asset {
        _ref,
        _type
      },
      title,
      description,
      thumbnail {
        asset {
          _ref,
          _type
        },
        alt
      }
    }
  }
`;

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    service->{
      _id,
      title,
      slug
    },
    technologies,
    featured,
    client,
    projectUrl,
    completionDate
  }
`;

export const projectsByServiceQuery = `
  *[_type == "project" && references($serviceId)] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    service->{
      _id,
      title,
      slug
    },
    technologies,
    featured,
    client,
    projectUrl,
    completionDate,
    metaDescription
  }
`; 

export const relatedProjectsQuery = `
  *[_type == "project" && service._ref == $serviceId && slug.current != $slug] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    service->{
      _id,
      title,
      slug
    }
  }
`;