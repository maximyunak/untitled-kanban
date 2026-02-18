import { FetchError } from 'ofetch';
import type { IInvite } from '~/types/invites';

export const useInvite = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();

  const invites = useState<IInvite[]>('invite', () => []);

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
        console.log(res);

        const message = !Array.isArray(res?.message) ? res.message : res.message.toString();

        toast.add({
          title: message,
          color: 'error',
        });
      }
    }
  };

  const getMyInvites = async () => {
    try {
      const res = await $api<{
        invites: IInvite[];
      }>('/invites');

      invites.value = res.invites;
      return res;
    } catch (error) {}
  };

  return {
    invites,
    invite,
    getMyInvites,
  };
};
