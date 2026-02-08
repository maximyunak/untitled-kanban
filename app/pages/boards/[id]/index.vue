<script setup lang="ts">
const store = useKanbanStore()
import draggable from "vuedraggable";

const route = useRoute()

await store.getData(route.params.id)
</script>

<template>
  <div class="w-auto flex gap-7 items-start">

    <!-- начало колонок -->
      <draggable :list="store.data.columns"
                 class="flex gap-7 items-start"
                 item-key="id"
                 ghost-class="opacity-80"
                 animation="150">
        <template #item="{element}">
          <KanbanColumn :column="element" />
        </template>
      </draggable>
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