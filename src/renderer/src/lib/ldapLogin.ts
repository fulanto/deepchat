export const LDAP_LOGIN_COMPLETED_EVENT = 'deepchat:ldap-login-completed'
export const LDAP_LOGIN_SESSION_KEY = 'deepchat.ldapLogin.completed'

export const normalizeLdapLoginUrl = (value: string | undefined | null): string | null => {
  const rawUrl = value?.trim()
  if (!rawUrl) {
    return null
  }

  try {
    const url = new URL(rawUrl)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null
    }
    return url.toString()
  } catch {
    return null
  }
}

export const getConfiguredLdapLoginUrl = (): string | null => {
  return normalizeLdapLoginUrl(import.meta.env.VITE_LDAP_LOGIN_URL)
}

export const hasCompletedLdapLogin = (storage: Storage | undefined = window.sessionStorage) => {
  try {
    return storage?.getItem(LDAP_LOGIN_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export const markLdapLoginCompleted = (storage: Storage | undefined = window.sessionStorage) => {
  try {
    storage?.setItem(LDAP_LOGIN_SESSION_KEY, '1')
  } catch {
    // Session storage can be unavailable in restricted renderer contexts.
  }
}

export const shouldShowLdapLogin = () => {
  return Boolean(getConfiguredLdapLoginUrl()) && !hasCompletedLdapLogin()
}
