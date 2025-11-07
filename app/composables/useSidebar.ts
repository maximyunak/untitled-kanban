import type {Locale} from "#i18n-kit/types";

export const useSidebar = () => {
    // раскрытие / закрытие сайдбара
    const collapsed = useState('sidebar', () => false) // false = раскрыт, true = свернут
    const toggleSidebar = () => {
        // collapsed.value = !collapsed.value
        // console.log(collapsed.value)
        collapsed.value = !collapsed.value
    };

    // смена темы
    const colorMode = useColorMode()

    const toggleColorTheme = () => {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }


    // смена языка
    const {locales, setLocale} = useI18n()

    const toggleLocale = async (code: typeof locales.value[number]['code']) => {
        await setLocale(code)
    }

    return {
        collapsed, toggleSidebar,
        colorMode, toggleColorTheme,
        toggleLocale,
    }
}