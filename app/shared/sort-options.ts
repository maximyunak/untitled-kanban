import type {SelectMenuItem} from "@nuxt/ui";

export const useSortOptions = () => {
    const {t} = useI18n();

    return  [
        {
            label: t("tasks.sort.createdDate"),
            value: 'created_asc',
            icon: "material-symbols:keyboard-arrow-up"
        },
        {
            label: t("tasks.sort.createdDate"),
            value: 'created_desc',
            icon: "material-symbols:keyboard-arrow-down"
        },
        {
            label: t("tasks.sort.deadline"),
            value: 'deadline_asc',
            icon: "material-symbols:keyboard-arrow-up"
        },
        {
            label: t("tasks.sort.deadline"),
            value: 'deadline_desc',
            icon: "material-symbols:keyboard-arrow-down"
        }
    ] as const satisfies SelectMenuItem[]

}