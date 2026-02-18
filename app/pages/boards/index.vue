<script setup lang="ts">
import {useBoardStore} from "~/stores/boardStore";

const open = ref(false);

const newBoardData = reactive({
  name: '',
  description: '',
})

const store = useBoardStore()

await store.getData()

const create = () => {
  store.createBoard(newBoardData)
  open.value = false
}

</script>

<template>
  <div>
    <h2>Доски</h2>
    <div class="grid grid-cols-4 gap-4 mt-5">
        <UPageCard
            v-for="board in store.boards"
            :to="`/boards/${board.id}`"
            class="max-w-87.5"
            variant="soft"
        >
          <template #default>
            <span class="truncate max-w-80">{{board.name}}</span>
          </template>
        </UPageCard>
    </div>

    <UModal v-model:open="open" title="Создать новую доску">
      <UButton class="mt-10 flex justify-self-center">Создать новую доску</UButton>
      <template #body>

        <UForm>

          <UFormField label="Название доски" required size="xl">
            <UInput v-model="newBoardData.name" placeholder="Название доски"/>
          </UFormField>

          <UFormField class="mt-2" label="Описание доски" size="xl">
            <UInput v-model="newBoardData.description" placeholder="Описание доски"/>
          </UFormField>

        </UForm>


      </template>

      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" variant="outline" @click="close"/>
        <UButton @click="create" label="Submit" color="neutral"/>
      </template>
    </UModal>
  </div>
</template>

<style scoped>

</style>