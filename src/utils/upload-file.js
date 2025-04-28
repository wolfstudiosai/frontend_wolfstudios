import axios from 'axios';
import { api } from './api';

export const uploadFileAsync = async (file) => {
  const formData = new FormData();
  formData.append('files', file);
  const response = await api.post('/file/upload', formData);
  if (!response.data.success) return;
  return response.data.data;
};

export const imageUploader = async (imagesMeta, folder) => {
  if (imagesMeta.length) {
    // Step 2: Send metadata to get presigned URLs
    const imagesData = {
      meta: imagesMeta.map(({ fileName, fileType }) => ({ fileName, fileType })),
      model: folder, // or whatever model you're uploading for 'portfolios'
    };

    const res = await api.post(`/uploads`, imagesData);

    if (res?.data?.success) {
      // Step 3: Match returned URLs with image files
      const filesWithUrls = imagesMeta
        .map((item) => {
          const matched = res.data?.data?.find((f) => f.fileName === item.fileName);
          if (matched?.url) {
            return {
              file: item.file,
              url: matched.url,
              uploadURL: matched.uploadURL,
            };
          }
          return null;
        })
        .filter(Boolean); // remove nulls

      // Step 4: Upload files to presigned URLs (e.g., S3)
      await Promise.all(
        filesWithUrls.map(({ url, file }) => {
          return axios.put(url, file, {
            headers: {
              'Content-Type': file.type,
            },
          });
        })
      );

      return filesWithUrls.map(({ uploadURL }) => uploadURL);
    }
  }
}

export const getImageType = (type) => {
  switch (type) {
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'bmp':
      return 'image/bmp';
    case 'ico':
      return 'image/x-icon';
    case 'tiff':
      return 'image/tiff';
    case 'heic':
      return 'image/heic';
    case 'raw':
      return 'image/raw';
    case 'avif':
      return 'image/avif';
    case 'jfif':
      return 'image/jpeg';
    case 'indd':
      return 'application/x-indesign';
    case 'ai':
      return 'application/postscript';
    case 'eps':
      return 'application/postscript';
    case 'psd':
      return 'application/photoshop';
    case 'pdf':
      return 'application/pdf';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'doc':
      return 'application/msword';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'ppt':
      return 'application/vnd.ms-powerpoint';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'csv':
      return 'text/csv';
    case 'txt':
      return 'text/plain';
    case 'zip':
      return 'application/zip';
    case 'rar':
      return 'application/x-rar-compressed';
    case 'tar':
      return 'application/x-tar';
    default:
      return 'application/octet-stream';
  }
}