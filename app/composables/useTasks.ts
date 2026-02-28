import type {ITaskWithBoardId} from "~/types/kanban";

export const useTasks = () => {
    const data = ref<ITaskWithBoardId[]>([])
    const {$api}= useNuxtApp()


    const fetchData = async () => {
        const res=  await $api<{
            tasks: ITaskWithBoardId[]
        }>('/tasks/my')
        data.value=res.tasks
    }

    return {data, fetchData}
}