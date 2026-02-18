import type { IUser } from '~/types/user';

export const useUserStore = defineStore('userStore', () => {
  const user = ref<IUser>();

  const { $api } = useNuxtApp();
  const fetchData = async (id: string) => {
    const res = await $api<IUser>(`/users/${id}`);
    console.log(res);

    user.value = res;
  };

  return {
    user,
    fetchData,
  };
});
