import type {SelectMenuItem} from "@nuxt/ui";

export const SORT_OPTIONS = [
    {
        label: 'Дате создания',
        value: 'created_asc',
        icon: "material-symbols:keyboard-arrow-up"
    },
    {
        label: 'Дате создания',
        value: 'created_desc',
        icon: "material-symbols:keyboard-arrow-down"
    },
    {
        label: 'Дедлайну',
        value: 'deadline_asc',
        icon: "material-symbols:keyboard-arrow-up"
    },
    {
        label: 'Дедлайну',
        value: 'deadline_desc',
        icon: "material-symbols:keyboard-arrow-down"
    }
] as const satisfies SelectMenuItem[]