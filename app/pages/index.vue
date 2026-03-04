<script setup lang="ts">
definePageMeta({
  titleKey: "page.home",
})
</script>

<template>
  <div>
    <h2>{{ $t("welcome") }}</h2>
    <UButton><RouterLink :to="$localePath('/login')">Login</RouterLink></UButton>
    <UButton><RouterLink :to="$localePath('/register')">register</RouterLink></UButton>
  </div>
</template>

<style scoped></style>
