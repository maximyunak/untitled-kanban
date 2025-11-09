<script setup lang="ts">
const {column_id} = defineProps<{column_id: string}>()
const {tasks, addTask} = useKanbanStore()

const isActive = ref(false)
const newTaskName = ref('')

// создание таски
const createTask = () => {
  const position_id = tasks.filter(task => task.status_id === column_id).reduce((a, b) => Math.max(a, b.position_id), -Infinity) + 1
  if (newTaskName.value.trim() !== '') {
    addTask({
      id: Math.random().toString(36).substr(2, 10),
      name: newTaskName.value,
      description: "",
      is_completed: false,
      status_id: column_id,
      position_id,
      user_id: 101
    })
  }
  newTaskName.value = ''
  isActive.value = false
}
</script>

<template>
  <UInput autofocus v-model="newTaskName" @keydown.enter="createTask" @blur="createTask"
          v-if="isActive" variant="outline" autoresize placeholder="New Task Name"/>
  <UButton @click="isActive=true" variant="ghost" icon="material-symbols:add-rounded">Add Task</UButton>
</template>

<style scoped>

</style>