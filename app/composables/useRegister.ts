interface UserData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    patronymic?: string;
}

export const useRegister = () => {
    const toast = useToast()
    const router = useRouter()
    const localePath = useLocalePath()

    const userData = reactive<UserData>({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        patronymic: ''
    })

    // oauth
    const providers = [{
        label: 'Google',
        icon: 'i-simple-icons-google',
        onClick: () => {
            toast.add({
                title: 'Login with Google',
            })
        }
    }, {
        label: 'GitHub',
        icon: 'i-simple-icons-github',
        onClick: () => {
            toast.add({
                title: 'Login with GitHub',
            })
        }
    }]

    // submit
    const register = () => {
        console.log(userData);
        toast.add({
            title: 'Registration successful',
            description: 'You can now log in using your credentials',
            color: 'success',
        })
        setTimeout(() => {router.push(localePath('login'))}, 250)
    }

    return {userData, register, providers}
}