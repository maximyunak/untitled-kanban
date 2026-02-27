<script setup lang="ts">
const store = useKanbanStore()

const isActiveNewColumn = ref(false)
const newColumnName = ref('')
const toast = useToast()


// создание колонки
const createColumn = () => {
  if (newColumnName.value !== '') {
    store.createColumn(newColumnName.value)
    newColumnName.value = ''
  } else {
    toast.add({
      title: $t('board.column.error'),
      color: "error"
    })
  }
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
            :placeholder="$t('board.column.newName')"/>
    <div class="flex gap-2 w-full justify-between">
      <UButton @mousedown="createColumn" variant="subtle" block>{{ $t('board.column.create') }}</UButton>
      <UButton @mousedown="cancelNewColumn" variant="ghost">{{ $t('board.column.cancel') }}</UButton>
    </div>
  </div>
  <UButton v-else @click="isActiveNewColumn=true" variant="outline" class="min-w-50 opacity-70"
           icon="material-symbols:add-rounded">{{ $t('board.column.create') }}
  </UButton>
</template>

<style scoped>

</style>