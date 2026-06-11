<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import {
  getConfiguredLdapLoginUrl,
  LDAP_LOGIN_COMPLETED_EVENT,
  markLdapLoginCompleted
} from '@/lib/ldapLogin'
import { createBrowserClient } from '@api/BrowserClient'

const { t } = useI18n()
const browserClient = createBrowserClient()
const loginUrl = computed(() => getConfiguredLdapLoginUrl())
const errorMessage = ref<string | null>(null)

const continueToDeepChat = () => {
  markLdapLoginCompleted()
  window.dispatchEvent(new CustomEvent(LDAP_LOGIN_COMPLETED_EVENT))
}

const openLogin = async () => {
  const targetUrl = loginUrl.value
  if (!targetUrl) {
    errorMessage.value = t('ldapLogin.errors.missingUrl')
    return
  }

  try {
    await browserClient.openExternal(targetUrl)
    errorMessage.value = null
    continueToDeepChat()
  } catch (error) {
    console.warn('[LdapLogin] Failed to open LDAP login URL:', error)
    errorMessage.value = t('ldapLogin.errors.openFailed')
  }
}
</script>

<template>
  <main
    class="flex h-full min-h-0 w-full items-center justify-center overflow-auto bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.14),_transparent_32rem)] px-6 py-10 window-drag-region"
  >
    <section
      class="window-no-drag mx-auto flex w-full max-w-[440px] flex-col items-center rounded-3xl border border-border/70 bg-background/90 px-8 py-9 text-center shadow-2xl shadow-black/10 backdrop-blur dark:shadow-black/30"
      aria-labelledby="ldap-login-title"
    >
      <div
        class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"
      >
        <Icon icon="lucide:building-2" class="h-8 w-8" />
      </div>

      <p class="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
        {{ t('ldapLogin.eyebrow') }}
      </p>
      <h1 id="ldap-login-title" class="text-2xl font-semibold tracking-tight text-foreground">
        {{ t('ldapLogin.title') }}
      </h1>
      <p class="mt-3 text-sm leading-6 text-muted-foreground">
        {{ t('ldapLogin.description') }}
      </p>

      <button
        type="button"
        class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="!loginUrl"
        data-testid="ldap-login-button"
        @click="openLogin"
      >
        <Icon icon="lucide:log-in" class="h-4 w-4" />
        {{ t('ldapLogin.actions.signIn') }}
      </button>

      <p v-if="errorMessage" class="mt-4 text-sm text-destructive" role="alert">
        {{ errorMessage }}
      </p>

      <p class="mt-5 text-xs leading-5 text-muted-foreground">
        {{ t('ldapLogin.footer') }}
      </p>
    </section>
  </main>
</template>
