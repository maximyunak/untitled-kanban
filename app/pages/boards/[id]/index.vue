<script setup lang="ts">
const store = useKanbanStore()
import draggable from "vuedraggable";

const { t } = useI18n()
const route = useRoute()
const isOpenUserModal = ref(false)

onMounted(() => {
  store.socketConnect(Number(route.params.id))
})

await store.getData(Number(route.params.id))

const change = (event: any) => {
  store.moveColumn(event.moved.element.id, event.moved.newIndex)
}

const { invite } = useInvite()
const inviteUserEmail = ref('')

const handleInvite = async () => {
  await invite(inviteUserEmail.value, store.board.id)
}

definePageMeta({
  layout: "board"
})
</script>

<template>
  <div class="w-full min-w-max">
    <!--  title  -->
    <UDashboardNavbar class="fixed z-10 bg-default w-[85%] justify-between">
      <template #left>
        <h2>{{ store.board.name }}</h2>
      </template>

      <template #right>
        <div class="flex w-full justify-between">
          <ULink @click="isOpenUserModal = true">
            {{ $t("board.users") }}:
            <UAvatarGroup max="2">
              <UTooltip
                  v-for="user in store.board.users"
                  :key="user.id"
                  :text="`${user.firstName} ${user.lastName}`"
              >
                <UAvatar :alt="`${user.firstName} ${user.lastName}`" />
              </UTooltip>
            </UAvatarGroup>
          </ULink>
        </div>
      </template>
    </UDashboardNavbar>

    <div
        :class="[
        'pt-25 px-10 w-auto flex items-start',
        { 'gap-7': store.board.columns.length ?? 0 > 0 }
      ]"
    >
      <!-- колонки -->
      <draggable
          @change="change"
          :list="store.board.columns"
          class="flex gap-7 items-start"
          item-key="id"
          ghost-class="opacity-80"
          animation="150"
      >
        <template #item="{ element }">
          <KanbanColumn :column="element" />
        </template>
      </draggable>

      <!-- создание колонки -->
      <KanbanCreateColumn />
    </div>

    <!-- модалка участников -->
    <UModal
        v-model:open="isOpenUserModal"
        :title="$t('board.users')"
    >
      <template #body>
        <div class="flex flex-col gap-4">
          <NuxtLink
              v-for="user in store.board.users"
              :key="user.id"
              :to="`/profile/${user.id}`"
              class="p-4 flex items-center justify-between rounded-lg bg-elevated/50 has-focus-visible:ring-2 has-focus-visible:ring-primary transition hover:bg-elevated max-w-full"
          >
            <div>
              <div class="text-lg">
                {{ user.firstName }} {{ user.lastName }}
              </div>
              <div class="text-sm text-muted">
                {{ user.email }}
              </div>
            </div>

            <div>
              <UTooltip :text="$t('board.removeAccess')">
                <UButton
                    variant="subtle"
                    icon="material-symbols:delete"
                />
              </UTooltip>
            </div>
          </NuxtLink>
        </div>

        <div class="flex justify-center">
          <!-- модалка приглашения -->
          <UModal :title="$t('board.inviteUser')">
            <UButton class="mt-4" variant="subtle">
              {{ $t("board.addUser") }}
            </UButton>

            <template #body>
              <UFormField :label="$t('board.email')">
                <UInput
                    v-model="inviteUserEmail"
                    :placeholder="$t('board.email')"
                />
              </UFormField>
            </template>

            <template #footer="{ close }">
              <UButton
                  :label="$t('board.cancel')"
                  color="neutral"
                  variant="outline"
                  @click="close"
              />
              <UButton @click="handleInvite">
                {{ $t("board.invite") }}
              </UButton>
            </template>
          </UModal>
        </div>
      </template>
    </UModal>
  </div>
</template>