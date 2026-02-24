<script setup lang="ts">

import * as z from "zod";
import type {AuthFormField, FormSubmitEvent} from "#ui/types";
import type {IRegisterData} from "~/types/auth";

const toast = useToast()
const {register} = useRegister()

const userData = reactive<IRegisterData>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  patronymic: ''
})

const step = ref(1)

// валидация
const schema = z.object({
  email: z.email($t('auth.errors.email')),
  password: z.string($t('auth.errors.password_required')).min(8, $t('auth.errors.password_min')),
})
type Schema = z.output<typeof schema>

const userSchema = z.object({
  firstName: z.string($t('auth.errors.first_name_required')).min(1, $t('auth.errors.first_name_required')),
  lastName: z.string($t('auth.errors.last_name_required')).min(1, ($t('auth.errors.last_name_required'))),
  patronymic: z.string().optional()
})

// oauth
const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({
      title: 'Login with Google',
    })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({
      title: 'Login with GitHub',
    })
  }
}]

// поля формы
const fields = computed<AuthFormField[]>(() => [{
  name: 'email',
  type: 'email',
  label: $t("auth.email"),
  placeholder: $t('auth.emailPlaceholder'),
  required: true,
  defaultValue: userData.email
}, {
  name: 'password',
  type: 'password',
  label: $t("auth.password"),
  placeholder: $t('auth.passwordPlaceholder'),
  required: true,
  defaultValue: userData.password
}])

function submitFirstStep(payload: FormSubmitEvent<Schema>) {
  Object.assign(userData, payload.data)
  step.value++
}

const submit = async () => {
  const res = await register(userData)

  if (res.error) {
    step.value = 1
  }
};

</script>

<template>
  <Transition name="fade" mode="out-in">

    <UAuthForm
        v-if="step === 1"
        :schema="schema"
        :title="$t('auth.register')"
        :description="$t('auth.registerInfo')"
        :fields="fields"
        icon="i-lucide-user"
        :providers="providers"
        @submit="submitFirstStep"
         :submit="{
        label: $t('auth.continue'),
      }"
    />


    <div v-else>
      <div class="flex items-center justify-between flex-col mb-4">
        <UIcon name="i-lucide-user" class="size-8 mb-2"/>
        <h2 class="mb-2">{{ $t("auth.profile") }}</h2>
        <p class="text-gray-400 mb-4">{{ $t("auth.profileInfo") }}</p>
      </div>

      <UForm :schema="userSchema" :state="userData" @submit.prevent="submit" class="flex flex-col gap-5">
        <UFormField :label="$t('auth.firstName')" name="firstName">
          <UInput v-model="userData.firstName" :placeholder="$t('auth.firstNamePlaceholder')" class="w-full"/>
        </UFormField>
        <UFormField :label="$t('auth.lastName')" name="lastName">
          <UInput v-model="userData.lastName" :placeholder="$t('auth.lastNamePlaceholder')" class="w-full"/>
        </UFormField>
        <UFormField :label="$t('auth.patronymic')" name="patronymic">
          <UInput v-model="userData.patronymic" :placeholder="$t('auth.patronymicPlaceholder')" class="w-full"/>
        </UFormField>
        <div class="flex gap-3">
          <UButton @click="step--" icon="material-symbols:arrow-back" variant="subtle"></UButton>
          <UButton type="submit" block>{{ $t("auth.finish") }}</UButton>
        </div>
      </UForm>
    </div>
  </Transition>
</template>

<style scoped>

</style>
