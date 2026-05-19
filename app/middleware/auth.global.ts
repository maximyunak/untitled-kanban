export default defineNuxtRouteMiddleware(async (to, from) => {
  const publicRoutes = ['/login', '/register', '/landing', '/en/landing', '/en/login', 'en/register'];
  if (publicRoutes.includes(to.path)) {
    return
  }
  const {fetchData} = useProfile()

  const {data} = await useAsyncData('user', () => fetchData())
  if (!data.value) {
    return navigateTo('/login')
  }
})
