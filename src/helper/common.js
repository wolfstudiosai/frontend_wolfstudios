export const getSearchQuery = (queryParams) => {
    const { page, rowsPerPage, status } =
        queryParams; // value, columns, fromDate, toDate 
    let query = "?";
    if (status && status !== "") {
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
        return string.substring(0, length) + "...";
    }
    return string;
};

export const getModifiedStatus = (status) => {
    const newStatus = status.split("_").join(" ").toUpperCase();
    return newStatus;
}

export function debounceFunc(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}