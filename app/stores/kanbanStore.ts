import type {BoardDataType, IColumn, ITask} from "~/types/kanban";

export const useKanbanStore = defineStore('kanbanStore', () => {
    const data = ref<BoardDataType>()
    const {$api, $io} = useNuxtApp()

    const board = computed<BoardDataType>(() => {
            if (!data.value) throw new Error('Value is null')
            return data.value
        }
    )


    const getData = async (id: number) => {
        const res = await $api<{
            board: BoardDataType
        }>(`/boards/${id}`)

        data.value = res.board
    }

    // создание колонки
    const createColumn = async (name: string) => {
        const res = await $api<{
            column: IColumn
        }>(`/boards/${board.value.id}/columns`, {
            body: {name},
            method: "POST"
        })

        board.value.columns.push(res.column)
    }

    // удаление колонки
    const deleteColumn = async (id: number) => {
        await $api<{ column: IColumn }>(`/boards/${board.value.id}/columns/${id}`, {
            method: "DELETE"
        })
    }

    // редактирование колонки
    const updateColumn = async (body: Partial<IColumn>) => {
        const res = await $api<{ column: IColumn }>(`/boards/${board.value.id}/columns/${body.id}`, {
            method: "PATCH",
            body,
        })
        const column = board.value.columns.find(column => column.id === body.id);
        if (!column) return
        column.name = res.column.name
    }

    // mode column
    const moveColumn = async (id: number, toPosition: number) => {

        const res = await $api(`/boards/${board.value.id}/columns/${id}/move`, {
            method: "PATCH",
            body: {
                toPosition,
            }
        })
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

    $io?.on('column:move', (res: IColumn[]) => {
        board.value.columns = res
    })

    $io?.on('column:delete', (res: IColumn) => {
        const index = board.value.columns.findIndex(column => column.id === res.id)

        if (index !== -1) board.value.columns.splice(index, 1)
    })


    return {
        board,
        getData,
        socketConnect,
        createColumn,
        deleteColumn,
        updateColumn,
        moveColumn
    };
})