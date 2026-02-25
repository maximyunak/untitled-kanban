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

    async onResponseError({ response, options, request }) {
      if (response.status === 401 && typeof request === 'string' && !request.includes('auth/login')) {
        console.log('401 error', request);

        try {
          await $fetch('/auth/refresh', {
            baseURL: 'http://localhost:8000/api',
            credentials: 'include',
            headers: ssrHeaders,
          });


          return $fetch(request, options);
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
