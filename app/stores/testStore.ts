export const testStore = defineStore('testStore', () => {
    const message = ref("message");

    return {message}
})