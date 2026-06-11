# LDAP Login Button Click Specification

## Goal
Make the LDAP login button reliably clickable in the Electron macOS window and provide visible state when the external login URL is being opened.

## Requirements
- The LDAP login card and its interactive children must be excluded from Electron draggable regions.
- Clicking the LDAP login button must call the external URL opener with the configured URL.
- The button should show an opening/disabled state while the open request is in flight.
- Open failures should remain visible to the user.

## Non-goals
- Changing the LDAP authentication backend contract.
- Embedding the LDAP web page inside DeepChat.
