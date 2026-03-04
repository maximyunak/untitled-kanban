<script setup lang='ts'>
import type {IUser} from '~/types/user';

const user = ref<IUser>();
const route = useRoute()

const { $api } = useNuxtApp();
const fetchData = async (id: string) => {
  user.value = await $api<IUser>(`/users/${id}`);
};

await fetchData(route.params.id as string)

const boardStore = useBoardStore()
await boardStore.getData()
const boards = computed(() => {
  return boardStore.boards.map((el) => {
    return {
      id: el.id,
      label: el.name
    }
  })
})

</script>

<template>
  <div>
    <h2>{{ user?.id }}. {{ user?.firstName }} {{ user?.lastName }} {{ user?.patronymic }}</h2>
  </div>  
</template>