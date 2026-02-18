<script setup lang="ts">
definePageMeta({
  layout: "auth"
});

</script>

<template>
  <UPageCard class="w-full max-w-lg">
    <AuthRegisterForm />
  </UPageCard>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>