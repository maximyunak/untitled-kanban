<script setup lang="ts">
import { InviteStatus } from '~/types/invites';

const {
  getMyInvites,
  invites,
  acceptInvite,
  declineInvite
} = useInvite()

await useAsyncData('invites', () => getMyInvites())
</script>

<template>
  <div>
    <h2>{{ $t('invites.title') }}</h2>
    <div class="flex flex-wrap max-w-[80vw] gap-4 mt-4">
      <template v-if="invites.length !== 0">
        <div
          v-for="invite in invites"
          class="w-87 rounded-lg bg-elevated/50 p-4 hover:bg-elevated transition max-w-87 flex justify-between"
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
