# Electron-Vite 重构迁移指南

## 项目创建完成 ✅

已成功创建一个全新的 `electron-vite + vue3 + typescript` 桌面应用项目。

**项目位置**: `c:\Users\Administrator\Desktop\vue\vue3-music-app`

## 项目结构对比

### 原项目 (Web)
```
vue3-music/
├── src/
│   ├── components/
│   ├── models/
│   ├── router/
│   ├── stores/
│   ├── utils/
│   ├── views/
│   ├── App.vue
│   ├── main.ts
│   └── assets/
├── package.json
└── vite.config.ts
```

### 新项目 (Desktop/Electron)
```
vue3-music-app/
├── src/
│   ├── main/              # ⭐ Electron 主进程（新增）
│   ├── preload/           # ⭐ 预加载脚本（新增）
│   └── renderer/src/      # 渲染进程（Web UI）
│       ├── components/
│       ├── models/
│       ├── router/
│       ├── stores/
│       ├── utils/
│       ├── views/
│       ├── App.vue
│       ├── main.ts
│       └── assets/
├── electron.vite.config.ts
├── electron.builder.config.json
└── package.json
```

## 迁移步骤

### 1️⃣ 复制 Web 代码到渲染进程

将原项目的大部分代码复制到新项目的 `src/renderer/src/` 目录：

```bash
# 从原项目复制文件（相对路径）
cp -r ../vue3-music/src/components/*   src/renderer/src/components/
cp -r ../vue3-music/src/models/*       src/renderer/src/models/
cp -r ../vue3-music/src/router/*       src/renderer/src/router/
cp -r ../vue3-music/src/stores/*       src/renderer/src/stores/
cp -r ../vue3-music/src/utils/*        src/renderer/src/utils/
cp -r ../vue3-music/src/views/*        src/renderer/src/views/
cp -r ../vue3-music/src/assets/*       src/renderer/src/assets/
```

### 2️⃣ 更新导入路径

所有导入路径需要从 `@/` 改为 `@/` (已配置别名指向 `src/renderer/src`)

```typescript
// ✅ 在新项目中这样写就行
import { useMusicStore } from '@/stores/music'
import '@/assets/base.scss'
```

### 3️⃣ 集成原有的 API 调用

编辑 `src/renderer/src/utils/http.ts`，将原项目的 HTTP 客户端复制过来：

```typescript
// 原项目中的 API 配置可以直接复用
// src/renderer/src/utils/http.ts
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default instance
```

### 4️⃣ 使用 Electron IPC 进行进程间通信

主进程已提供以下 API：

```javascript
// 在渲染进程中使用
window.electron.showNotification(title, body)      // 显示系统通知
window.electron.getAppPath()                       // 获取应用路径
window.electron.registerShortcut(key, action)      // 注册全局快捷键
window.electron.onHotkey(callback)                 // 监听快捷键触发
window.electron.onMenuSettings(callback)           // 监听设置菜单
```

### 5️⃣ 扩展 Electron 功能

#### 添加应用菜单
编辑 `src/main/index.ts`，在 `createWindow` 后添加：

```typescript
const menu = Menu.buildFromTemplate([
  {
    label: '文件',
    submenu: [
      { role: 'quit', label: '退出' }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { role: 'undo', label: '撤销' },
      { role: 'redo', label: '重做' }
    ]
  }
])

Menu.setApplicationMenu(menu)
```

#### 添加自动更新
```bash
pnpm add electron-updater
```

然后在 `src/main/index.ts` 中配置自动更新。

### 6️⃣ 调整路由配置

由于 Electron 应用使用 hash 路由，创建时已自动配置：

```typescript
// 已设置为 createWebHashHistory
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
```

### 7️⃣ 环境变量配置

复制原项目的 `.env` 文件：

```bash
cp ../vue3-music/.env .env
```

构建时会自动使用环境变量。

## 开发和构建

### 开发模式
```bash
cd vue3-music-app
pnpm run dev
```

### 生产构建
```bash
pnpm run build
```

### 打包安装程序

**Windows:**
```bash
pnpm run pack:win
```

**macOS:**
```bash
pnpm run pack:mac
```

**Linux:**
```bash
pnpm run pack:linux
```

打包后的文件会在 `dist/` 目录中。

## 已实现的原生功能

✅ **系统托盘** - 最小化到托盘，点击显示/隐藏窗口
✅ **快捷菜单** - 右键菜单快速访问功能
✅ **系统通知** - 播放事件/应用事件通知
✅ **全局快捷键** - 注册全局快捷键控制播放
✅ **多平台支持** - Windows/Mac/Linux

## 依赖关键版本

| 包 | 版本 |
|---|---|
| vue | 3.5.0 |
| electron | 31.0.0 |
| electron-vite | 5.0.0 |
| vite | 8.0.11 |
| typescript | 6.0.3 |
| element-plus | 2.0.4 |
| pinia | 2.0.11 |

## 常见问题

### Q: 如何在渲染进程中调用主进程的函数？
A: 使用 IPC 通信，已在 `src/preload/index.ts` 中暴露了主要 API。

### Q: 如何打包应用为 exe？
A: 运行 `pnpm run pack:win`

### Q: 如何开启开发者工具？
A: 在 `src/main/index.ts` 中保留 `mainWindow.webContents.openDevTools()` 这一行

### Q: 如何修改应用名称/图标？
A: 修改 `electron.builder.config.json` 中的设置，并替换 `resources/icon.ico`

## 下一步任务

1. ✅ 项目结构创建完成
2. ⏳ 复制原有代码到新项目
3. ⏳ 测试所有功能是否正常
4. ⏳ 集成系统托盘/快捷键等原生功能
5. ⏳ 配置打包和发布流程
6. ⏳ 优化应用启动速度和内存占用

## 技术参考

- [Electron 官方文档](https://www.electronjs.org/docs)
- [Electron-Vite 官方文档](https://electron-vite.org/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Electron Builder](https://www.electron.build/)
