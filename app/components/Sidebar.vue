<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const {
  data, fetchData
} = useProfile()


await fetchData()

const localePath = useLocalePath()
const {locales} = useI18n()

const {
  collapsed,
  colorMode, toggleColorTheme,
  toggleLocale,
} = useSidebar()

const themeIcon = computed(() => {
  return colorMode.preference === "dark" ? "material-symbols:light-mode-outline" : 'material-symbols-light:dark-mode-outline'
})

const items = computed<NavigationMenuItem[][]>(() => [[{
  label: 'Dashboard',
  icon: 'i-lucide-house',
  to: localePath('/'),
}, {
  label: 'Boards',
  icon: 'majesticons:view-boards-line',
  to: localePath('boards'),
}, {
  label: 'Tasks',
  icon: 'i-lucide-users',
  to: localePath('tasks'),
},
  {
    label: "Invites",
    icon: "mingcute:invite-fill",
    to: localePath('invites')
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    defaultOpen: true,
    children: [{
      label: 'Profile',
      icon: 'i-lucide-user',
      to: localePath('/profile/me'),
    },
      {
        label: 'Change color theme',
        icon: themeIcon.value,
        onClick: () => toggleColorTheme()
      }, {
        label: 'Switch language',
        icon: 'prime:language',
        defaultOpen: true,
        children: locales.value.map((lng) => ({
          label: lng.name,
          onClick: () => toggleLocale(lng.code)
        }))
      }]
  }], [{
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/maximyunak/untitled-kanban',
  target: '_blank'
}]])

</script>

<template>
  <UDashboardSidebar
      :collapsed="collapsed" collapsible :collapsed-size="3"
      :ui="{ footer: 'border-t border-default' }"
      class="transition-[width] duration-200 max-w-[15%] h-screen">
    <template #header="{ collapsed }">
      <div class="flex items-center gap-3">
        <UIcon name="vscode-icons:file-type-nuxt" :class="['size-8 text-primary',
      collapsed ? 'mx-auto' : '']"/>
        <h3 v-if="!collapsed">Untitled</h3>
      </div>
    </template>

    <template #default>

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
      <NuxtLink
          class="w-full"
          :to="$localePath('/profile/me')">
        <UButton
            :avatar="{
          text: data?.firstName[0],
          size: 'sm',
        }"
            :label="data?.firstName + ' ' + data?.lastName"
            color="neutral"
            variant="ghost"
            class="w-full"
            :block="collapsed"
        />
      </NuxtLink>
    </template>
  </UDashboardSidebar>
</template>

