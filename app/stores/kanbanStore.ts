import type {BoardDataType, IColumn, ITask} from "~/types/kanban";
import column from "~/components/kanban/column.vue";

export const useKanbanStore = defineStore('kanbanStore', () => {
    const data = ref<BoardDataType>()
    const {$api, $io} = useNuxtApp()

    const board = computed<BoardDataType>(() => {
            if (!data.value) throw new Error('Value is null')
            return data.value
        }
    )

    // получение данных о доске
    const getData = async (id: number) => {
        const res = await $api<{
            board: BoardDataType
        }>(`/boards/${id}`)

        data.value = res.board
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

    // /** columns **/

    // создание колонки
    const createColumn = async (name: string) => {
        const res = await $api<{
            column: IColumn
        }>(`/boards/${board.value.id}/columns`, {
            body: {name},
            method: "POST"
        })

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

    // move column
    const moveColumn = async (id: number, toPosition: number) => {

        const res = await $api(`/boards/${board.value.id}/columns/${id}/move`, {
            method: "PATCH",
            body: {
                toPosition,
            }
        })
    }

    // ws move column
    $io?.on('column:move', (res: IColumn[]) => {
        board.value.columns = res
    })
    // ws delete column
    $io?.on('column:delete', (res: IColumn) => {
        const index = board.value.columns.findIndex(column => column.id === res.id)

        if (index !== -1) board.value.columns.splice(index, 1)
    })
    // ws create column
    $io?.on('column:create', (res: IColumn) => {
        board.value.columns.push(res)
    })
    // ws update column
    $io?.on('column:update', (res: IColumn) => {
        const col = board.value.columns.find(col => col.id === res.id);
        if (!col) return
        col.name = res.name
    })

    // /** tasks **/

    // создание таски
    const createTask = async (columnId: number, data: any) => {
        const res = await $api<{
            task: ITask
        }>(`/boards/${board.value.id}/columns/${columnId}/tasks`, {
            method: "POST",
            body: data
        })
    }

    $io?.on('task:create', (res: ITask) => {
        const column = board.value.columns.find(col => col.id === res.columnId);
        if (!column?.tasks) return
        column.tasks.push(res)
    });


    return {
        board,
        getData,
        socketConnect,
        createColumn,
        deleteColumn,
        updateColumn,
        moveColumn,
        createTask,
    };
})