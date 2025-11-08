<script setup lang="ts">

const items = [
  {
    label: 'Docs',
    to: '/docs'
  },
  {
    label: 'Components',
    to: '/docs/components'
  },
  {
    label: 'Breadcrumb',
    to: '/docs/components/breadcrumb'
  }
]

const {toggleSidebar} = useSidebar();
</script>

<template>

  <div class='flex gap-3'>
    <UApp>
      <Sidebar/>
      <main class='max-h-screen overflow-y-auto w-full'>
        <div class="mx-15 mt-10">
          <div class="flex gap-2 items-center relative">
            <UButton @click="toggleSidebar" variant="subtle" icon="mynaui:sidebar" class="absolute -left-10" />
            <UBreadcrumb :items="items" />
<!--            <h2>Title page</h2>-->
          </div>
          <slot/>
        </div>
      </main>
    </UApp>
  </div>

</template>

<style scoped>

</style>