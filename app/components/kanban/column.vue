<script setup lang="ts">
import type {IColumn} from "~/types/kanban";
import draggable from "vuedraggable";

const {column} = defineProps<{ column: IColumn }>();

const store = useKanbanStore()

const newColumnName = ref('')
const openModal = ref(false)

const deleteColumn = () => {
  store.deleteColumn(column.id)
  openModal.value = false
}

const updateColumn = () => {
  if (column.name !== newColumnName.value) {
    const data = {
      id: column.id,
      name: newColumnName.value,
    }
    store.updateColumn(data)
  }
  newColumnName.value = ''
  openModal.value = false
}

const change = (event: any, columnId: number) => {
  if (event.moved) {
    store.moveTask(event.moved.element.id, event.moved.newIndex);
  }
  if (event.added) {
    console.log(event.added.element.id, event.added.newIndex, columnId);
  }  
}
</script>

<template>
  <div class="p-4 rounded-lg bg-elevated/50 ring ring-default min-w-75 max-w-75 items-start">
    <div class="flex justify-between items-center">
      <h4>{{ column.name }}</h4>
      <!-- настройка столбца -->
      <UButton variant="ghost" icon="cil:options" @click="openModal=true"/>
    </div>
    <div class="flex flex-col gap-2">

      <!-- начало тасок -->
      <draggable :list="column.tasks"
                 item-key="id"
                 class="flex flex-col gap-y-2 mt-3"
                 ghost-class="opacity-70"
                 :group="{name: 'tasks'}"
                 animation="150"
                 @change="change($event, column.id)">
        <template #item="{ element }">
          <KanbanTask :task="element"
          />
        </template>

      </draggable>
      <!-- конец тасок -->

      <!-- создание таски в этой колонке -->
      <KanbanCreateTask :columnId="column.id"/>

      <UModal v-model:open="openModal">
        <template #title>
          {{ column.name }}
        </template>

        <template #body>
          <UForm>

            <UFormField label="Новое название колонки" size="xl">
              <UInput v-model="newColumnName" placeholder="New Column Name"/>
            </UFormField>

          </UForm>
        </template>

        <template #footer>
          <UButton color="error" @click="deleteColumn" label="Delete" variant="outline"/>
          <UButton label="Submit" @click="updateColumn" color="neutral"/>
        </template>
      </UModal>
    </div>

  </div>
</template>

<style scoped>

</style>