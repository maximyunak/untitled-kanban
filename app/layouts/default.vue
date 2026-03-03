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
<!--     <div class="flex gap-15">-->
       <main class='z-20 max-h-screen md:overflow-y-h w-full max-md:mt-5'>
         <div class="px-5 md:px-12 mt-10 w-auto overflow-x-auto min-w-auto">
           <div class="flex gap-2 items-center relative">
             <!--            <UButton @click="toggleSidebar" variant="subtle" icon="mynaui:sidebar" />-->
             <!--            <UBreadcrumb :items="items" />-->
           </div>
           <div class="mt-5 mb-20">
             <slot/>
           </div>
         </div>
       </main>
<!--     </div>-->
    </UApp>
  </div>

</template>

<style scoped>

</style>
