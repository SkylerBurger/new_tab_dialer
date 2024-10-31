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
          if (!clonedResponse.ok) {
            throw new Error(
              `HTTP error while fetching image: ${clonedResponse.status}`,
            );
          }
          cache.put(imageUrl, clonedResponse);
          // Set creation time in localStorage
          localStorage.setItem(imageUrl, Date.now());
          // Create ObjectURL from the response for the img tag
          blob = await response.blob();
        }

        const imageObjectURL = URL.createObjectURL(blob);
        setImage(imageObjectURL);
      } catch (error) {
        // Placeholder image
        const response = await fetch("./not_found.png");
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setImage(imageObjectURL);
      }
    };

    fetchImage();
  }, [imageUrl]);

  return image;
}

export default useCachedImage;
