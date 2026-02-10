import type {IColumn, ITask} from "~/types/kanban";

export const useKanbanStore = defineStore('kanbanStore', () => {
    const data = ref()
    const {$api, $io} = useNuxtApp()

    const getData = async (id: number) => {
        const res = await $api<any>(`/boards/${id}`)

        data.value = res.board
    }

    // создание

    const addTask = (task: Partial<ITask>, columnId: string) => {
        if (!task) return
        const column = data.value.columns.find((x: { id: string }) => x.id === columnId);
        // поменять на то что из запроса
        column?.tasks.push(task)
    };
    const addColumn = (column: Partial<IColumn>) => {
        data.value.columns.push({
            ...column,
            tasks: []
        })
        console.log(column)
    }


    // socket io client
    const socketConnect = (boardId: number) => {
        return $io.emit('join', {
            boardId: +boardId
        }, (res: {
            room: string,
            users: number
        }) => console.log(res))
    }

    return {
        data,
        getData,
        addTask,
        addColumn,
        socketConnect,
    };
})