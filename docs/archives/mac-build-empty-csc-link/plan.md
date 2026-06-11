# macOS Manual Build Empty CSC_LINK Failure Plan

1. Add a mac build job flag derived from whether `DEEPCHAT_CSC_LINK` exists.
2. Split the manual mac build step into signed and unsigned variants.
3. Ensure the unsigned variant omits `CSC_LINK` and sets `CSC_IDENTITY_AUTO_DISCOVERY=false`.
4. Document why unsigned manual mac builds omit signing secrets.
