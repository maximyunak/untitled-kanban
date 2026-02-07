<script setup lang="ts">

import * as z from "zod";
import type {AuthFormField} from "#ui/components/AuthForm.vue";
import type {FormSubmitEvent} from "#ui/types";
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
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, "Must be at least 8 characters"),
})
type Schema = z.output<typeof schema>

const userSchema = z.object({
  firstName: z.string('First name is required').min(1, 'First name is required'),
  lastName: z.string('Last name is required').min(1, 'Last name is required'),
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
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
  defaultValue: userData.email
}, {
  name: 'password',
  type: 'password',
  label: 'Password',
  placeholder: 'Enter your password',
  required: true,
  defaultValue: userData.password
}])

function submitFirstStep(payload: FormSubmitEvent<Schema>) {
  Object.assign(userData, payload.data)
  step.value++
}

const submit = async () => {
  const res = await register(userData)

  if (!res.errors) {
    toast.add({
      title: 'Registration successful',
      description: 'You can now log in using your credentials',
      color: 'success',
    })
  } else {
    const description = Object.values(res.errors).flat().join('\n')
    toast.add({
      title: 'Registration failed',
      description,
      color: 'error',
    })
    if (Object.keys(res.errors).includes('email')) {
      step.value = 1
    }
  }
};

</script>

<template>
  <Transition name="fade" mode="out-in">

    <UAuthForm
        v-if="step === 1"
        :schema="schema"
        title="Registration"
        description="Registration description"
        :fields="fields"
        icon="i-lucide-user"
        :providers="providers"
        @submit="submitFirstStep"
    />

    <div v-else>
      <div class="flex items-center justify-between flex-col mb-4">
        <UIcon name="i-lucide-user" class="size-8 mb-2"/>
        <h2 class="mb-2">Profile</h2>
        <p class="text-gray-400 mb-4">Enter your full name to complete registration.</p>
      </div>

      <UForm :schema="userSchema" :state="userData" @submit.prevent="submit" class="flex flex-col gap-5">
        <UFormField label="First Name" name="firstName">
          <UInput v-model="userData.firstName" placeholder="First Name" class="w-full"/>
        </UFormField>
        <UFormField label="Last Name" name="lastName">
          <UInput v-model="userData.lastName" placeholder="Last Name" class="w-full"/>
        </UFormField>
        <UFormField label="Patronymic" name="patronymic">
          <UInput v-model="userData.patronymic" placeholder="Patronymic" class="w-full"/>
        </UFormField>
        <div class="flex gap-3">
          <UButton @click="step--" icon="material-symbols:arrow-back" variant="subtle"></UButton>
          <UButton type="submit" block>Finish</UButton>
        </div>
      </UForm>
    </div>
  </Transition>
</template>

<style scoped>

</style>