import type {ITaskWithBoardId} from "~/types/kanban";
import {SORT_OPTIONS} from "~/shared/sort-options";

export const useTasks = () => {
    const data = ref<ITaskWithBoardId[]>([])
    const {$api} = useNuxtApp()
    const sortData = reactive<{
        completed: typeof SORT_OPTIONS[number],
        unCompleted: typeof SORT_OPTIONS[number]
    }>({
        completed: SORT_OPTIONS[0],
        unCompleted: SORT_OPTIONS[0],
    })

    const comparator = (a: ITaskWithBoardId, b: ITaskWithBoardId, on: 'deadline' | 'createdAt', direction: "asc" | "desc"): number => {
        const timeA = a[on] ? new Date(a[on]).getTime() : 0;
        const timeB = b[on] ? new Date(b[on]).getTime() : 0;

        return direction === "asc" ?
            timeA - timeB
            : timeB - timeA
    }

    const completedTasks = computed<ITaskWithBoardId[]>(() => {
        const tasks = data.value.filter((task: ITaskWithBoardId) => task.isCompleted)

        switch (sortData.completed.value) {
            case "deadline_asc":
                return tasks.sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "deadline", "asc"))
            case "deadline_desc":
                return tasks.sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "deadline", "desc"))
            case "created_asc":
                return tasks.sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "createdAt", 'asc'))
            case "created_desc":
                return tasks.sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "createdAt", 'desc'))
            default:
                return tasks
        }
    })

    const unCompletedTasks = computed<ITaskWithBoardId[]>(() => {
        const tasks =  data.value.filter((task: ITaskWithBoardId) => !task.isCompleted)

        switch (sortData.unCompleted.value) {
            case "deadline_asc":
                return tasks.sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "deadline", "asc"))
            case "deadline_desc":
                return tasks.sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "deadline", "desc"))
            case "created_asc":
                return tasks.sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "createdAt", 'asc'))
            case "created_desc":
                return tasks.sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "createdAt", 'desc'))
            default:
                return tasks
        }
    })


    const fetchData = async () => {
        const res = await $api<{
            tasks: ITaskWithBoardId[]
        }>('/tasks/my')
        data.value = res.tasks
    }

    return {
        data,
        fetchData,
        completedTasks,
        unCompletedTasks,
        sortData
    }
}