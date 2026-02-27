<script setup lang="ts">
const {columnId} = defineProps<{columnId: number}>()
const store = useKanbanStore()

const isActive = ref(false)
const newTaskName = ref('')

// создание таски
const createTask = () => {
  if (newTaskName.value.trim() !== '') {
    store.createTask(columnId, {
      name: newTaskName.value,
    })
  }
  newTaskName.value = ''
  isActive.value = false
}
</script>

<template>
  <UInput autofocus v-model="newTaskName" @keydown.enter="createTask" @blur="createTask"
          v-if="isActive" variant="outline" autoresize :placeholder="$t('board.task.newName')"/>
  <UButton @click="isActive=true" variant="ghost" icon="material-symbols:add-rounded">{{$t('board.task.create')}}</UButton>
</template>

<style scoped>

</style>