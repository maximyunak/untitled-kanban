<script setup lang="ts">

import type {IColumn, ITask} from "~/types/kanban";
import type {DropdownMenuItem} from '@nuxt/ui'

// все данные тестовые
const tasks: ITask[] = [
  {
    id: "1",
    name: "Подготовить презентацию",
    description: "Сделать слайды для встречи с клиентом",
    is_completed: false,
    deadline: "2025-11-10T12:00:00Z",
    status_id: 'asd',
    position_id: 1,
    user_id: 101
  },
  {
    id: "2",
    name: "Обновить документацию",
    description: "Добавить новый раздел про API",
    is_completed: true,
    deadline: "2025-11-05T18:00:00Z",
    status_id: 'asd',
    position_id: 1,
    user_id: 102
  },
  {
    id: "3",
    name: "Тестирование новой функции",
    description: "Проверить работу формы регистрации",
    is_completed: false,
    deadline: "2025-11-12T15:00:00Z",
    status_id: 'fds',
    position_id: 2,
    user_id: 103
  },
  {
    id: "4",
    name: "Сверстать лендинг",
    description: "Верстка главной страницы сайта",
    is_completed: false,
    deadline: "2025-11-15T20:00:00Z",
    status_id: 'fds',
    position_id: 1
  },
  {
    id: "5",
    name: "Провести митинг с командой ыва ыв ыва ыв аыввывааыв ыва вывыавыаавывыаыва выы ыава",
    description: "Обсудить прогресс и блокеры",
    is_completed: false,
    deadline: "2025-11-08T10:00:00Z",
    status_id: 'asfwq',
    position_id: 2,
    user_id: 104
  }
];

const columns: IColumn[] = [
  {
    id: 'asd',
    name: 'ToDo',
    order: 0
  },
  {
    id: 'fds',
    name: 'in Proccess',
    order: 0
  }, {
    id: 'asfwq',
    name: 'Completed ывавыаыавыавыавыы ываыв авы авыыва   ',
    order: 0
  },
]

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
</script>

<template>
  <div class="flex gap-7 items-start">
    <div class="p-4 rounded-lg bg-elevated/50 ring ring-default max-w-[300px] w-full items-start"
         v-for="column in columns">
      <div class="flex justify-between items-center">
        <h4>{{ column.name }}</h4>
        <!-- настройка столбца -->
        <UDropdownMenu :items="items">
          <UButton variant="ghost" icon="cil:options"/>
        </UDropdownMenu>
      </div>
      <div class="flex flex-col gap-y-2 mt-3">
        <div :key="task.id"
             class="px-3 py-3 text-sm bg-default rounded-lg ring ring-default flex gap-2 relative"
             v-for="task in tasks.filter((el: ITask) => el.status_id === column.id)"
            @mouseenter="hoveredId= task.id"
             @mouseleave="hoveredId= ''"
        >
          <UCheckbox/>
          <p>
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
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>