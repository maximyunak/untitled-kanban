<script setup lang="ts">
import type {IColumn, ITask} from "~/types/kanban";
import type {DropdownMenuItem} from "@nuxt/ui";

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

const onDrop = (event: DragEvent) => {
  const dt = event.dataTransfer;
  if (!dt) return;
  const action = dt.getData("action")

  if (action === "task") {
    const tasks = sortedTasks(column.id)
    const taskId = dt.getData("task_id");

    moveTaskToColumn(taskId, column.id)
  } else if (action === "column") {
    console.log(action)
    const columnId = dt.getData("column_id");
    moveColumn(columnId, column.id)
  }
}

const onDragStart = (event: DragEvent) => {
  const dt = event.dataTransfer;
  if (!dt) return;

  dt.setData("column_id", column.id);
  dt.setData("action", "column")

  dt.dropEffect = "move"
  dt.effectAllowed = 'move'
}

</script>

<template>
  <div @drop="onDrop($event)"
       @dragover.prevent
       @dragend.prevent
       @dragstart="onDragStart($event)"
       draggable="true"
       class="p-4 rounded-lg bg-elevated/50 ring ring-default min-w-[300px] max-w-[300px] items-start">
    <div class="flex justify-between items-center">
      <h4>{{ column.name }}</h4>
      <!-- настройка столбца -->
      <UDropdownMenu :items="items">
        <UButton variant="ghost" icon="cil:options"/>
      </UDropdownMenu>
    </div>
    <div class="flex flex-col gap-y-2 mt-3 max-h-[68vh] overflow-y-auto">

      <!-- начало тасок -->
      <TransitionGroup name="list">
        <KanbanTask :key="task.id"
                    v-for="task in sortedTasks(column.id)"
                    :task="task"
        />
      </TransitionGroup>
      <!-- конец тасок -->

      <!-- создание таски в этой колонке -->
      <KanbanCreateTask :column_id="column.id"/>

    </div>
  </div>
</template>

<style scoped>

</style>