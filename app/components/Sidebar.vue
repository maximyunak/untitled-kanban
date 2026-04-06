<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const {
  data,
  onLogout,
} = useProfile()

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

const {t} = useI18n()

const items = computed<NavigationMenuItem[][]>(() => [[{
  label: t('sidebar.boards'),
  icon: 'majesticons:view-boards-line',
  to: localePath('/'),
}, {
  label: t('sidebar.tasks'),
  icon: 'i-lucide-users',
  to: localePath('tasks'),
}, {
  label: t('sidebar.invites'),
  icon: "mingcute:invite-line",
  to: localePath('invites')
}, {
  label: t('sidebar.settings'),
  icon: 'i-lucide-settings',
  defaultOpen: true,
  children: [{
    label: t('sidebar.profile'),
    icon: 'i-lucide-user',
    to: localePath('/profile/me'),
  }, {
    label: t('sidebar.changeTheme'),
    icon: themeIcon.value,
    onClick: () => toggleColorTheme()
  }, {
    label: t('sidebar.switchLanguage'),
    icon: 'prime:language',
    defaultOpen: true,
    children: locales.value.map((lng) => ({
      label: lng.name,
      onClick: () => toggleLocale(lng.code)
    }))
  }]
}], [{
  label: t('sidebar.help'),
  icon: 'i-lucide-info',
  to: 'https://github.com/maximyunak/untitled-kanban',
  target: '_blank'
}]])

const isMobile = ref(false)

onMounted(() => {
  const update = () => {
    isMobile.value = window.innerWidth <= 1023
  }

  update()
  window.addEventListener('resize', update)
})

const {
  open, toggle
} = useSidebar()

const router = useRouter()
const handleLogout = async () => {
  await onLogout().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <UDashboardSidebar
      v-model:open="open"
      :collapsed="collapsed" collapsible :collapsed-size="3"
      :ui="{ footer: 'border-t border-default' }"
      class="transition-[width] duration-200 max-w-[18%] w-full h-screen">
    <template #header="{ collapsed }">
      <div class="flex items-center gap-3">
        <!--        <UIcon>-->
        <img class="size-8" src="/logo.svg" alt="logo">
        <!--        </UIcon>-->
        <h4 v-if="!collapsed">Облако дел</h4>
      </div>
    </template>

    <template #default>
      <USeparator/>

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
          class="w-3/4"
          :to="$localePath('/profile/me')">
        <UButton
            :avatar="{
          text: data?.firstName[0],
          size: 'sm',
        }"
            :label="data?.firstName"
            color="neutral"
            variant="ghost"
            class="w-full"
            :block="collapsed"
        />
      </NuxtLink>
      <UButton icon="line-md:log-out" variant="ghost" color="error" @click="handleLogout"/>
    </template>

    <template #toggle>
      <UDashboardSidebarToggle @click="toggle"/>
    </template>
  </UDashboardSidebar>

  <!-- мобильная верхняя панель -->
  <div v-if="isMobile && typeof $route.name === 'string' && !$route?.name?.includes('boards-id')"
       class="header-bg shadow-2xl w-full z-100 fixed top-0 left-0 right-0 px-5 py-3 items-center">
    <div class="flex gap-2">
      <UDashboardSidebarToggle @click="toggle"/>
      <h3>{{ $route.meta.titleKey ? $t($route.meta.titleKey as string) : 'Страница' }}</h3>
    </div>
  </div>
</template>

