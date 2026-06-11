# LDAP Login Entry Screen Specification

## Goal
Provide a unified LDAP login entry screen that can be enabled for packaged builds by setting a single build-time login URL.

## Requirements
- The LDAP login entry is disabled by default so existing development and release builds keep the current startup flow.
- Packagers can enable the entry by setting `VITE_LDAP_LOGIN_URL` before running the renderer build/package command.
- When enabled, the main renderer shows the LDAP entry before the normal welcome/chat startup routing for each renderer session.
- The login action opens the configured URL through the existing external URL bridge instead of navigating untrusted content inside the app shell.
- Only `http://` and `https://` LDAP login URLs are accepted; empty or invalid values disable the LDAP entry.
- After a user starts LDAP login, the current renderer session continues into the existing DeepChat startup flow without adding a new authentication backend contract.

## Non-goals
- Implementing LDAP credential collection inside DeepChat.
- Verifying LDAP callback tokens or enforcing backend authorization.
- Persisting LDAP authentication state across app restarts.
