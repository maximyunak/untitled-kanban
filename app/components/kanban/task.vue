<script setup lang="ts">
import type {ITask} from "~/types/kanban";
import {CalendarDate} from "@internationalized/date";

const toast = useToast();

const store = useKanbanStore()


const {task} = defineProps<{ task: ITask }>();
const isHover = ref(false)


const deadlineValue = shallowRef<CalendarDate | null>(
    task.deadline
        ? new CalendarDate(
            new Date(task.deadline).getFullYear(),
            new Date(task.deadline).getMonth(),
            new Date(task.deadline).getDay()
        )
        : null
)

const inputDate = useTemplateRef('inputDate')
const openModal = ref(false)
const updateTaskData = reactive<Partial<ITask>>({
  name: task.name,
  description: task.description,
  isCompleted: task.isCompleted,
  assigneeId: task.assigneeId,
})


const handleUpdateTask = () => {
  const data = {} as Partial<ITask>
  if (deadlineValue.value !== null) data.deadline = new Date(deadlineValue.value.year, deadlineValue.value.month, deadlineValue.value.day)
  if (updateTaskData.description) data.description = updateTaskData.description
  if (updateTaskData.assigneeId) data.assigneeId = updateTaskData.assigneeId
  if (updateTaskData.name) data.name = updateTaskData.name;
  if (updateTaskData.isCompleted) data.isCompleted = updateTaskData.isCompleted

  store.updateTask(task.id, data)
  openModal.value = false
}

const usersMenu = computed(() => {
  const users =  store.board.users.map(el => {
    return {
      id: el.id,
      label: el.firstName + " " + el.lastName,
      onSelect: () => {
        updateTaskData.assigneeId = el.id
      }
    }
  }) 
  return users
})

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

    <UButton :class="['absolute right-3 top-2 opacity-0 invisible transition-opacity', {
              'opacity-100 visible' : isHover
            }]" variant="subtle" size="sm" icon="cil:options" @click="openModal=true"/>

    <UModal :title="task.name" v-model:open="openModal">
      <template #body>
        <UForm>

          <UFormField label="Новое название таски" size="xl">
            <UInput class="mb-2 w-4/7" v-model="updateTaskData.name" placeholder="New Task Name" />
          </UFormField>

          <UFormField label="Новое описание таски" size="xl">
            <UInput class="mb-2 w-4/7" v-model="updateTaskData.description" placeholder="New Task Description" />
          </UFormField>

          <UFormField label="assignee" size="xl">
            <USelectMenu :default-value="usersMenu.find(el => task.assigneeId === el.id)" :items="usersMenu" placeholder="Выберите чтобы назначить задачу" class="w-4/7" /> 
          </UFormField>


          <UFormField label="Deadline" size="xl">
            <UInputDate class="mb-2 w-4/7" ref="inputDate" v-model="deadlineValue">
              <template #trailing>
                <UPopover :reference="inputDate?.inputsRef[3]?.$el">
                  <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      icon="i-lucide-calendar"
                      aria-label="Select a date"
                      class="px-0"
                  />

                  <template #content>
                    <UCalendar v-model="deadlineValue" class="p-2"/>
                  </template>
                </UPopover>
              </template>
            </UInputDate>
          </UFormField>


        </UForm>
      </template>

      <template #footer>
        <!--        <UButton color="error" @click="deleteColumn" label="Delete" variant="outline"/>-->
        <UButton label="Submit" @click="handleUpdateTask" color="neutral"/>
      </template>
    </UModal>
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
