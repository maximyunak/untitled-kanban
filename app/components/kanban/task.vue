<script setup lang="ts">
import type {ITask} from "~/types/kanban";
import type {DropdownMenuItem} from "@nuxt/ui";

const toast = useToast();

const {task} = defineProps<{ task: ITask }>();

const {moveTask} = useKanbanStore()

const isHover = ref(false)
const items: DropdownMenuItem[][] = [
  [
    {
      label: 'View',
      icon: 'i-lucide-eye'
    },
    {
      label: 'Copy',
      icon: 'i-lucide-copy'
    },
    {
      label: 'Edit',
      icon: 'i-lucide-pencil'
    }
  ],
  [
    {
      label: 'Delete',
      color: 'error',
      icon: 'i-lucide-trash'
    }
  ]
]

</script>

<template>
  <div
      class="px-3 py-3 text-sm bg-default rounded-lg ring ring-default flex gap-2 relative"
      @mouseenter="isHover= true"
      @mouseleave="isHover= false"
  >
    <UCheckbox/>
    <p class="overflow-hidden wrap-break-word">
      {{ task.name }}
    </p>

    <!-- настройка таски -->
    <UDropdownMenu :content="{
              align: 'start',
              side: 'right',
            }" :class="['absolute right-3 top-2 opacity-0 invisible transition-opacity', {
              'opacity-100 visible' : isHover
            }]" :items="items">
      <UButton variant="subtle" size="sm" icon="cil:options"/>
    </UDropdownMenu>
  </div>
</template>

<style scoped>
.hovered {
  opacity: 0.5;
}

.active {
  filter: brightness(90%);
}
</style>