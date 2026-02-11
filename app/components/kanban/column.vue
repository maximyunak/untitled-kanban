<script setup lang="ts">
import type {IColumn} from "~/types/kanban";
import draggable from "vuedraggable";

const {column} = defineProps<{ column: IColumn }>();

const store = useKanbanStore()

const newColumnName = ref(column.name)
const openModel = ref(false)

const deleteColumn = () => {
  store.deleteColumn(column.id)
  openModel.value = false
}

const updateColumn = () => {
  if (column.name !== newColumnName.value) {
    const data = {
      id: column.id,
      name: newColumnName.value,
    }
    store.updateColumn(data)
  }
  openModel.value = false
}
</script>

<template>
  <div class="p-4 rounded-lg bg-elevated/50 ring ring-default min-w-[300px] max-w-[300px] items-start">
    <div class="flex justify-between items-center">
      <h4>{{ column.name }}</h4>
      <!-- настройка столбца -->
      <UButton variant="ghost" icon="cil:options" @click="openModel=true"/>
    </div>
    <div class="flex flex-col gap-2">

      <!-- начало тасок -->
      <draggable :list="column.tasks"
                 item-key="id"
                 class="flex flex-col gap-y-2 mt-3"
                 ghost-class="opacity-70"
                 :group="{name: 'tasks'}"
                 animation="150">
        <template #item="{ element }">
          <KanbanTask :task="element"
          />
        </template>

      </draggable>
      <!-- конец тасок -->

      <!-- создание таски в этой колонке -->
      <KanbanCreateTask :column_id="column.id"/>

      <UModal v-model:open="openModel">
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