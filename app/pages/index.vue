<script setup lang="ts">
const store = testStore()
</script>

<template>
  <div>
    <h2>{{$t('welcome')}}</h2>
    <h3>{{store.message}}</h3>
  </div>
</template>

<style scoped>

</style>