<script setup lang="ts">
const {columns} = useKanbanStore()
</script>

<template>
  <div class="flex gap-7 items-start w-auto">

    <!-- начало колонок -->
    <TransitionGroup name="list" mode="out-in">
      <KanbanColumn v-for="column in columns" :key="column.id" :column="column"/>
    </TransitionGroup>
    <!-- конец колонок -->

    <!--  создание колонки  -->
    <KanbanCreateColumn/>

  </div>
</template>

<style>
.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  scale:0.5
}

.list-leave-active {
  opacity: 0;
  position: absolute;
  max-width: 300px;
  transform: translateY(-100%);
}
</style>