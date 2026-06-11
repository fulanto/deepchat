import { copyRuntimeText, openRuntimeExternal } from './runtime'

export function createExternalUrlClient() {
  async function openExternal(url: string) {
    await openRuntimeExternal(url)
  }

  function copyText(text: string) {
    copyRuntimeText(text)
  }

  return {
    openExternal,
    copyText
  }
}

export type ExternalUrlClient = ReturnType<typeof createExternalUrlClient>
