<script setup lang="ts">
import * as z from 'zod'
import type {AuthFormField} from "#ui/components/AuthForm.vue";
import type {FormSubmitEvent} from "#ui/types";
const toast = useToast()

const {login} = useLogin()

// поля формы
const fields:AuthFormField[] = [
  {
    label: $t("auth.email"),
    type: "email",
    placeholder: $t("auth.emailPlaceholder"),
    required: true,
    name: "email",
  },
  {
    label: $t('auth.password'),
    type: "password",
    placeholder: $t('auth.passwordPlaceholder'),
    required: true,
    name: "password",
  }
]
// валидация
const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string("Password is required").min(3, "Must be at least 8 characters"),
})
type Schema = z.output<typeof schema>

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

const submit = (userData: FormSubmitEvent<Schema>) =>{
  const res = login(userData.data)

  if (!res.errors) {
    toast.add({
      title: 'Successfully logged in',
      color: 'success',
    })
  }
}

</script>

<template>
  <UAuthForm
      :schema="schema"
      :title="$t('auth.login')"
      :description="$t('auth.credentials')"
      :fields="fields"
      icon="i-lucide-user"
      :providers="providers"
      @submit="submit"
      :submit="{
        label: $t('auth.loginButton'),
      }"
  />
</template>

<style scoped>

</style>