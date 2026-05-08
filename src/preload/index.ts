import { contextBridge, ipcRenderer } from 'electron'

const api = {
  showNotification: (title: string, body: string): void => {
    ipcRenderer.send('show-notification', { title, body })
  },
  getAppPath: (): Promise<string> => {
    return ipcRenderer.invoke('get-app-path')
  },
  registerShortcut: (shortcut: string, action: string): void => {
    ipcRenderer.send('register-shortcut', shortcut, action)
  },
  onHotkey: (callback: (action: string) => void): (() => void) => {
    const listener = (_: any, action: string) => callback(action)
    ipcRenderer.on('hotkey-triggered', listener)
    return () => ipcRenderer.removeListener('hotkey-triggered', listener)
  },
  onMenuSettings: (callback: () => void): (() => void) => {
    const listener = () => callback()
    ipcRenderer.on('menu-settings', listener)
    return () => ipcRenderer.removeListener('menu-settings', listener)
  }
}

contextBridge.exposeInMainWorld('electron', api)

export type ElectronAPI = typeof api
