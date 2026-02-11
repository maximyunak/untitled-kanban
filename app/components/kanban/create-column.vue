<script setup lang="ts">
const store = useKanbanStore()

const isActiveNewColumn = ref(false)
const newColumnName = ref('')

// создание колонки
const createColumn = () => {
  console.log(newColumnName.value);
  if (newColumnName.value !== '') {
    store.createColumn(newColumnName.value)
  }
  newColumnName.value = ''
}

// отмена создания
const cancelNewColumn = () => {
  newColumnName.value = ''
  isActiveNewColumn.value = false
}
</script>

<template>
  <div class="flex flex-col gap-2 min-w-50" v-if="isActiveNewColumn">
    <UInput autofocus
            v-model="newColumnName"
            @keydown.enter="createColumn"
            @blur="isActiveNewColumn=false"
            class="w-full"
            variant="outline"
            autoresize
            placeholder="New Task Name"/>
    <div class="flex gap-2 w-full justify-between">
      <UButton @mousedown="createColumn" variant="subtle" block>Add Column</UButton>
      <UButton @mousedown="cancelNewColumn" variant="ghost">Cancel</UButton>
    </div>
  </div>
  <UButton v-else @click="isActiveNewColumn=true" variant="outline" class="min-w-50 opacity-70"
           icon="material-symbols:add-rounded">Add Column
  </UButton>
</template>

<style scoped>

</style>