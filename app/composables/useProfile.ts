import type {IFullUser} from '~/types/user';

export const useProfile = () => {
    const {$api} = useNuxtApp();
    const data = useState<IFullUser>('me');
    const {handleError} = useErrorHandler()

    const fetchData = async () => {
        try {
            const res = await $api<{
                user: IFullUser;
            }>('/users/me');
            data.value = res.user;
            return data.value
        } catch (error) {
            handleError(error);
        }
    };

    const onLogout = async () => {
        try {
            await $api('/auth/logout', {
                method: 'POST',
            });
        } catch (error) {
            handleError(error)
        }
    }

    return {
        data,
        fetchData,
        onLogout,
    };
};
