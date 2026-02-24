import { FetchError } from 'ofetch';
import type { IInvite } from '~/types/invites';

export const useInvite = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();
  const { handleError } = useErrorHandler()

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
      return handleError(error)
    }
  };

  const getMyInvites = async () => {
    try {
      const res = await $api<{
        invites: IInvite[];
      }>('/invites');

      invites.value = res.invites;
      return res;
    } catch (error) { }
  };

  const acceptInvite = async (id: number) => {
    try {
      const res = await $api<{
        invite: IInvite;
      }>(`/invites/${id}/accept`, {
        method: 'patch',
      });
      console.log(res);

      getMyInvites();
      toast.add({
        title: 'Приглашение успешно принято',
        color: 'success',
      });
    } catch (error) {
      return handleError(error)
    }
  };

  const declineInvite = async (id: number) => {
    try {
      const res = await $api<{
        invite: IInvite;
      }>(`/invites/${id}/decline`, {
        method: 'patch',
      });
      const index = invites.value.findIndex((el) => el.id === res.invite.id);
      invites.value[index] = res.invite;
      toast.add({
        title: 'Приглашение успешно отклонено',
        color: 'success',
      });
    } catch (error) {
      handleError(error)
    }
  };

  return {
    invites,
    invite,
    getMyInvites,
    acceptInvite,
    declineInvite,
  };
};
