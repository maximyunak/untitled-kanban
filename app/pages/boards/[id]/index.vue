<script setup lang="ts">
const store = useKanbanStore()
import draggable from "vuedraggable";

const route = useRoute()
const isOpenUserModal = ref(false)

onMounted(() => {
  store.socketConnect(Number(route.params.id))
})

await store.getData(Number(route.params.id))

const change = (event: any) => {
  store.moveColumn(event.moved.element.id, event.moved.newIndex)
}

const {invite} = useInvite()
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
    <UDashboardNavbar class="fixed z-10 bg-default w-[85%] justify-between" >
      <template #left>
        <h2>{{store.board.name}}</h2>
      </template>
      <template #right>
          <div class="flex w-full justify-between">
            <ULink @click="isOpenUserModal=true">
              users:
              <UAvatarGroup max="2">
                <UTooltip v-for="user in store.board.users" :text="`${user.firstName} ${user.lastName}`">
                  <UAvatar :alt="`${user.firstName} ${user.lastName}`"/>
                </UTooltip>
              </UAvatarGroup>
            </ULink>
          </div>
        </template>
    </UDashboardNavbar>

    <div :class="['pt-25 px-10 w-auto flex items-start', {
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
    <!--  модалка с участниками доски  -->
    <UModal v-model:open="isOpenUserModal" title="Участники доски">
      <template #body>
        <!-- Все юзеры -->
        <div class="flex flex-col gap-4">
          <NuxtLink :to="`/profile/${user.id}`"
                    class="p-4 flex items-center justify-between rounded-lg bg-elevated/50 has-focus-visible:ring-2 has-focus-visible:ring-primary transition hover:bg-elevated max-w-full"
                    v-for="user in store.board.users">
            <div>
              <div class="text-lg">{{ user.firstName }} {{ user.lastName }}</div>
              <div class="text-sm text-muted">{{ user.email }}</div>
            </div>

            <div>
              <UTooltip text="Закрыть доступ">
                <UButton variant="subtle" icon="material-symbols:delete"/>
              </UTooltip>
            </div>
          </NuxtLink>
        </div>
        <div class="flex justify-center">

          <!-- Модалка приглашения -->
          <UModal title="Пригласить пользователя">
            <UButton class="mt-4" variant="subtle">Добавить юзера</UButton>

            <template #body>
              <UFormField label="Email">
                <UInput v-model="inviteUserEmail" placeholder="Email"/>
              </UFormField>

            </template>

            <template #footer="{ close }" class="flex items-center">
              <UButton label="Cancel" color="neutral" variant="outline" @click="close"/>
              <UButton @click="handleInvite">Пригласить</UButton>

            </template>

          </UModal>
        </div>
      </template>
    </UModal>
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