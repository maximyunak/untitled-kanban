<template>
  <UApp>
    <UButton @click="toggleColorTheme">
      change theme
    </UButton>
  </UApp>
</template>

<script setup>
const colorMode = useColorMode()

function toggleColorTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>