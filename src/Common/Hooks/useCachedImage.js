import { useState, useEffect } from "react";

function useCachedImage(cacheName, imageUrl, storageDuration) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const checkForValidCache = async () => {
      const cachedResponse = await caches.match(imageUrl);
      if (cachedResponse) {
        // Handle deletion of expired responses in cache
        const createdAt = localStorage.getItem(imageUrl);
        if (createdAt) {
          const expirationTime = parseInt(createdAt) + storageDuration;
          if (Date.now() > expirationTime) {
            const cache = await caches.open(cacheName);
            localStorage.removeItem(imageUrl);
            await cache.delete(imageUrl);
            return null;
          }
        }
        return cachedResponse;
      } else {
        return null;
      }
    };

    const fetchImage = async () => {
      try {
        // Check if the image is already in the browser's cache
        const cachedResponse = await checkForValidCache();
        let blob;

        if (cachedResponse) {
          blob = await cachedResponse.blob();
        } else {
          const response = await fetch(imageUrl);
          // Cache the response for future use
          const cache = await caches.open(cacheName);
          const clonedResponse = response.clone();
          cache.put(imageUrl, clonedResponse);
          // Set creation time in localStorage
          localStorage.setItem(imageUrl, Date.now());
          // Create ObjectURL from the response for the img tag
          blob = await response.blob();
        }

        const imageObjectURL = URL.createObjectURL(blob);
        setImage(imageObjectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
        // TODO: return placeholder image
      }
    };

    fetchImage();

    return () => {
      // Clean up the object URL when the component unmounts
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [imageUrl]);

  return image;
}

export default useCachedImage;
