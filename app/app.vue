<template>
  <Html :lang="head.htmlAttrs.lang">
  <Body>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  </Body>
  </Html>
</template>

<script setup>
const head = useLocaleHead()

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>