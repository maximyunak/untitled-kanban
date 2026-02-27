<script setup lang="ts">
import type { IColumn } from "~/types/kanban";
import draggable from "vuedraggable";

const { t } = useI18n()
const { column } = defineProps<{ column: IColumn }>();

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
    store.moveTask(event.moved.element.id, columnId, event.moved.newIndex);
  }
  if (event.added) {
    store.moveTaskToColumn(event.added.element.id, columnId, event.added.newIndex);
  }
}
</script>

<template>
  <div class="p-4 rounded-lg bg-elevated/50 ring ring-default min-w-75 max-w-75 items-start">
    <div class="flex justify-between items-center">
      <h4>{{ column.name }}</h4>

      <!-- настройка столбца -->
      <UButton
          variant="ghost"
          icon="cil:options"
          @click="openModal = true"
      />
    </div>

    <div class="flex flex-col gap-2">

      <!-- таски -->
      <draggable
          :list="column.tasks"
          item-key="id"
          class="flex flex-col gap-y-2 mt-3"
          ghost-class="opacity-70"
          :group="{ name: 'tasks' }"
          animation="150"
          @change="change($event, column.id)"
      >
        <template #item="{ element }">
          <KanbanTask :task="element" />
        </template>
      </draggable>

      <!-- создание таски -->
      <KanbanCreateTask :columnId="column.id" />

      <!-- модалка -->
      <UModal
          :title="column.name"
          v-model:open="openModal"
      >
        <template #body>
          <UForm>
            <UFormField
                :label="$t('board.column.newName')"
                size="xl"
            >
              <UInput
                  v-model="newColumnName"
                  :placeholder="$t('board.column.newName')"
              />
            </UFormField>
          </UForm>
        </template>

        <template #footer>
          <UButton
              color="error"
              variant="outline"
              @click="deleteColumn"
              :label="$t('board.column.delete')"
          />
          <UButton
              @click="updateColumn"
              color="neutral"
              :label="$t('board.column.submit')"
          />
        </template>
      </UModal>
    </div>
  </div>
</template>