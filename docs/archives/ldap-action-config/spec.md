# LDAP GitHub Actions Configuration Specification

## Goal
Document and wire the LDAP login URL so maintainers can produce LDAP-enabled packages from GitHub Actions without changing source code.

## Requirements
- Manual build workflow runs can accept an optional LDAP login URL input.
- Release workflow dispatch runs can accept an optional LDAP login URL input.
- Tag-triggered releases can read the LDAP login URL from a repository/environment variable or secret.
- Leaving the value empty keeps the LDAP login screen disabled.
- Documentation must explain the exact GitHub Actions configuration names and what value to set.

## Non-goals
- Adding runtime LDAP server configuration after packaging.
- Changing the LDAP login page behavior or backend authentication contracts.
