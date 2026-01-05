<script setup lang="ts">
import type {IColumn, ITask} from "~/types/kanban";
import type {DropdownMenuItem} from "@nuxt/ui";
import draggable from "vuedraggable";

const {column} = defineProps<{ column: IColumn }>();

const {sortedTasks, moveTaskToColumn, moveColumn} = useKanbanStore()
const items: DropdownMenuItem[][] = [
  [
    {
      label: 'View',
      icon: 'i-lucide-eye'
    },
    {
      label: 'Copy',
      icon: 'i-lucide-copy'
    },
    {
      label: 'Edit',
      icon: 'i-lucide-pencil'
    }
  ],
  [
    {
      label: 'Delete',
      color: 'error',
      icon: 'i-lucide-trash'
    }
  ]
]
</script>

<template>
  <div class="p-4 rounded-lg bg-elevated/50 ring ring-default min-w-[300px] max-w-[300px] items-start">
    <div class="flex justify-between items-center">
      <h4>{{ column.name }}</h4>
      <!-- настройка столбца -->
      <UDropdownMenu :items="items">
        <UButton variant="ghost" icon="cil:options"/>
      </UDropdownMenu>
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
        </template>
        <KanbanTask :task="element"
        />
      </draggable>
      <!-- конец тасок -->

      <!-- создание таски в этой колонке -->
      <KanbanCreateTask :column_id="column.id"/>

    </div>
  </div>
</template>

<style scoped>

</style>