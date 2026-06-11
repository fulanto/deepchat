# macOS Manual Build Empty CSC_LINK Failure Specification

## Goal
Fix manual macOS GitHub Actions builds on forks when no Developer ID certificate secret is configured.

## Requirements
- Manual `Build Application` macOS jobs without `DEEPCHAT_CSC_LINK` must not pass an empty `CSC_LINK` to electron-builder.
- Unsigned manual macOS builds must disable electron-builder signing auto-discovery to avoid accidental runner-local signing behavior.
- Manual macOS builds with `DEEPCHAT_CSC_LINK` configured must keep signed/release-style behavior.
- `Release` workflow signing behavior must remain unchanged.

## Non-goals
- Changing LDAP renderer behavior.
- Fixing CUA Swift warnings that do not fail the build.
