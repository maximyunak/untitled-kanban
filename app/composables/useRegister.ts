import type { IRegisterData, IRegisterResponse } from '~/types/auth';

export const useRegister = () => {
  const router = useRouter();
  const localePath = useLocalePath();
  const { $api } = useNuxtApp();
  const { handleError } = useErrorHandler()
  const toast = useToast();
  // submit
  const register = async (userData: IRegisterData) => {
    try {
      const res: IRegisterResponse = await $api('/auth/register', {
        method: 'post',
        body: userData,
      });

      toast.add({
        title: 'Registration successful',
        color: 'success',
      });

      setTimeout(async () => {
        await router.push(localePath('/'));
      }, 250);

      return res;
    } catch (error: any) {
      return handleError(error)
    }
  };
  // oath

  return { register };
};
