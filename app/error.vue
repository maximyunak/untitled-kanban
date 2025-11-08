<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const localePath = useLocalePath()
</script>

<template>
  <UError
      :redirect="localePath('/')"
      :error="{
      statusCode: error?.statusCode ?? 404,
      statusMessage: 'Page not found',
      message: 'The page you are looking for does not exist.'
    }"
  />
</template>

<style scoped>

</style>