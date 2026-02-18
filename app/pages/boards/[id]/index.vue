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

</script>

<template>
  <div>
    <div class="flex justify-between">
      <h2>{{ store.board.name }}</h2>
      <ULink @click="isOpenUserModal=true">
        users:
        <UAvatarGroup max="2">
        <UTooltip   v-for="user in store.board.users" :text="`${user.firstName} ${user.lastName}`">
            <UAvatar :alt="`${user.firstName} ${user.lastName}`" />
          </UTooltip>
      </UAvatarGroup>
      </ULink>
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
    <UModal v-model:open="isOpenUserModal">
      <template #header>
        Users
      </template>
      <template #body>
        <!-- Все юзеры -->
          <div class="flex flex-col gap-4">
            <NuxtLink :to="`/profile/${user.id}`" class="p-4 flex items-center justify-between rounded-lg bg-elevated/50 has-focus-visible:ring-2 has-focus-visible:ring-primary transition hover:bg-elevated max-w-full" v-for="user in store.board.users">
              <div>{{ user.firstName }} {{ user.lastName }}</div>

              <div>
                <UTooltip text="Закрыть доступ">
                  <UButton variant="subtle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f2f2f2" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg></UButton>
                </UTooltip>
              </div>
            </NuxtLink>
          </div>
          <div class="flex justify-center">
            
            <!-- Модалка приглашения -->
            <UModal>
              <UButton class="mt-4" variant="subtle">Добавить юзера</UButton>

              <template #header>
                Пригласить пользователя
              </template>

              <template #body>
                <UFormField label="Email">
                  <UInput v-model="inviteUserEmail" placeholder="Email" />
                </UFormField>

              </template>

              <template #footer="{ close }">
                <UButton label="Cancel" color="neutral" variant="outline" @click="close"/>
                <UButton class="mt-2" @click="handleInvite">Пригласить</UButton>

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