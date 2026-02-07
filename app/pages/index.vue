<script setup lang="ts">
</script>

<template>
  <div>
    <h2>{{ $t("welcome") }}</h2>
    <UButton><RouterLink to="/login">Login</RouterLink></UButton>
    <UButton><RouterLink to="/register">register</RouterLink></UButton>
  </div>
</template>

<style scoped></style>
