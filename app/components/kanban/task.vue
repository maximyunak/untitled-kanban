<script setup lang="ts">
import type { ITask } from "~/types/kanban";
import { CalendarDate } from "@internationalized/date";

const store = useKanbanStore()
const { task } = defineProps<{ task: ITask }>();
const isHover = ref(false)

const deadlineValue = shallowRef<CalendarDate | null>(
    task.deadline
        ? new CalendarDate(
            new Date(task.deadline).getFullYear(),
            new Date(task.deadline).getMonth() + 1,
            new Date(task.deadline).getDate()
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

  if (deadlineValue.value !== null)
    data.deadline = new Date(
        deadlineValue.value.year,
        deadlineValue.value.month - 1,
        deadlineValue.value.day
    )

  if (updateTaskData.description)
    data.description = updateTaskData.description

  if (updateTaskData.assigneeId)
    data.assigneeId = updateTaskData.assigneeId

  if (updateTaskData.name)
    data.name = updateTaskData.name

  if (updateTaskData.isCompleted !== undefined)
    data.isCompleted = updateTaskData.isCompleted

  store.updateTask(task.id, data)
  openModal.value = false
}

const usersMenu = computed(() => {
  return store.board.users.map(el => ({
    id: el.id,
    label: el.firstName + " " + el.lastName,
    onSelect: () => {
      updateTaskData.assigneeId = el.id
    }
  }))
})

const handleCheckboxChange = (checked: boolean | "indeterminate") => {
  if (typeof checked === "boolean") {
    store.updateTask(task.id, {
      isCompleted: checked
    })
  }
}

</script>

<template>
  <div
      class="px-3 py-3 text-sm bg-default rounded-lg ring ring-default flex gap-2 relative"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
  >
    <UCheckbox v-model="task.isCompleted" @update:model-value="handleCheckboxChange" />
    <p class="overflow-hidden wrap-break-word">
      {{ task.name }}
    </p>

    <UButton
        :class="[
        'absolute right-3 top-2 opacity-0 invisible transition-opacity',
        { 'opacity-100 visible': isHover }
      ]"
        variant="subtle"
        size="sm"
        icon="cil:options"
        @click="openModal = true"
    />

    <UModal :title="task.name" v-model:open="openModal">
      <template #body>
        <UForm>
          <UFormField
              :label="$t('board.task.newName')"
              size="xl"
          >
            <UInput
                class="mb-2 w-4/7"
                v-model="updateTaskData.name"
                :placeholder="$t('board.task.newName')"
            />
          </UFormField>

          <UFormField
              :label="$t('board.task.newDescription')"
              size="xl"
          >
            <UInput
                class="mb-2 w-4/7"
                v-model="updateTaskData.description"
                :placeholder="$t('board.task.newDescription')"
            />
          </UFormField>

          <UFormField
              :label="$t('board.task.assignee')"
              size="xl"
          >
            <USelectMenu
                :default-value="usersMenu.find(el => task.assigneeId === el.id)"
                :items="usersMenu"
                :placeholder="$t('board.task.selectAssignee')"
                class="w-4/7"
            />
          </UFormField>

          <UFormField
              :label="$t('board.task.deadline')"
              size="xl"
          >
            <UInputDate
                class="mb-2 w-4/7"
                ref="inputDate"
                v-model="deadlineValue"
            >
              <template #trailing>
                <UPopover :reference="inputDate?.inputsRef[3]?.$el">
                  <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      icon="i-lucide-calendar"
                      :aria-label="$t('board.task.selectDate')"
                      class="px-0"
                  />

                  <template #content>
                    <UCalendar
                        v-model="deadlineValue"
                        class="p-2"
                    />
                  </template>
                </UPopover>
              </template>
            </UInputDate>
          </UFormField>
        </UForm>
      </template>

      <template #footer>
        <UButton
            :label="$t('board.task.submit')"
            @click="handleUpdateTask"
            color="neutral"
        />
      </template>
    </UModal>
  </div>
</template>