<script setup lang="ts">
const {column_id} = defineProps<{column_id: string}>()
const {addTask} = useKanbanStore()

const isActive = ref(false)
const newTaskName = ref('')

// создание таски
const createTask = () => {
  if (newTaskName.value.trim() !== '') {
    addTask({
      name: newTaskName.value,
      description: "",
      is_completed: false,
    }, column_id)
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