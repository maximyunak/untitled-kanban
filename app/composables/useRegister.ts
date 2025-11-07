import type {IRegisterData, IRegisterResponse} from "~/types/auth";

export const useRegister = () => {
    const router = useRouter()
    const localePath = useLocalePath()

    // submit
    const register = (userData: IRegisterData): IRegisterResponse => {
        console.log(userData);
        setTimeout(async () => {
            await router.push(localePath('login'))
        }, 250)

        return {}
    }
    // oath

    return {register}
}