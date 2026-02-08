import type {BoardType} from "~/types/board";

export const useBoardStore = defineStore("boardStore", () => {
    const {$api} = useNuxtApp()
    const boards = ref<BoardType[]>([]);

    const getData = async () => {
        const res = await $api<{
            boards: BoardType[];
        }>("/boards/my")
        boards.value = res.boards
    }

    const createBoard = async (data: Pick<BoardType, 'name' | 'description'>) => {
        const res = await $api<{
            board: BoardType;
        }>('/boards', {
            method: "POST",
            body: data
        });

        boards.value.push(res.board)
    }

    return {
        getData,
        createBoard,
        boards
    }
})