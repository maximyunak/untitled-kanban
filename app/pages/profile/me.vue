<script setup lang="ts">

const {
  data,
  fetchData
} = useProfile()

await fetchData()

</script>

<template>
  <div>
    <!-- <pre>{{ data }}</pre>  -->
    <h2>My Profile</h2>
    <div>
      <h3 class="mt-2">{{ data?.id }}. {{ data?.firstName }} {{ data?.lastName }} {{ data?.patronymic }}</h3>

      <section class="mt-10">
        <h2>Your Boards</h2>

        <div v-if="data?.boards.length" class="flex flex-wrap max-w-[80vw] gap-2 mt-2">
        <NuxtLink :to="`/boards/${board.id}`" v-for="board in data?.boards" class="p-4 w-87 bg-elevated/50 rounded-lg hover:bg-elevated transition flex justify-between items-center">
          <span class="truncate max-w-3/4">{{ board?.name }}</span>
          <div class="flex gap-2">
            <UButton variant="subtle" icon="material-symbols:edit-outline" />
            <UButton variant="subtle" icon="material-symbols:delete" />
          </div>
        </NuxtLink>
      </div>
      <div v-else>
        Вы не состоите не в 1 доске
      </div>
      </section>

      <!-- назначенные задачи -->
      <section class="mt-10" v-if="data?.assigneeTasks.length">
        <h2>Your assignee tasks</h2>

      <div class="flex flex-wrap max-w-[80vw] gap-3 mt-2">
        <NuxtLink :to="$localePath(`/boards/${task.id}`)" v-for="task in data?.assigneeTasks" class="p-4 w-87 bg-elevated/50 rounded-lg hover:bg-elevated transition flex justify-between -center flex-col">
          <span class="truncate max-w-3/4">{{ task.name }}</span>
          <span>deadline: {{ task.deadline ?? 'Не назначен'}}</span>
        </NuxtLink> 
      </div>
      </section>

    </div>
  </div>
</template>

