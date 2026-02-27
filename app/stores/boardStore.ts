import type {BoardType} from "~/types/board";

export const useBoardStore = defineStore("boardStore", () => {
    const {$api} = useNuxtApp()
    const boards = ref<BoardType[]>([]);
    const {handleError} = useErrorHandler()

    const getData = async () => {
        const res = await $api<{
            boards: BoardType[];
        }>("/boards/my")
        boards.value = res.boards
    }

    const createBoard = async (data: Pick<BoardType, 'name' | 'description'>) => {
       try {
           const res = await $api<{
               board: BoardType;
           }>('/boards', {
               method: "POST",
               body: data
           });

           boards.value.push(res.board)
       } catch (error) {
           handleError(error)
       }
    }

    return {
        getData,
        createBoard,
        boards
    }
})