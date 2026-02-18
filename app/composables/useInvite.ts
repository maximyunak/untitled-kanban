import { FetchError } from 'ofetch';

export const useInvite = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();

  const invite = async (email: string, boardId: number) => {
    try {
      const res = await $api(`/boards/${boardId}/invites`, {
        method: 'post',
        body: {
          email,
          boardId,
        },
      });

      toast.add({
        title: 'Приглашение отправлено',
        color: 'success',
      });

      console.log(res, 'res');
    } catch (error) {
      if (error instanceof FetchError) {
        const res = error?.response?._data;
        toast.add({
          title: res.message,
          color: 'error',
        });
      }
    }
  };

  return {
    invite,
  };
};
