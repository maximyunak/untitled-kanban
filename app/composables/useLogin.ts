import type { ILoginData } from '~/types/auth';

export const useLogin = () => {
  const router = useRouter();
  const localePath = useLocalePath();
  const { $api } = useNuxtApp();
  const { handleError } = useErrorHandler()

  // submit
  const login = async (userData: ILoginData) => {
    try {
      const res = await $api(`/auth/login`, {
        body: userData,
        method: 'POST',
      });
      setTimeout(async () => {
        await router.push(localePath('/'));
      }, 250);
      return res
    } catch (error) {
      handleError(error)
    }
  };
  // oath

  return { login };
};
