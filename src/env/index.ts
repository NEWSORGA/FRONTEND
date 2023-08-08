
const BASE_URL: string = import.meta.env.VITE_BACK_URL as string
console.log(BASE_URL);
const APP_ENV = {
    BASE_URL: BASE_URL
};

export { APP_ENV };