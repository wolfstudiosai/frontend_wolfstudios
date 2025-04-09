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
