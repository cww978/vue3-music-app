import { app, BrowserWindow, Menu, Tray, ipcMain, Notification } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

// 创建主窗口
const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  // 隐藏菜单栏
  mainWindow.removeMenu()

  // 加载应用
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    // 打开开发者工具
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 窗口关闭时关闭应用
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 系统托盘菜单
const createTray = (): void => {
  if (!is.win32) return

  tray = new Tray(join(__dirname, '../../resources/icon.ico'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: (): void => {
        if (mainWindow) {
          mainWindow.show()
        } else {
          createWindow()
        }
      }
    },
    {
      label: '设置',
      click: (): void => {
        if (mainWindow) {
          mainWindow.webContents.send('menu-settings')
        }
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click: (): void => {
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)

  // 点击托盘图标显示窗口
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })
}

app.on('ready', () => {
  createWindow()
  createTray()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// IPC 主进程消息处理
ipcMain.on('show-notification', (_, { title, body }) => {
  new Notification({
    title,
    body,
    icon: join(__dirname, '../../resources/icon.ico')
  }).show()
})

ipcMain.handle('get-app-path', () => {
  return app.getAppPath()
})

// 全局快捷键设置
ipcMain.on('register-shortcut', (_, shortcut, action) => {
  const { globalShortcut } = require('electron')
  globalShortcut.register(shortcut, () => {
    mainWindow?.webContents.send('hotkey-triggered', action)
  })
})
