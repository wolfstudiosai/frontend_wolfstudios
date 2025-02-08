import { alpha } from '@mui/material';

export const getSearchQuery = (queryParams) => {
  const { page, rowsPerPage, status } = queryParams; // value, columns, fromDate, toDate
  let query = '?';
  if (status && status !== '') {
    query += `status=${status}&`;
  }
  // if (columns.length > 0 && value.length > 0) {
  //     query += `columns=${columns}&`;
  // }
  // if (columns.length > 0 && value.length > 0) {
  //     query += `value=${value}&`;
  // }
  // if (fromDate) {
  //     query += `from_date=${fromDate}&`;
  // }
  // if (toDate) {
  //     query += `to_date=${toDate}&`;
  // }
  query += `page=${page}&limit=${rowsPerPage}`;
  return query;
};

export const getSpeficiLengthString = (string, length) => {
  if (string.length > length) {
    return string.substring(0, length) + '...';
  }
  return string;
};

export const getModifiedStatus = (status) => {
  const newStatus = status.split('_').join(' ').toUpperCase();
  return newStatus;
};

export function debounceFunc(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const getSearchQueryPortfolio = (queryParams) => {
  const { searchTerm, page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc' } = queryParams;

  const query = new URLSearchParams();

  if (searchTerm) {
    query.append('searchTerm', searchTerm);
  }
  if (page) {
    query.append('page', page);
  }
  if (limit) {
    query.append('limit', limit);
  }
  if (sortBy) {
    query.append('sortBy', sortBy);
  }
  if (sortOrder) {
    query.append('sortOrder', sortOrder);
  }
  return `?${query.toString()}`;
};

export const isVideoContent = (url) => {
  const videoKeywords = ['vimeo', 'playback', 'video', 'mp4', 'webm', 'ogg'];
  return videoKeywords.some((keyword) => url.includes(keyword));
};

export const sliderToGridColsCoverter = (sliderCols) => {
  switch (sliderCols) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
    case 4:
      return 6;
    case 5:
      return 8;
    case 6:
      return 12;
    case 7:
      return 24;
    default:
      return 4;
  }
};

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export const textShortner = (text, length) => {
  if (text && text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};

const colors = ['#5C7285', '#818C78', '#D2665A', '#48A6A7', '#16404D', '#809D3C', '#578E7E', '#E16A54'];
export const getRandomColor = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return alpha(color, 0.8);
};

export const getFancyColor = (index) => {
  const newIndex = index > colors.length - 1 ? 0 : index;
  return colors[newIndex];
};

export const extractFilenameAndType = (path) => {
  if (!path) return { name: '', type: '' };
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  const [name, type] = filename.split('.');
  return { fileName: name, fileType: type };
};

export const isSupabaseUrl = (url) => {
  if (!url) return false;
  return !url.includes('http') && !url.includes('www');
};

const gradients = [
  'linear-gradient(135deg, #B3CFFF 0%, #9EB8FF 50%, #8AA8FF 100%)', 
  'linear-gradient(135deg, #D8E2F0 0%, #C1CEDD 50%, #B8C7DC 100%)', 
  'linear-gradient(135deg, #C2E4FE 0%, #A9D4FD 50%, #90D1FC 100%)', 
  'linear-gradient(135deg, #E6CFF2 0%, #D8BCE6 50%, #D4AEE8 100%)', 
  'linear-gradient(135deg, #BBDEFB 0%, #A6D1F9 50%, #90CAF9 100%)', 
];

export const getRandomGradientColor = (index) => {
  const newIndex = index > colors.length - 1 ? 0 : index;
  return gradients[newIndex];
};
