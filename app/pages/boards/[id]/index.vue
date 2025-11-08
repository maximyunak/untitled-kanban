<script setup lang="ts">

import type {ITask} from "~/types/kanban";
import type {DropdownMenuItem} from '@nuxt/ui'

// все данные
const {tasks,columns, addTask, addColumn} = useKanbanStore()

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
const hoveredId = ref('')

// создание таски
const createTask = (status_id: string) => {
  const position_id = tasks.filter(task => task.status_id === status_id).reduce((a, b) => Math.max(a, b.position_id), -Infinity) + 1
  if (activeNewName.value !== '') {
    addTask({
      id: "1",
      name: activeNewName.value,
      description: "",
      is_completed: false,
      status_id: status_id,
      position_id,
      user_id: 101
    })
  }
  activeInput.value = ''
  activeNewName.value = ''
}

const activeInput = ref('')
const activeNewName = ref('')

// создание колонки
const createColumn = () => {
  if (activeColumnName.value !== '') {
    const order= columns.reduce((a, b) => Math.max(a, b.order), -Infinity) + 1
    addColumn({
      id: Math.random().toString(36).substr(2, 10),
      name: activeColumnName.value,
      order
    })
  }
  activeColumnName.value = ''
}

const isActiveNewColumn = ref(false)
const activeColumnName = ref('')

// отмена создания
const cancelNewColumn = () => {
  activeColumnName.value = ''
  isActiveNewColumn.value = false
}
</script>

<template>
  <div class="flex gap-7 items-start">

    <!-- начало колонок -->
    <div class="p-4 rounded-lg bg-elevated/50 ring ring-default min-w-[300px] max-w-[300px] items-start"
         v-for="column in columns">
      <div class="flex justify-between items-center">
        <h4>{{ column.name }}</h4>
        <!-- настройка столбца -->
        <UDropdownMenu :items="items">
          <UButton variant="ghost" icon="cil:options"/>
        </UDropdownMenu>
      </div>
      <div class="flex flex-col gap-y-2 mt-3">
        <!-- начало таски -->
        <div :key="task.id"
             class="px-3 py-3 text-sm bg-default rounded-lg ring ring-default flex gap-2 relative"
             v-for="task in tasks.filter((el: ITask) => el.status_id === column.id)"
             @mouseenter="hoveredId= task.id"
             @mouseleave="hoveredId= ''"
        >
          <UCheckbox/>
          <p class="overflow-hidden wrap-break-word">
            {{ task.name }}
          </p>

          <!-- настройка таски -->
          <UDropdownMenu :content="{
              align: 'start',
              side: 'right',
            }" :class="['absolute right-3 top-2 opacity-0 invisible transition-opacity', {
              'opacity-100 visible' : hoveredId === task.id
            }]" :items="items">
            <UButton variant="subtle" size="sm" icon="cil:options"/>
          </UDropdownMenu>
        </div>
        <!-- конец таски -->

        <!-- создание таски в этой колонке -->
        <UInput autofocus v-model="activeNewName" @keydown.enter="createTask(column.id)" @blur="createTask(column.id)"
                v-if="activeInput===column.id" variant="outline" autoresize placeholder="New Task Name"/>
        <UButton @click="activeInput=column.id" variant="ghost" icon="material-symbols:add-rounded"> Add Task</UButton>

      </div>
    </div>
    <!-- конец колонок -->

    <!--  создание колонки  -->
    <div class="flex flex-col gap-2 max-w-50" v-if="isActiveNewColumn">
      <UInput autofocus
              v-model="activeColumnName"
              @keydown.enter="createColumn"
              @blur="isActiveNewColumn=false"
              class="w-full"
              variant="outline"
              autoresize
              placeholder="New Task Name"/>
      <div class="flex gap-2 w-full justify-between">
        <UButton @mousedown="createColumn" variant="subtle" block>Add Column</UButton>
        <UButton @mousedown="cancelNewColumn" variant="ghost">Cancel</UButton>
      </div>
    </div>

    <UButton v-else @click="isActiveNewColumn=true" variant="outline" class="w-50 opacity-70"
             icon="material-symbols:add-rounded">Add Column
    </UButton>

  </div>
</template>

<style scoped>

</style>