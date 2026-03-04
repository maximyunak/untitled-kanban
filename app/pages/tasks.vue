<script setup lang="ts">
import {useSortOptions} from "~/shared/sort-options";
import type {ITaskWithBoardId} from "~/types/kanban";

const {fetchData, completedTasks, unCompletedTasks, sortData} = useTasks()
await fetchData()

const {updateTask} = useKanbanStore()

const handleCheckboxChange = (isCompleted: string | boolean, task :ITaskWithBoardId) => {
  if (typeof isCompleted === "boolean") {
    updateTask(task.id, {
      isCompleted
    }, task.boardId)
  }
}

const sortOptions = useSortOptions()

definePageMeta({
  titleKey: 'page.tasks'
})
</script>

<template>
  <div>
    <h2 class="max-lg:hidden">{{ $t('tasks.title') }}</h2>

    <div>
      <div class="flex justify-between sm:gap-3 sm:items-center max-sm:flex-col">
        <h3>{{ $t('tasks.uncompleted') }}</h3>

          <div class="flex gap-3 items-center max-sm:justify-between">

          <span class="max-[400px]:text-sm">{{ $t('tasks.sortBy') }}</span>
          <USelectMenu
              v-model="sortData.unCompleted"
              :icon="sortData.unCompleted?.icon"
              variant="outline"
              class="w-1/2 sm:w-70"
              :items="sortOptions"
          />
        </div>
      </div>

      <div class="grid min-[500px]:grid-cols-2 lg:grid-cols-3 gap-2 mt-2" v-if="unCompletedTasks.length">
        <transition-group name="list">
          <NuxtLink
              v-for="task in unCompletedTasks"
              :key="`assignee-task-${task.id}`"
              :to="$localePath(`/boards/${task.boardId}`)"
              class="p-4 bg-elevated/50 rounded-lg hover:bg-elevated transition flex justify-between flex-col"
          >
            <span class="truncate max-w-3/4">
              {{ task.boardName }} - {{ task.name }}
            </span>

            <UCheckbox
                v-model="task.isCompleted"
                @update:model-value="handleCheckboxChange($event, task)"
                @click.prevent
                :label="
                task.isCompleted
                  ? $t('tasks.markAsUncompleted')
                  : $t('tasks.markAsCompleted')
              "
            />

            <span>
              {{ $t('tasks.deadline') }}:
              <span v-if="task.deadline">
                {{ new Date(task.deadline).toLocaleDateString() }}
              </span>
              <span v-else>
                {{ $t('tasks.notAssigned') }}
              </span>
            </span>
          </NuxtLink>
        </transition-group>
      </div>

      <div v-else>
        <h4>{{ $t('tasks.empty') }}</h4>
      </div>
    </div>

    <div class="mt-5">
      <div class="flex justify-between sm:gap-3 sm:items-center max-sm:flex-col">
        <h3>{{ $t('tasks.completed') }}</h3>

        <div class="flex gap-3 items-center max-sm:justify-between">
          <span class="max-[400px]:text-sm">{{ $t('tasks.sortBy') }}</span>
          <USelectMenu
              v-model="sortData.completed"
              :icon="sortData.completed?.icon"
              variant="outline"
              class="w-1/2 sm:w-70"
              :items="sortOptions"
          />
        </div>
      </div>

      <div class="grid min-[500px]:grid-cols-2 lg:grid-cols-3 gap-2 mt-2" v-if="completedTasks.length">
        <transition-group name="list">
          <NuxtLink
              v-for="task in completedTasks"
              :key="`assignee-task-${task.id}`"
              :to="$localePath(`/boards/${task.boardId}`)"
              class="p-4 bg-elevated/50 rounded-lg hover:bg-elevated transition flex justify-between flex-col"
          >
            <span class="truncate max-w-3/4">
              {{ task.boardName }} - {{ task.name }}
            </span>

            <UCheckbox
                v-model="task.isCompleted"
                @update:model-value="handleCheckboxChange($event, task)"
                @click.prevent
                :label="
                task.isCompleted
                  ? $t('tasks.markAsUncompleted')
                  : $t('tasks.markAsCompleted')
              "
            />

            <span>
              {{ $t('tasks.deadline') }}:
              <span v-if="task.deadline">
                {{ new Date(task.deadline).toLocaleDateString() }}
              </span>
              <span v-else>
                {{ $t('tasks.notAssigned') }}
              </span>
            </span>
          </NuxtLink>
        </transition-group>
      </div>

      <div v-else>
        <h4>{{ $t('tasks.empty') }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>