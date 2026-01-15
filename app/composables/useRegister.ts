import type {IRegisterData, IRegisterResponse} from "~/types/auth";

export const useRegister = () => {
    const router = useRouter()
    const localePath = useLocalePath()

    // submit
    const register = async (userData: IRegisterData): Promise<IRegisterResponse> => {
        try {
            const res: IRegisterResponse = await $api('/register', {
                method: 'post',
                body: userData
            })

            if (!res.errors) {
                setTimeout(async () => {
                    await router.push(localePath('login'))
                }, 250)
            }

            return res
        } catch (err: any) {
            return err.data as IRegisterResponse
        }

    }
    // oath

    return {register}
}