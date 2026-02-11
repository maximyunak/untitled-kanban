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

  <div class='flex'>
    <UApp>
      <Sidebar/>
      <main class='max-h-screen overflow-y-hidden w-full'>
        <div class="px-12 mt-10 h-full w-auto overflow-x-auto min-w-max">
          <div class="flex gap-2 items-center relative">
<!--            <UButton @click="toggleSidebar" variant="subtle" icon="mynaui:sidebar" />-->
<!--            <UBreadcrumb :items="items" />-->
          </div>
          <div class="mt-5 ">
            <slot/>
          </div>
        </div>
      </main>
    </UApp>
  </div>

</template>

<style scoped>

</style>
