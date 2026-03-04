<script setup lang="ts">
import {useBoardStore} from "~/stores/boardStore";

const open = ref(false);

const newBoardData = reactive({
  name: '',
  description: '',
})

const store = useBoardStore()

await useAsyncData('boards', () => store.getData())

const create = () => {
  store.createBoard(newBoardData).finally(() => {
    newBoardData.name = ''
    newBoardData.description = ''
    open.value = false
  })
}

</script>

<template>
  <div>
    <h2>{{ $t("boards.title") }}</h2>

    <div class="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
      <UPageCard
          v-for="board in store.boards"
          :key="board.id"
          :to="$localePath(`/boards/${board.id}`)"
          class="max-w-87.5"
          variant="soft"
      >
        <template #default>
          <span class="truncate max-w-[80%]">{{ board.name }}</span>
          <span v-if="board.description">{{ board.description }}</span>
        </template>
      </UPageCard>
    </div>


    <div

        class="mt-10 flex justify-center w-full"
    >

      <UModal
          v-model:open="open"
          :title="$t('boards.createModalTitle')"
      >
        <UButton
            @click="open = true"
        >
          {{ $t("boards.createButton") }}
        </UButton>

        <template #body>
          <UForm>
            <UFormField
                :label="$t('boards.boardName')"
                required
                size="xl"
            >
              <UInput
                  v-model="newBoardData.name"
                  :placeholder="$t('boards.boardNamePlaceholder')"
              />
            </UFormField>

            <UFormField
                class="mt-2"
                :label="$t('boards.boardDescription')"
                size="xl"
            >
              <UInput
                  v-model="newBoardData.description"
                  :placeholder="$t('boards.boardDescriptionPlaceholder')"
              />
            </UFormField>
          </UForm>
        </template>

        <template #footer="{ close }">
          <UButton
              :label="$t('boards.cancel')"
              color="neutral"
              variant="outline"
              @click="close"
          />
          <UButton
              @click="create"
              :label="$t('boards.submit')"
              color="neutral"
          />
        </template>
      </UModal>
    </div>
  </div>

</template>

<style scoped>
</style>