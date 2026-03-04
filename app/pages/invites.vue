<script setup lang="ts">
import { InviteStatus } from '~/types/invites';

const {
  getMyInvites,
  invites,
  acceptInvite,
  declineInvite
} = useInvite()

await useAsyncData('invites', () => getMyInvites())

definePageMeta({
  titleKey: 'page.invites'
})
</script>

<template>
  <div>
    <h2 class="max-lg:hidden">{{ $t('invites.title') }}</h2>
    <div class="grid grid-cols-1 max-[500px]:items-center min-[500px]:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      <template v-if="invites.length !== 0">
        <div
          v-for="invite in invites"
          class=" rounded-lg bg-elevated/50 p-4 hover:bg-elevated transition md:max-w-87 flex justify-between"
        >
          <div>{{ invite.board.name }}</div>
          <div class="flex gap-2" v-if="invite.status === InviteStatus.PENDING">
            <UButton
              @click="acceptInvite(invite.id)"
              color="success"
              variant="subtle"
              icon="streamline:interface-validation-check-check-form-validation-checkmark-success-add-addition"
            />
            <UButton
              @click="declineInvite(invite.id)"
              color="error"
              variant="subtle"
              icon="material-symbols:close"
            />
          </div>
          <div v-else>
            {{ $t(`invites.status.${invite.status.toLowerCase()}`) }}
          </div>
        </div>
      </template>

      <div v-else>
        {{ $t('invites.empty') }}
      </div>
    </div>
  </div>
</template>
