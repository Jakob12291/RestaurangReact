// Bas-URL till REST-API:et (uppgift 1). Kan överskridas med en .env-fil (VITE_API_URL).
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5144'
