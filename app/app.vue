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