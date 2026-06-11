# LDAP GitHub Actions Configuration Plan

1. Add optional `ldap_login_url` workflow inputs for manual build and release dispatch workflows.
2. Expose `VITE_LDAP_LOGIN_URL` at workflow scope from the dispatch input, repository variable, or secret.
3. Add a maintainer-facing guide that explains local and GitHub Actions packaging configuration.
4. Move this completed SDD folder to `docs/archives/` after implementation.
