export function getImageUrl(imagePath: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    // Fallback to local images if Cloudinary isn't configured yet
    return imagePath.startsWith('/') ? imagePath : `/images/${imagePath}`;
  }
  
  // Clean up path, ensuring it doesn't have a leading slash
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // If the path doesn't include "images/", append it so it matches the local structure
  const normalizedPath = cleanPath.startsWith('images/') ? cleanPath : `images/${cleanPath}`;
  
  // Return optimized Cloudinary URL
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${normalizedPath}`;
}
