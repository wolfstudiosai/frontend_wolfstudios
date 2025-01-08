export const getFilenameFromUrl = (url) => {
    return url.split("/").pop();
};