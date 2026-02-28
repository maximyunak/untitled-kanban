<script setup lang="ts">
import type {SelectMenuItem} from '@nuxt/ui'

const {data, fetchData} = useProfile()
await fetchData()

const items = ref([
  {
    label: 'Дате создания',
    value: 'backlog',
    icon: "material-symbols:keyboard-arrow-up"
  },
  {
    label: 'Дате создания',
    value: 'backlog',
    icon: "material-symbols:keyboard-arrow-down"
  },
  {
    label: 'Дедлайну',
    value: 'todo',
    icon: "material-symbols:keyboard-arrow-up"
  },
  {
    label: 'Дедлайну',
    value: 'todo',
    icon: "material-symbols:keyboard-arrow-down"
  }
] satisfies SelectMenuItem[])

const completedValue = ref(items.value[0])
const UnCompletedValue = ref(items.value[0])

</script>

<template>
  <div>
    <h2>Мои задачи</h2>
    <div>
      <div class="flex justify-between gap-3 items-center">
        <h3>Невыполненные</h3>
        <div class="flex gap-3 items-center">
          Сортировать по:
          <USelectMenu v-model="completedValue" :icon="completedValue?.icon" variant="outline" class="w-70" :items="items"/>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-2">
        <transition-group name="list">
          <NuxtLink
              :to="$localePath(`/boards/${task.boardId}`)"
              v-for="task in data?.assigneeTasks.filter((task) => !task.isCompleted)"
              class="p-4 bg-elevated/50 rounded-lg hover:bg-elevated transition flex gap- justify-between flex-col"
          >
            <span class="truncate max-w-3/4">{{ task.name }}</span>
            <UCheckbox v-model="task.isCompleted" @click.prevent
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
    </div>
    <div class="mt-5">
      <div class="flex justify-between gap-3 items-center">
        <h3>Выполненные</h3>
        <div class="flex gap-3 items-center">
          Сортировать по:
          <USelectMenu v-model="UnCompletedValue" :icon="UnCompletedValue?.icon" variant="outline" class="w-70" :items="items"/>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2 mt-2">
        <transition-group name="list">
          <NuxtLink
              :to="$localePath(`/boards/${task.boardId}`)"
              v-for="task in data?.assigneeTasks.filter((task) => task.isCompleted)"
              class="p-4 bg-elevated/50 rounded-lg hover:bg-elevated transition flex gap- justify-between flex-col"
          >
            <span class="truncate max-w-3/4">{{ task.name }}</span>
            <UCheckbox v-model="task.isCompleted" @click.prevent
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
    </div>
  </div>
</template>

<style scoped>

</style>