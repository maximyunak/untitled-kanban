<script setup lang="ts">
const {data, sortedColumns} = useKanbanStore()
import draggable from "vuedraggable";


</script>

<template>
  <div class="w-auto flex gap-7 items-start">

    <!-- начало колонок -->
    <TransitionGroup name="list" mode="out-in">
      <!--      <KanbanColumn v-for="column in sortedColumns" :key="column.id" :column="column"/>-->
      <draggable :list="data.columns"
                 class="flex gap-7 items-start w-auto"
                 item-key="id"
                 ghost-class="opacity-80"
                 animation="150">
        <template #item="{element}">
          <KanbanColumn :column="element"/>
        </template>
      </draggable>
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
  scale: 0.5
}

.list-leave-active {
  opacity: 0;
  position: absolute;
  max-width: 300px;
  transform: translateY(-100%);
}
</style>