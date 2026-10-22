import { useState, useCallback } from 'react';
import './ImageWithFallback.css';

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  aspectRatio = '1/1',
  loading = 'lazy',
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`image-wrapper ${className}`}
      style={{ aspectRatio }}
    >
      {hasError ? null : (
        <>
          {!isLoaded && <div className="image-skeleton" />}
          <img
            src={src}
            alt={alt}
            loading={loading}
            onError={handleError}
            onLoad={handleLoad}
            className={`image-content ${isLoaded ? 'loaded' : ''}`}
            {...props}
          />
        </>
      )}
    </div>
  );
}
