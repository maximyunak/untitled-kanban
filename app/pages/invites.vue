<script setup lang="ts"> 

const {
  getMyInvites,
  invites
} = useInvite()

await getMyInvites()
</script>

<template>
  <div>
    <h2>My Invites</h2>
    <div class="flex flex-co gap-4 mt-4">
        <div v-if="invites.length !==0" v-for="invite in invites" class="w-87 rounded-lg bg-elevated/50 p-4 hover:bg-elevated transition max-w-87 flex justify-between">
          <div>{{ invite.board.name }}</div>
          <div class="flex gap-2">
            <UButton color="success" variant="subtle"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2048 2048"><path fill="#05a000" d="m1902 196l121 120L683 1657L25 999l121-121l537 537z"/></svg></UButton>
            <UButton color="error" variant="subtle"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#FF6467" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg></UButton>
          </div>
        </div>
        <div v-else>
          Инвайтов пока нет
        </div>
    </div>
  </div>
</template>