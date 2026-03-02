<script setup lang="ts">
import {SORT_OPTIONS} from "~/shared/sort-options";
import type {ITaskWithBoardId} from "~/types/kanban";

const {fetchData, completedTasks, unCompletedTasks, sortData} = useTasks()
await fetchData()

const {updateTask} = useKanbanStore()

const handleCheckboxChange = (isCompleted: string | boolean, task :ITaskWithBoardId) => {
  if (typeof isCompleted === "boolean") {
    console.log('ok')
    updateTask(task.id, {
      isCompleted
    }, task.boardId)
  } else {
    console.log('err')
  }
}

</script>

<template>
  <div>
    <h2>Мои задачи</h2>
    <div>
      <div class="flex justify-between gap-3 items-center">
        <h3>Невыполненные</h3>
        <div class="flex gap-3 items-center">
          Сортировать по:
          <USelectMenu v-model="sortData.unCompleted" :icon="sortData.unCompleted?.icon" variant="outline" class="w-70"
                       :items="SORT_OPTIONS"/>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-2" v-if="unCompletedTasks.length">
        <transition-group name="list">
          <NuxtLink
              :key="`assignee-task-${task.id}`"
              :to="$localePath(`/boards/${task.boardId}`)"
              v-for="task in unCompletedTasks"
              class="p-4 bg-elevated/50 rounded-lg hover:bg-elevated transition flex gap- justify-between flex-col"
          >
            <span class="truncate max-w-3/4">{{ task.boardName }} - {{ task.name }}</span>
            <UCheckbox
                @update:model-value="handleCheckboxChange($event, task)"
                v-model="task.isCompleted" @click.prevent
                       :label="`Отметить ${task.isCompleted ? 'невыполненной' : 'выполненной'}`"/>
            <span>{{ $t('profile.deadline') }}:
              <span v-if="task.deadline">
                {{
                  new Date(task?.deadline).toLocaleDateString()
                }}
              </span>
              <span v-else>
                {{ $t('profile.notAssigned') }}
              </span>
            </span>
          </NuxtLink>
        </transition-group>
      </div>
      <div v-else><h4>Таковых пока нет</h4></div>
    </div>
    <div class="mt-5">
      <div class="flex justify-between gap-3 items-center">
        <h3>Выполненные</h3>
        <div class="flex gap-3 items-center">
          Сортировать по:
          <USelectMenu  v-model="sortData.completed" :icon="sortData.completed?.icon" variant="outline" class="w-70"
                       :items="SORT_OPTIONS"/>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2 mt-2" v-if="completedTasks.length">
        <transition-group name="list">
          <NuxtLink
              :key="`assignee-task-${task.id}`"
              :to="$localePath(`/boards/${task.boardId}`)"
              v-for="task in completedTasks"
              class="p-4 bg-elevated/50 rounded-lg hover:bg-elevated transition flex gap- justify-between flex-col"
          >
            <span class="truncate max-w-3/4">{{ task.boardName }} - {{ task.name }}</span>
            <UCheckbox @update:model-value="handleCheckboxChange($event, task)" v-model="task.isCompleted" @click.prevent
                       :label="`Отметить ${task.isCompleted ? 'невыполненной' : 'выполненной'}`"/>
            <span>{{ $t('profile.deadline') }}:
              <span v-if="task.deadline">
                {{
                  new Date(task?.deadline).toLocaleDateString()
                }}
              </span>
              <span v-else>
                {{ $t('profile.notAssigned') }}
              </span>
            </span>
          </NuxtLink>
        </transition-group>
      </div>
      <div v-else><h4>Таковых пока нет</h4></div>
    </div>
  </div>
</template>

<style scoped>

</style>