import { alpha } from '@mui/material';
import { toast } from 'sonner';

import { setTokenInCookies } from './axios-api.helpers';

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
  query += `page=${page}&size=${rowsPerPage || 10}`;
  return query;
};

export const getSpeficiLengthString = (string, length) => {
  if (!string) return '';
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
      return 3;
    case 2:
      return 3.6;
    case 3:
      return 4;
    case 4:
      return 4.5;
    case 5:
      return 6;
    case 6:
      return 7.2;
    case 7:
      return 9;
    default:
      return 6;
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

const gradients = ['#C8F0D4', '#FCEBA7', '#A6D1F9'];

export const getRandomGradientColor = (index) => {
  const newIndex = index > gradients.length - 1 ? 0 : index;
  return gradients[newIndex];
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const formatCompactNumber = (number) => {
  const num = Number(number || 0);
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }

  return num.toString();
};

export const handleCopy = async (text) => {
  if (text.length === 0) {
    toast.error('No text to copy.');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy text.');
    console.error('Error copying text:', err);
  }
};


export function isFilterValid(filter) {
  const requiredKeys = ['key', 'type', 'operator', 'value'];
  return requiredKeys.every((key) => {
    const value = filter[key];
    return value !== undefined && value !== null && value !== '';
  });
}

export function validateFilters(filters) {
  const notRequiredFilters = ['is empty', 'is not empty'];
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    const { type, operator, value } = filter;

    // 1. operator is always required
    if (!operator || operator.trim() === '') {
      return {
        valid: false,
        message: `Operator is required in condition ${i + 1}`,
      };
    }

    // 2. value is required for string or number types
    if (
      (['string', 'number'].includes(type)) &&
      !notRequiredFilters.includes(operator) &&
      (value === undefined || value === null || value.toString().trim() === '')
    ) {
      return {
        valid: false,
        message: `Value is required in condition ${i + 1}`,
      };
    }

    // 3. relation type with specific operators must have non-empty array
    if (
      type === 'relation' &&
      ['has any of', 'has none of'].includes(operator) &&
      (!Array.isArray(value) || value.length === 0)
    ) {
      return {
        valid: false,
        message: `At least one item must be selected in condition ${i + 1}`,
      };
    }
  }

  return { valid: true };
}


export function buildQueryParams(filters, gate) {
  const params = new URLSearchParams();
  params.append('gate', gate);
  // Add each filter
  filters.forEach((filter, index) => {
    params.append(`fields[${index}][key]`, filter.key || '');
    params.append(`fields[${index}][type]`, filter.type || '');
    params.append(`fields[${index}][operator]`, filter.operator || '');
    params.append(`fields[${index}][depth]`, filter.depth || '');

    // Handle value based on type
    if (filter.type === 'relation' && Array.isArray(filter.value)) {
      filter.value.forEach((item, itemIndex) => {
        params.append(`fields[${index}][value][${itemIndex}]`, item.value);
      });
    } else if (filter.type === 'array' && Array.isArray(filter.value)) {
      filter.value.forEach((item, itemIndex) => {
        params.append(`fields[${index}][value][${itemIndex}]`, item);
      });
    } else {
      params.append(`fields[${index}][value]`, filter.value ?? '');
    }
  });

  return params.toString();
}
