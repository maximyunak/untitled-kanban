<script setup lang="ts">

import type {BoardType} from "~/types/board";

const {
  data,
  fetchData
} = useProfile()

const {updateBoard, deleteBoard} = useBoardStore()

await useAsyncData('user', () => fetchData())

const openModal = ref<boolean>(false)

const selectedBoardData = ref<BoardType>()
const updateBoardData = reactive<Pick<BoardType, "name" | "description">>({
  name: '',
  description: '',
})

const editBoard = (board: BoardType) => {
  selectedBoardData.value = board
  openModal.value = true
  updateBoardData.name = board.name
  updateBoardData.description = board.description
}


const handleUpdateBoard = () => {
  if (selectedBoardData.value) {
    updateBoard(selectedBoardData.value.id, updateBoardData).finally(() => {
      fetchData()
    })
    openModal.value = false
  }
}

const handleDeleteBoard = () => {
  if (selectedBoardData.value) {
    deleteBoard(selectedBoardData.value.id).finally(() => {
      fetchData()
    })
    openModal.value = false
  }
}

definePageMeta({
  titleKey: 'page.profile'
})
</script>

<template>
  <div>
    <h2>{{ $t('profile.title') }}</h2>
    <div>
      <h3 class="mt-2">{{ data?.id }}. {{ data?.firstName }} {{ data?.lastName }} {{ data?.patronymic }}</h3>
      <p>{{data?.email}}</p>
      <section class="mt-4">
        <h2>{{ $t('profile.yourBoards') }}</h2>

        <div v-if="data?.boards.length" class="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
          <NuxtLink
              :to="$localePath(`/boards/${board.id}`)"
              v-for="board in data?.boards"
              class="p-4 max-w-87 bg-elevated/50 rounded-lg hover:bg-elevated transition flex justify-between items-center"
          >
            <span class="truncate max-w-3/4">{{ board?.name }}</span>
            <div class="flex gap-2">
              <UButton @click.stop.prevent="editBoard(board)" variant="subtle" icon="mi:options-vertical"
                       :aria-label="$t('profile.edit')"/>
            </div>
          </NuxtLink>
        </div>
        <div v-else>
          {{ $t('profile.noBoards') }}
        </div>
      </section>
    </div>

    <UModal
        :title="$t('board.update.label')"
        v-model:open="openModal"
    >
      <template #body>
        <UForm>
          <UFormField
              :label="$t('board.update.newName')"
              size="xl"
          >
            <UInput
                v-model="updateBoardData.name"
                :placeholder="$t('board.update.newName')"
            />
          </UFormField>
          <UFormField
              :label="$t('board.update.newDescription')"
              size="xl"
          >
            <UInput
                v-model="updateBoardData.description"
                :placeholder="$t('board.update.newName')"
            />
          </UFormField>
        </UForm>
      </template>

      <template #footer>
        <UModal :title="$t('Подтверждение удаления')">
          <UButton
              color="error"
              variant="outline"
              :label="$t('board.column.delete')"
          />
          <template #body>
            <h5>Вы действительно хотите удалить доску?</h5>
          </template>

          <template #footer="{close}">
            <div class="flex gap-2 mts-3">
              <UButton
                  color="error"
                  variant="outline"
                  @click="handleDeleteBoard"
                  :label="$t('board.column.delete')"
              />
              <UButton @click="close">Отмена</UButton>
            </div>
            </template>
        </UModal>
        <UButton
            @click="handleUpdateBoard"
            color="neutral"
            :label="$t('board.column.submit')"
        />
      </template>
    </UModal>
  </div>
</template>