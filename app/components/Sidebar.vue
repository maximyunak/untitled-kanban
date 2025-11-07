<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const localePath = useLocalePath()
const {locales, setLocale} = useI18n()

// смена темы
const colorMode = useColorMode()

function toggleColorTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const themeIcon = computed(() => {
  return colorMode.preference === "dark" ? "material-symbols:light-mode-outline" : 'material-symbols-light:dark-mode-outline'
})

const items = computed<NavigationMenuItem[][]>(() => [[{
  label: 'Dashboard',
  icon: 'i-lucide-house',
  active: true
}, {
  label: 'Boards',
  icon: 'i-lucide-inbox',
}, {
  label: 'Tasks',
  icon: 'i-lucide-users',
  to: localePath(''),
}, {
  label: 'Notifications',
  badge: '4',
  icon: 'material-symbols:notifications-outline-rounded'
}, {
  label: 'Settings',
  icon: 'i-lucide-settings',
  defaultOpen: true,
  children: [{
    label: 'Profile',
    icon: 'i-lucide-user',
  },
    {
      label: 'Change color theme',
      icon: themeIcon.value,
      onClick: toggleColorTheme
    }, {
      label: 'Switch language',
      icon: 'prime:language',
      children: locales.value.map((lng) => ({
        label: lng.name,
        onClick: () => setLocale(lng.code)
      }))
    }]
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: localePath('feedback'),
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/maximyunak/untitled-kanban',
  target: '_blank'
}]])

const collapsed = ref(false) // false = раскрыт, true = свернут

const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}

</script>

<template>
  <UDashboardSidebar :collapsed="collapsed" collapsible :collapsed-size="3"
                     :ui="{ footer: 'border-t border-default' }"
                     class="transition-all max-w-[15%] h-screen">
    <template #header="{ collapsed }">
      <div class="flex items-center gap-3">
        <UIcon name="vscode-icons:file-type-nuxt" :class="['size-8 text-primary',
      collapsed ? 'mx-auto' : '']"/>
        <h3 v-if="!collapsed">Untitled</h3>
      </div>
    </template>

    <template #default="{ collapsed }">
      <UButton @click="toggleSidebar">tgl</UButton>

      <UButton
          :label="collapsed ? undefined : 'Search...'"
          icon="i-lucide-search"
          color="neutral"
          variant="outline"
          block
          :square="collapsed"
      >
        <template v-if="!collapsed" #trailing>
          <div class="flex items-center gap-0.5 ms-auto">
            <UKbd value="meta" variant="subtle"/>
            <UKbd value="K" variant="subtle"/>
          </div>
        </template>
      </UButton>

      <!--навигация когда свернуто с тултипом сверху-->
      <div v-if="collapsed" class="flex flex-col gap-2 items-center py-2">
        <UTooltip v-for="item in items[0]" :text="item.label" :content="{
            side: 'right'

          }">
          <!--  variant = soft при актив   class text-highlighted     -->
          <UButton variant="ghost" class="text-muted" :icon="item.icon" @click="item.onClick"/>
        </UTooltip>
      </div>
      <!--развернутая навигация верх-->
      <UNavigationMenu
          :collapsed="collapsed"
          :items="items[0]"
          orientation="vertical"
          v-if="!collapsed"
      />

      <!--навигация когда свернуто с тултипом снизу-->
      <div v-if="collapsed" class="flex flex-col items-center mt-auto">
        <UTooltip v-for="item in items[1]" :text="item.label" :content="{
            side: 'right'
          }">
          <!--  variant = soft при актив   class text-highlighted     -->
          <UButton variant="ghost" class="text-muted" :icon="item.icon" @click="item.onClick"/>
        </UTooltip>
      </div>

      <!--развернутая навигация низ-->
      <UNavigationMenu
          v-if="!collapsed"
          :collapsed="collapsed"
          :items="items[1]"
          orientation="vertical"
          class="mt-auto"
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
          :avatar="{
          text: 'M',
          size: 'sm',
        }"
          :label="collapsed ? undefined : 'Maxim Yunak'"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>

