'use client';

import { useState, useEffect, useRef } from 'react';
import { urlFor, getImageUrl } from '@/lib/sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface VideoPlayerProps {
  video: {
    asset: {
      _ref: string;
      _type: string;
    };
    title?: string;
    description?: string;
    thumbnail?: {
      asset: SanityImageSource;
      alt?: string;
    };
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (!video?.asset) {
          throw new Error('No video asset found');
        }

        // Get the video URL from Sanity
        const videoUrlBuilder = urlFor(video.asset);
        if (!videoUrlBuilder) {
          throw new Error('Failed to construct video URL');
        }

        // Log the video asset and URL builder for debugging
        console.log('Video asset:', video.asset);
        console.log('Video URL builder:', videoUrlBuilder);

        let url = typeof videoUrlBuilder === 'string' ? videoUrlBuilder : videoUrlBuilder?.url();
        if (!url) {
          throw new Error('Failed to get video URL');
        }

        // Log the final URL for debugging
        console.log('Final video URL:', url);

        // Set the video URL
        setVideoUrl(url);
        
        // Get the thumbnail URL if available
        if (video.thumbnail?.asset) {
          const thumbUrl = getImageUrl(video.thumbnail.asset);
          if (thumbUrl) {
            setThumbnailUrl(thumbUrl);
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading video:', err);
        setError(err instanceof Error ? err.message : 'Failed to load video');
        setIsLoading(false);
      }
    };

    loadVideo();
  }, [video]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.target as HTMLVideoElement;
    
    // Add more detailed logging
    console.log('Video element:', videoElement);
    console.log('Video props:', {
      videoUrl,
      isPlaying,
      error,
      isLoading
    });

    const errorDetails = {
      error: videoElement.error,
      networkState: videoElement.networkState,
      readyState: videoElement.readyState,
      currentSrc: videoElement.currentSrc,
      src: videoElement.src,
    };
    
    // Log raw error details
    console.log('Raw error details:', errorDetails);
    console.error('Video error details:', errorDetails);
    
    // Try to determine the actual video format
    const currentVideoUrl = videoElement.currentSrc || videoUrl;
    if (!currentVideoUrl) {
      setError('No video URL available');
      return;
    }

    const fileExtension = currentVideoUrl.split('.').pop()?.toLowerCase();
    
    // Handle specific error cases
    if (videoElement.error) {
      switch (videoElement.error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          setError('Video playback was aborted');
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          setError(`Network error while loading video from: ${currentVideoUrl}`);
          break;
        case MediaError.MEDIA_ERR_DECODE:
          setError(`The video format (${fileExtension}) is not supported by your browser`);
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          setError(`The video source (${currentVideoUrl}) is not supported`);
          break;
        default:
          setError(`An error occurred while playing the video: ${videoElement.error.message || 'Unknown error'}`);
      }
    } else {
      setError(`Failed to play video from: ${currentVideoUrl}`);
    }
  };

  if (error) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center group hover-lift">
        <div className="text-center p-6 glass w-full h-full flex flex-col items-center justify-center">
          <div className="text-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-text-primary mb-4 font-medium">{error}</p>
          {thumbnailUrl && (
            <img 
              src={thumbnailUrl} 
              alt={video.thumbnail?.alt || video.title || 'Video thumbnail'} 
              className="w-full h-full object-cover opacity-30 absolute inset-0 -z-10"
            />
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center hover-lift">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="text-text-secondary animate-pulse">Loading video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary group hover-lift">
      {!isPlaying && thumbnailUrl ? (
        <div 
          className="absolute inset-0 cursor-pointer overflow-hidden"
          onClick={() => setIsPlaying(true)}
        >
          <img 
            src={thumbnailUrl} 
            alt={video.thumbnail?.alt || video.title || 'Video thumbnail'} 
            className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center transform transition-all group-hover:scale-110 group-hover:bg-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          controls
          playsInline
          onError={handleVideoError}
          className="w-full h-full object-cover"
          preload="metadata"
          onLoadStart={() => console.log('Video load started')}
          onLoadedMetadata={() => console.log('Video metadata loaded')}
        >
          <source 
            src={videoUrl || ''} 
            type={`video/${videoUrl?.split('.').pop()?.toLowerCase() || 'mp4'}`}
          />
          <p className="text-text-primary p-4">
            Your browser does not support the video tag.
          </p>
        </video>
      )}
    </div>
  );
} 