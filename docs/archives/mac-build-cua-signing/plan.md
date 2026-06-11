# macOS Build Workflow CUA Signing Plan

1. Make `build_for_release` conditional in the manual build workflow macOS job based on whether `DEEPCHAT_CSC_LINK` is configured.
2. Keep the release workflow macOS job unchanged.
3. Add a short note to the LDAP packaging guide that unsigned fork builds can leave mac signing secrets unset.
4. Run formatting and workflow syntax checks.
