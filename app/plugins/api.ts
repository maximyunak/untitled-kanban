export default defineNuxtPlugin(() => {
  const ssrHeaders = process.server ? useRequestHeaders(['cookie']) : undefined;

  const api: typeof $fetch = $fetch.create({
    baseURL: 'http://localhost:8000/api',
    credentials: 'include',

    onRequest({ options }) {
      if (process.server && ssrHeaders) {
        options.headers = {
          ...options.headers,
          ...ssrHeaders,
        };
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
