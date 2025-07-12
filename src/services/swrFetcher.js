import { api } from "../utils/api";

export const swrFetcher = (url) => api.get(url).then((res) => res.data);
