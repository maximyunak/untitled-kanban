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
    <!--    {{ store.boards }}-->
    <h2>тут все доски будут</h2>
    <ULink :to="$localePath('/boards/1')">к 1 доске</ULink>

    <div>
      <div v-for="board in store.boards">
        <h4>{{board.name}}</h4>
      </div>
    </div>

    <UModal v-model:open="open" title="Создать новую доску">
      <UButton>Создать новую доску</UButton>
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