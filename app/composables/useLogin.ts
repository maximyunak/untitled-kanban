import type { ILoginData, ILoginResponse } from '~/types/auth';

export const useLogin = () => {
  const router = useRouter();
  const localePath = useLocalePath();
  const config = useRuntimeConfig();

  // submit
  const login = async (userData: ILoginData): Promise<ILoginResponse> => {
    const res = await $fetch(`/login`, {
      body: userData,
      method: 'POST',
    });
    setTimeout(async () => {
      await router.push(localePath('/'));
    }, 250);

    return {};
  };
  // oath

  return { login };
};
