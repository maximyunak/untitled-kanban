<script setup lang="ts">
</script>

<template>

  <div class='flex gap-3'>
    <UApp>
      <Sidebar/>
      <main class='max-h-screen overflow-y-auto w-full'>
        <div class="mx-15 mt-10">
          <slot/>
        </div>
      </main>
    </UApp>
  </div>

</template>

<style scoped>

</style>