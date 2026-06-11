# LDAP Login Entry Screen Plan

1. Add a small renderer LDAP login configuration/session helper around `VITE_LDAP_LOGIN_URL`.
2. Add a dedicated `/ldap-login` route and page using existing app styling and i18n strings.
3. Gate the startup router so the LDAP page appears before welcome/chat when configured, and resume normal startup after the login action.
4. Document the build-time environment variable in `.env.example`.
5. Add renderer unit coverage for URL validation and per-session completion behavior.
