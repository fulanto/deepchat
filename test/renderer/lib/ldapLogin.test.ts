import { describe, expect, it } from 'vitest'
import {
  hasCompletedLdapLogin,
  LDAP_LOGIN_SESSION_KEY,
  markLdapLoginCompleted,
  normalizeLdapLoginUrl
} from '@/lib/ldapLogin'

describe('ldapLogin helpers', () => {
  it('normalizes configured http and https URLs', () => {
    expect(normalizeLdapLoginUrl(' https://login.example.com/ldap ')).toBe(
      'https://login.example.com/ldap'
    )
    expect(normalizeLdapLoginUrl('http://localhost:8080/login')).toBe('http://localhost:8080/login')
  })

  it('rejects empty, invalid, and non-http URLs', () => {
    expect(normalizeLdapLoginUrl('')).toBeNull()
    expect(normalizeLdapLoginUrl('not a url')).toBeNull()
    expect(normalizeLdapLoginUrl('file:///tmp/login.html')).toBeNull()
    expect(normalizeLdapLoginUrl('ldap://directory.example.com')).toBeNull()
  })

  it('stores completion as per-session state', () => {
    const storage = window.sessionStorage
    storage.removeItem(LDAP_LOGIN_SESSION_KEY)

    expect(hasCompletedLdapLogin(storage)).toBe(false)

    markLdapLoginCompleted(storage)

    expect(storage.getItem(LDAP_LOGIN_SESSION_KEY)).toBe('1')
    expect(hasCompletedLdapLogin(storage)).toBe(true)
  })
})
