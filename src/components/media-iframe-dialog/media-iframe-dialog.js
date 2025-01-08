import Image from 'next/image';
import { Dialog } from '../dialog/Dialog';

export const MediaIframeDialog = ({ open, data, onClose, onComplete }) => {
  const isVideoUrl = (url) => {
    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];

    const youtubePattern = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
    const youtubeMatch = url.match(youtubePattern);

    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return videoExtensions.some((ext) => url.toLowerCase().endsWith(`.${ext}`)) ? url : null;
  };
  return (
    <Dialog open={open} onClose={onClose} title="Media Preview">
      {data ? (
        isVideoUrl(data) ? (
          <iframe
            src={isVideoUrl(data)}
            title="Video Preview"
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <Image src={data} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        )
      ) : (
        <p>No media to display.</p>
      )}
    </Dialog>
  );
};
