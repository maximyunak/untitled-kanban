import type {BoardDataType, IColumn, ITask} from "~/types/kanban";

export const useKanbanStore = defineStore('kanbanStore', () => {
    const data = ref<BoardDataType>()
    const {$api, $io} = useNuxtApp()

    const getData = async (id: number) => {
        const res = await $api<{
            board: BoardDataType
        }>(`/boards/${id}`)

        data.value = res.board
    }

    // создание

    const createColumn = async (name: string) => {
        if (!data.value) return
        const res = await $api<{
            column: IColumn
        }>(`/boards/${data.value.id}/columns`, {
            body: {name},
            method: "POST"
        })

        data.value.columns.push(res.column)
    }

    const deleteColumn = async (id: number) => {
        if (!data.value) return
        await $api<{ column: IColumn }>(`/boards/${data.value.id}/columns/${id}`, {
            method: "DELETE"
        })

        const index = data.value.columns.findIndex(column => column.id === id)

        data.value.columns.splice(index, 1)
    }

    const updateColumn = async (body: Partial<IColumn>) => {
        if (!data.value) return
        const res = await $api<{ column: IColumn }>(`/boards/${data.value.id}/columns/${body.id}`, {
            method: "PATCH",
            body,
        })
        const column = data.value.columns.find(column => column.id === body.id);
        if (!column) return
        column.name = res.column.name
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
        socketConnect,
        createColumn,
        deleteColumn,
        updateColumn,
    };
})