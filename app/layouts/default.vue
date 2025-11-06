<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const {locales, setLocale} = useI18n()

</script>

<template>

  <UApp>
    <UButton @click="toggleColorTheme">
      change theme
    </UButton>
    <div>
      <UButton :key="locale.code" class="mr-3 mt-4" @click="setLocale(locale.code)" v-for="locale in locales">
        {{ locale.code }}
      </UButton>
    </div>
    <main>
      <slot/>
    </main>
  </UApp>

</template>

<style scoped>

</style>