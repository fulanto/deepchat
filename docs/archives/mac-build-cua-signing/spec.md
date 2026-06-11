# macOS Build Workflow CUA Signing Specification

## Goal
Allow the manual macOS build workflow to run on forks or unsigned environments without failing in the CUA helper signing step, while preserving release signing behavior when certificates are configured.

## Requirements
- Manual `Build Application` macOS jobs must not force release signing when `DEEPCHAT_CSC_LINK` is unavailable.
- If `DEEPCHAT_CSC_LINK` is configured, manual macOS builds may keep release-style signing/notarization behavior.
- Release workflow behavior remains unchanged and continues to require signing configuration.
- The fix must not change renderer LDAP behavior.

## Non-goals
- Changing the CUA driver Swift source warnings.
- Removing release signing verification.
