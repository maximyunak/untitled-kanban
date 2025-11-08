<script setup lang="ts">

import type {IColumn, ITask} from "~/types/kanban";

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
    name: "Провести митинг с командой",
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
    name: 'Completed',
    order: 0
  },
]
</script>

<template>
  <div class="flex justify-between">
    <div v-for="column in columns">
        <h2>{{column.name}}</h2>
        <p v-for="task in tasks.filter((el: ITask) => el.status_id === column.id)">
          {{task.name}}
        </p>
    </div>
  </div>
</template>

<style scoped>

</style>