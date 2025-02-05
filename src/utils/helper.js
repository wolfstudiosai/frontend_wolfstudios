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
  const videoKeywords = ['vimeo', 'playback', 'video'];
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
