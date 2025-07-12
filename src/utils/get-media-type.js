// Utility function to get file type from URL
export const getMediaTypeFromUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');

    if (contentType?.startsWith('video/')) {
      return 'VIDEO';
    } else if (contentType?.startsWith('image/')) {
      return 'IMAGE';
    }
  } catch (error) {
    console.error('Error checking media type:', error);
  }

  // Fallback to extension check if HEAD request fails
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv'];
  const lowerCaseUrl = url.toLowerCase();
  return videoExtensions.some((ext) => lowerCaseUrl.includes(ext)) ? 'VIDEO' : 'IMAGE';
};
