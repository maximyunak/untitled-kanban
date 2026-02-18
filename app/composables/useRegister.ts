import type { IRegisterData, IRegisterResponse } from '~/types/auth';

export const useRegister = () => {
  const router = useRouter();
  const localePath = useLocalePath();
  const { $api } = useNuxtApp();

  // submit
  const register = async (userData: IRegisterData): Promise<IRegisterResponse> => {
    try {
      const res: IRegisterResponse = await $api('/auth/register', {
        method: 'post',
        body: userData,
      });

      setTimeout(async () => {
        await router.push(localePath('/'));
      }, 250);

      return res;
    } catch (err: any) {
      return err.data as IRegisterResponse;
    }
  };
  // oath

  return { register };
};
