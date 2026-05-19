<script setup lang="ts">
import draggable from "vuedraggable";

definePageMeta({
  layout: false
})
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination, Autoplay} from 'swiper/modules';
import {useFaqItems} from "~/shared/faq-items";
import {useCapabilities} from "~/shared/capabilities";
import {useDemoColumns} from "~/shared/demoColumns";
const {t} = useI18n()

const {toggleLocale} = useSidebar()
const {locale, locales} = useI18n()
const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    toggleLocale(value)
  }
})

const localeOptions = computed(() => {
  return locales.value.map(loc => ({
    label: loc.code.toUpperCase(),
    value: loc.code
  }))
})

const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const demoColumns = ref(useDemoColumns())

const faqItems = useFaqItems()
const capabilities = useCapabilities()
</script>

<template>
  <div class="landing">
    <UHeader
        :ui="{
    toggle: 'min-[550px]:hidden',
    center: 'hidden sm:flex'
    }" :links="[
    // { label: 'Возможности', to: '#features' },
    // { label: 'Как работает', to: '#how-it-works' },
    // { label: 'FAQ', to: '#faq' }
  ]">
      <!-- Левый слот для логотипа -->
      <template #left>
        <h4 class="flex items-center gap-2 text-xl font-bold shrink-0">
          <img src="/logo.svg" alt="logo" class="h-6 w-auto">
          {{ $t('landing.hero.titleAccent') }}
        </h4>
      </template>

      <!-- Правый слот для кнопок управления -->
      <template #right>
        <div class="flex items-center gap-2 max-[550px]:hidden">
          <!-- Переключение темы -->
          <UButton
              variant="ghost"
              @click="toggleTheme"
          >
            <template #leading>
              <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="w-4 h-4"/>
              <Icon v-else name="lucide:moon" class="w-4 h-4"/>
            </template>
          </UButton>

          <!-- Переключатель языка -->
          <div class="flex items-center gap-1">
            <Icon name="lucide:languages" class="w-4 h-4 text-neutral-500 dark:text-neutral-400"/>
            <USelect
                :items="localeOptions"
                v-model="currentLocale"
                variant="ghost"
                class="w-16"
                :ui="{
              base: 'bg-transparent',
            }"
            />
          </div>

          <!-- Кнопка регистрации -->
          <NuxtLink :to="$localePath('/register')">
            <UButton
                color="primary">
              {{$t("landing.nav.register")}}
            </UButton>
          </NuxtLink>
        </div>
      </template>

      <!-- Мобильное меню (body слот) -->
      <template #body>
        <div class="flex flex-col gap-4 p-4 h-[calc(100vh-100px)]">
          <UNavigationMenu
              :items="[
            { label: $t('landing.nav.features'), to: '#features' },
            { label: $t('landing.nav.how'), to: '#how-it-works' },
            { label: $t('landing.nav.faq'), to: '#faq' }
          ]"
              orientation="vertical"
              class="-mx-2.5"
          />

          <div
              class="flex items-center mt-auto justify-between gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div class="flex items-center gap-2">
              <UButton
                  variant="ghost"
                  size="sm"
                  @click="toggleTheme"
              >
                <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="w-4 h-4"/>
                <Icon v-else name="lucide:moon" class="w-4 h-4"/>
              </UButton>

              <div class="flex items-center gap-1">
                <Icon name="lucide:languages" class="w-4 h-4"/>
                <USelect
                    :items="localeOptions"
                    v-model="currentLocale"
                    variant="ghost"
                    size="sm"
                />
              </div>
            </div>

            <NuxtLink :to="$localePath('/register')">
              <UButton color="primary" size="sm">
                {{$t("landing.nav.register")}}
              </UButton>
            </NuxtLink>
          </div>
        </div>
      </template>
    </UHeader>

    <!-- Hero блок -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content max-[550px]:[90%]">
          <h1 class="hero__title">
            <span class="hero__title-accent">{{ $t("landing.hero.titleAccent") }}</span>
            <br>{{ $t("landing.hero.title") }}
          </h1>
          <p class="hero__subtitle">
            {{ $t("landing.hero.subtitle") }}
          </p>
          <div class="hero__buttons mt-5">
            <NuxtLink :to="$localePath('/register')">
              <UButton size="xl" color="primary">
                {{ $t("landing.hero.cta") }}
              </UButton>
            </NuxtLink>
          </div>
        </div>
        <div class="hero__image">
          <div class="kanban-preview">
            <div class="hero__image">
              <div class="kanban-preview">
                <div
                    v-for="column in demoColumns"
                    :key="column.id"
                    class="kanban-preview__col"
                >
                  <div class="kanban-preview__col-title">{{ column.name }}</div>
                  <draggable
                      class="flex flex-col gap-2"
                      v-model="column.tasks"
                      :group="{ name: 'tasks', pull: true, revertClone: false }"
                      item-key="id"
                      animation="150"
                      ghost-class="opacity-50"
                      drag-class="cursor-grabbing"
                      handle=".kanban-preview__task"
                  >
                    <template #item="{ element }">
                      <div class="kanban-preview__task">
                        {{ element.title }}
                      </div>
                    </template>
                  </draggable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Слайдер преимуществ -->
    <section id="features" class="slider-section">
      <div class="container">
        <h2 class="section-title">{{ $t("landing.whyus.title") }} <span
            class="accent">{{ $t("landing.whyus.accent") }} </span></h2>
        <Swiper
            :modules="[Pagination, Autoplay]"
            :slides-per-view="1"
            :space-between="30"
            :pagination="{
              clickable: true,
              el: '.custom-pagination'
            }"
            :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :breakpoints="{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }"
            class="features-swiper"
        >
          <SwiperSlide
              v-for="(_,index) in 4"
              :key="_"
              class="feature-card"
          >
            <div class="feature-card__icon">{{ $t(`landing.whyus.slides[${index}].icon`) }}️</div>
            <h3>{{ $t(`landing.whyus.slides[${index}].title`) }}</h3>
            <p>{{ $t(`landing.whyus.slides[${index}].description`) }}</p>
          </SwiperSlide>
        </Swiper>
        <div class="custom-pagination"></div>
      </div>
    </section>

    <!-- Как это работает -->
    <section id="how-it-works" class="how-it-works">
      <div class="container">
        <h2 class="section-title">{{ $t("landing.how.title") }} <span
            class="accent">{{ $t("landing.how.titleGradient") }}</span></h2>
        <div class="steps">
          <div class="step">
            <div class="step__number">1</div>
            <h3>{{ $t("landing.how.steps.1.title") }}</h3>
            <p>{{ $t("landing.how.steps.1.desc") }}</p>
          </div>
          <div class="step">
            <div class="step__number">2</div>
            <h3>{{ $t("landing.how.steps.2.title") }}</h3>
            <p>{{ $t("landing.how.steps.2.desc") }}</p>
          </div>
          <div class="step">
            <div class="step__number">3</div>
            <h3>{{ $t("landing.how.steps.3.title") }}</h3>
            <p>{{ $t("landing.how.steps.3.desc") }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Возможности -->
    <section class="capabilities">
      <div class="container">
        <h2 class="section-title">{{ $t("landing.features.title") }} <span
            class="accent">{{ $t("landing.features.accent") }}</span></h2>
        <div class="capabilities-grid">
          <div v-for="cap in capabilities" :key="cap.title" class="capability-card">
            <div class="capability-card__icon">{{ cap.icon }}</div>
            <h3>{{ cap.title }}</h3>
            <p>{{ cap.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Аккордеон (FAQ) -->
    <section id="faq" class="faq">
      <div class="container">
        <h2 class="section-title">{{$t("landing.faq.title")}}<span class="accent" >{{$t("landing.faq.accent")}}</span></h2>
        <UAccordion :items="faqItems"/>
      </div>
    </section>

    <!-- Призыв к действию -->
    <section class="cta">
      <div class="container cta__inner">
        <h2>{{$t("landing.cta.title")}}</h2>
        <p>{{$t("landing.cta.desc")}}</p>
        <NuxtLink :to="$localePath('/register')">
          <UButton size="xl" color="primary">
            {{$t("landing.cta.button")}}
          </UButton>
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>{{$t("landing.footer")}}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.features-swiper {
  margin-bottom: 0;
}

.custom-pagination {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: 32px;
}

:deep(.custom-pagination .swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: var(--ui-text-muted);
  opacity: 0.5;
  border-radius: 50%;
  cursor: pointer;
}

:deep(.custom-pagination .swiper-pagination-bullet-active) {
  background: var(--ui-primary);
  opacity: 1;
  width: 8px;
  border-radius: 4px;
}

.landing {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

section {
  padding: 80px 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 48px;
  font-weight: 700;
}

.accent {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* Hero */
.hero {
  padding-top: 40px;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.hero__title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
}

.hero__title-accent {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hero__subtitle {
  font-size: 1.2rem;
  color: var(--ui-text-muted);
  margin-bottom: 32px;
  line-height: 1.5;
}

.hero__buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.hero__stats {
  font-size: 0.9rem;
  color: var(--ui-text-muted);
}

/* Имитация доски */
.kanban-preview {
  display: flex;
  gap: 12px;
  background: var(--ui-bg-muted);
  padding: 16px;
  border-radius: 24px;
  transition: all 0.3s;
  overflow-x: auto;
  justify-content: center;
}

.kanban-preview__col {
  flex: 1;
  min-width: 140px;
  background: var(--ui-bg);
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.kanban-preview__col-title {
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--ui-border);
  font-size: 0.9rem;
}

.kanban-preview__tasks {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 100px;
}

.kanban-preview__task {
  background: var(--ui-bg-muted);
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  transition: transform 0.2s;
  cursor: grab;
  word-break: break-word;
}

.kanban-preview__task:active {
  cursor: grabbing;
}

.kanban-preview__task:hover {
  transform: translateX(4px);
}

/* Карточки слайдера */
.feature-card {
  background: var(--ui-bg);
  border-radius: 24px;
  padding: 24px 16px;
  text-align: center;
  box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-6px);
}

.feature-card__icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin-bottom: 12px;
  font-size: 1.25rem;
}

.feature-card p {
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Шаги */
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  text-align: center;
}

.step__number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.step h3 {
  margin-bottom: 12px;
  font-size: 1.2rem;
}

.step p {
  font-size: 0.9rem;
  color: var(--ui-text-muted);
}

/* Возможности (сетка) */
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.capability-card {
  background: var(--ui-bg);
  border-radius: 20px;
  padding: 24px 16px;
  text-align: center;
  transition: transform 0.3s;
  border: 1px solid var(--ui-border);
}

.capability-card:hover {
  transform: translateY(-4px);
}

.capability-card__icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.capability-card h3 {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.capability-card p {
  color: var(--ui-text-muted);
  line-height: 1.4;
  font-size: 0.9rem;
}

/* Аккордеон */
.accordion {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
}

.accordion__item {
  border-bottom: 1px solid var(--ui-border);
}

.accordion__question {
  width: 100%;
  text-align: left;
  padding: 16px 0;
  font-weight: 600;
  font-size: 1rem;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: var(--ui-text);
  gap: 12px;
}

.accordion__icon {
  font-size: 1.3rem;
  font-weight: 300;
  flex-shrink: 0;
}

.accordion__answer {
  padding-bottom: 16px;
  color: var(--ui-text-muted);
  line-height: 1.5;
  animation: fadeSlide 0.3s ease;
  font-size: 0.95rem;
}

/* CTA */
.cta {
  text-align: center;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 32px;
  margin: 40px 16px;
  padding: 16px;
}

.cta__inner {
  padding: 32px 16px;
}

.cta h2 {
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: white;
}

.cta p {
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  padding: 0 16px;
}

/* Footer */
.footer {
  text-align: center;
  padding: 24px 0;
  border-top: 1px solid var(--ui-border);
  color: var(--ui-text-muted);
  font-size: 0.85rem;
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== АДАПТИВ ========== */

@media (max-width: 1024px) {
  .hero__title {
    font-size: 2.8rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .container {
    padding: 0 20px;
  }

  section {
    padding: 60px 0;
  }

  .hero__inner {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }

  .hero__buttons {
    justify-content: center;
  }

  .kanban-preview {
    max-width: 550px;
    margin-inline: auto;
  }
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 2.5rem;
  }


  .hero__stats {
    justify-content: center;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 32px;
  }

  .steps {
    gap: 24px;
  }

  .capabilities-grid {
    gap: 20px;
  }

  .cta h2 {
    font-size: 1.6rem;
  }
}

/* Мобильные устройства (600px) */
@media (max-width: 600px) {
  .kanban-preview {
    display: none;
  }

  .container {
    padding: 0 16px;
  }

  section {
    padding: 50px 0;
  }

  .hero {
    padding-top: 20px;
  }

  .hero__title {
    font-size: 2rem;
  }

  .hero__subtitle {
    font-size: 1rem;
    margin-bottom: 24px;
  }

  .hero__buttons {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .features-swiper {
    padding: 0 8px;
  }

  .custom-pagination {
    margin-top: 24px;
  }

  .step__number {
    width: 44px;
    height: 44px;
    font-size: 1.3rem;
  }

  .step h3 {
    font-size: 1.1rem;
  }

  .capability-card {
    padding: 20px 16px;
  }

  .capability-card__icon {
    font-size: 36px;
  }

  .accordion {
    padding: 0 8px;
  }

  .accordion__question {
    font-size: 0.95rem;
    padding: 14px 0;
  }

  .cta {
    margin: 30px 12px;
  }

  .cta__inner {
    padding: 28px 12px;
  }

  .cta h2 {
    font-size: 1.4rem;
  }

  .cta p {
    font-size: 0.9rem;
  }
}

/* Маленькие мобильные устройства (480px и меньше) */
@media (max-width: 480px) {
  .container {
    padding: 0 12px;
  }

  .hero__title {
    font-size: 20px;
  }

  .hero__content {
    max-width: 100%;

  }

  .hero__
  .hero__title-accent {
    font-size: 1.8rem;
  }

  .hero__subtitle {
    font-size: 15px;
    max-width: 300px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .section-title br {
    display: none;
  }

  .kanban-preview {
    padding: 12px;
    gap: 8px;
  }

  .kanban-preview__col {
    min-width: 120px;
    padding: 8px;
  }

  .kanban-preview__col-title {
    font-size: 0.8rem;
  }

  .kanban-preview__task {
    font-size: 0.7rem;
    padding: 6px 8px;
  }

  .feature-card {
    padding: 20px 12px;
  }

  .feature-card__icon {
    font-size: 32px;
  }

  .feature-card h3 {
    font-size: 1.1rem;
  }

  .feature-card p {
    font-size: 0.8rem;
  }

  .steps {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .capabilities-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .cta {
    border-radius: 24px;
  }

  .cta__inner {
    padding: 24px 12px;
  }

  .cta h2 {
    font-size: 1.3rem;
  }

  .footer {
    padding: 20px 0;
    font-size: 0.75rem;
  }
}

/* Очень маленькие устройства (360px) */
@media (max-width: 360px) {
  .hero__
  .hero__title {
    font-size: 1.5rem;
  }

  .hero__title-accent {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .kanban-preview__col {
    min-width: 100px;
  }

  .accordion__question {
    font-size: 0.85rem;
  }

  .accordion__answer {
    font-size: 0.85rem;
  }

  .custom-pagination {
    margin-top: 20px;
  }

  :deep(.custom-pagination .swiper-pagination-bullet) {
    width: 6px;
    height: 6px;
  }
}
</style>

