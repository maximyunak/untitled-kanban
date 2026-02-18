<script setup lang='ts'>
import type { IUser } from '~/types/user';


const user = ref<IUser>();
const route = useRoute()

const { $api } = useNuxtApp();
const fetchData = async (id: string) => {
  const res = await $api<IUser>(`/users/${id}`);
  console.log(res);

  user.value = res;
};

await fetchData(route.params.id as string)

const boardStore = useBoardStore()
await boardStore.getData()
const boards = computed(() => {
  const boards = boardStore.boards.map((el) => {
    return {
      id: el.id,
      label: el.name
    }
  })
  return boards
})

</script>

<template>
  <div>
    <h2>{{ user?.id }}. {{ user?.firstName }} {{ user?.lastName }} {{ user?.patronymic }}</h2>
    <UModal title="Приглашение">
      <UButton>Пригласить</UButton>

      <template #body>
        <USelectMenu placeholder="Выберите доску в которую приглашаете" :items="boards" class="w-4/7" />
      </template>
      <template #footer>
        <!--        <UButton color="error" @click="deleteColumn" label="Delete" variant="outline"/>-->
        <UButton label="Submit" color="neutral"/>
      </template>
    </UModal>
  </div>  
</template>