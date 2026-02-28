<script setup lang="ts">
import {CalendarDate} from "@internationalized/date";

const {
  data,
  fetchData
} = useProfile()

await useAsyncData('user', () => fetchData())

</script>

<template>
  <div>
    <h2>{{ $t('profile.title') }}</h2>
    <div>
      <h3 class="mt-2">{{ data?.id }}. {{ data?.firstName }} {{ data?.lastName }} {{ data?.patronymic }}</h3>

      <section class="mt-10">
        <h2>{{ $t('profile.yourBoards') }}</h2>

        <div v-if="data?.boards.length" class="flex flex-wrap max-w-[80vw] gap-2 mt-2">
          <NuxtLink
              :to="$localePath(`/boards/${board.id}`)"
              v-for="board in data?.boards"
              class="p-4 w-87 bg-elevated/50 rounded-lg hover:bg-elevated transition flex justify-between items-center"
          >
            <span class="truncate max-w-3/4">{{ board?.name }}</span>
            <div class="flex gap-2">
              <UButton variant="subtle" icon="material-symbols:edit-outline" :aria-label="$t('profile.edit')" />
              <UButton variant="subtle" icon="material-symbols:delete" :aria-label="$t('profile.delete')" />
            </div>
          </NuxtLink>
        </div>
        <div v-else>
          {{ $t('profile.noBoards') }}
        </div>
      </section>

      <!-- назначенные задачи -->
      <section class="mt-10" v-if="data?.assigneeTasks.length">
        <h2>{{ $t('profile.yourTasks') }}</h2>

        <div class="flex flex-wrap max-w-[80vw] gap-3 mt-2">
          <NuxtLink
              :to="$localePath(`/boards/${task.boardId}`)"
              v-for="task in data?.assigneeTasks"
              class="p-4 w-87 bg-elevated/50 rounded-lg hover:bg-elevated transition flex justify-between flex-col"
          >
            <span class="truncate max-w-3/4">{{ task.name }}</span>
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
        </div>
      </section>
    </div>
  </div>
</template>