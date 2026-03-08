export const baseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_BASE_DEV_API_URL
  : import.meta.env.VITE_BASE_PROD_API_URL;