<script setup lang="ts">
const store = useKanbanStore()
import draggable from "vuedraggable";

const route = useRoute()

onMounted(() => {
  store.socketConnect(Number(route.params.id))
})

await store.getData(Number(route.params.id))

const change = (event: any) => {
  store.moveColumn(event.moved.element.id, event.moved.newIndex)
}

</script>

<template>
  <div>
    <div>
      <h2>{{ store.board.name }}</h2>
    </div>
    <div :class="['mt-4 w-auto flex items-start', {
      'gap-7': store.board.columns.length ?? 0 > 0,
    }]">


      <!-- начало колонок -->
      <draggable
          @change="change"
          :list="store.board.columns"
          class="flex gap-7 items-start"
          item-key="id"
          ghost-class="opacity-80"
          animation="150">
        <template #item="{element}">
          <KanbanColumn :column="element"/>
        </template>
      </draggable>
      <!-- конец колонок -->

      <!--  создание колонки  -->
      <KanbanCreateColumn/>

    </div>
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