import type {BoardType} from "~/types/board";

export const useBoardStore = defineStore("boardStore", () => {
    const {$api} = useNuxtApp()
    const boards = ref();

    const getData = async () => {

        // const res = useAsyncData(() => {
        //     return $api<{
        //         boards: BoardType[]
        //     }>("/boards/my")
        // })
        // const response = await useFetch("http://localhost:8000/api/boards/my", {
        //     credentials: "include"
        // })

        const apires = await $api("/boards/my")
        console.log(apires)
        // console.log(response.data.value, "usefetch")
        boards.value = apires.boards
        // console.log(res.data.value, "async")
    }

    const createBoard = async (data: any) => {
        const res = await $api('/boards', {
            method: "POST",
            body: data
        });

        console.log(res);
    }

    return {
        getData,
        createBoard,
        boards
    }
})