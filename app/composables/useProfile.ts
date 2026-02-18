import type { IFullUser, IUser } from '~/types/user';

export const useProfile = () => {
  const { $api } = useNuxtApp();
  const data = useState<IFullUser>('me');

  const fetchData = async () => {
    try {
      const res = await $api<{
        user: IFullUser;
      }>('/users/me');
      data.value = res.user;
    } catch (error) {}
  };

  return {
    data,
    fetchData,
  };
};
