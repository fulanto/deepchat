import { mount, flushPromises } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LDAP_LOGIN_COMPLETED_EVENT, LDAP_LOGIN_SESSION_KEY } from '@/lib/ldapLogin'

const openExternal = vi.fn()

const mountLdapLoginPage = async () => {
  vi.resetModules()
  vi.stubEnv('VITE_LDAP_LOGIN_URL', 'https://login.example.com/ldap')
  openExternal.mockResolvedValue(undefined)

  vi.doMock('@api/ExternalUrlClient', () => ({
    createExternalUrlClient: () => ({
      openExternal,
      copyText: vi.fn()
    })
  }))

  vi.doMock('vue-i18n', () => ({
    useI18n: () => ({
      t: (key: string) => key
    })
  }))

  const LdapLoginPage = (await import('@/pages/LdapLoginPage.vue')).default

  return mount(LdapLoginPage, {
    global: {
      stubs: {
        Icon: true
      }
    }
  })
}

beforeEach(() => {
  window.sessionStorage.removeItem(LDAP_LOGIN_SESSION_KEY)
  openExternal.mockReset()
})

afterEach(() => {
  window.sessionStorage.removeItem(LDAP_LOGIN_SESSION_KEY)
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('LdapLoginPage', () => {
  it('opens the configured LDAP URL when the login button is clicked', async () => {
    const completedListener = vi.fn()
    window.addEventListener(LDAP_LOGIN_COMPLETED_EVENT, completedListener)

    const wrapper = await mountLdapLoginPage()

    await wrapper.get('[data-testid="ldap-login-button"]').trigger('click')
    await flushPromises()

    expect(openExternal).toHaveBeenCalledWith('https://login.example.com/ldap')
    expect(window.sessionStorage.getItem(LDAP_LOGIN_SESSION_KEY)).toBe('1')
    expect(completedListener).toHaveBeenCalledTimes(1)

    window.removeEventListener(LDAP_LOGIN_COMPLETED_EVENT, completedListener)
  })
})
