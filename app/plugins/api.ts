export default defineNuxtPlugin(() => {
  const ssrHeaders = process.server ? useRequestHeaders(['cookie']) : undefined;

  const api = $fetch.create({
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

    async onResponseError({ response, options }) {
      if (response.status === 401) {
        try {
          await $fetch('/auth/refresh', {
            baseURL: 'http://localhost:8000/api',
            credentials: 'include',
            headers: ssrHeaders,
          });

          return $fetch(response.url, options);
        } catch (e) {
          console.error('Refresh failed', e);
          if (process.client) {
            navigateTo('/login');
          }
        }
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
