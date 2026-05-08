# 🚀 快速启动指南

## 当前状态

✅ **Electron-Vite 桌面应用框架已创建**

- 项目位置: `c:\Users\Administrator\Desktop\vue\vue3-music-app`
- 使用技术: Electron 31 + Vue3 + TypeScript + Vite 8
- 原生功能: 系统托盘、全局快捷键、系统通知、跨平台支持

## 从现在开始

### 第一步：进入项目目录
```powershell
cd c:\Users\Administrator\Desktop\vue\vue3-music-app
```

### 第二步：启动开发服务器
```powershell
pnpm run dev
```

这会同时启动：
- Electron 主进程
- Vite 渲染进程开发服务器（热更新）
- 开发者工具（自动打开）

### 第三步：在 VS Code 中打开项目

```powershell
code c:\Users\Administrator\Desktop\vue\vue3-music-app
```

## 下一步：迁移原有功能

### 方式 A：手动复制（更灵活）

1. 打开原项目: `c:\Users\Administrator\Desktop\vue\vue3-music`
2. 复制 `src/` 下的文件到新项目的 `src/renderer/src/`
3. 更新所有导入路径（使用 VS Code 的查找替换）

### 方式 B：脚本复制（快速）

```powershell
# 从新项目目录运行
$oldDir = "c:\Users\Administrator\Desktop\vue\vue3-music\src"
$newDir = "src\renderer\src"

# 复制核心文件
Copy-Item "$oldDir\stores\*" "$newDir\stores\" -Force -Recurse
Copy-Item "$oldDir\utils\*" "$newDir\utils\" -Force -Recurse
Copy-Item "$oldDir\models\*" "$newDir\models\" -Force -Recurse
Copy-Item "$oldDir\views\*" "$newDir\views\" -Force -Recurse
Copy-Item "$oldDir\components\*" "$newDir\components\" -Force -Recurse
Copy-Item "$oldDir\assets\*" "$newDir\assets\" -Force -Recurse
```

## 关键命令

```powershell
# 开发
pnpm run dev

# 构建
pnpm run build

# 打包为 Windows 安装程序
pnpm run pack:win

# 打包为 macOS
pnpm run pack:mac

# 打包为 Linux
pnpm run pack:linux
```

## 文件结构速查

```
src/
├── main/index.ts           # Electron 主进程 ⭐
├── preload/index.ts        # 预加载脚本（IPC API）⭐
└── renderer/
    └── src/
        ├── main.ts         # Vue 应用入口
        ├── App.vue         # 根组件
        ├── components/     # Vue 组件
        ├── views/          # 页面
        ├── router/         # 路由
        ├── stores/         # Pinia 状态管理
        ├── models/         # 数据模型
        ├── utils/          # 工具函数
        └── assets/         # 样式和资源
```

## Electron IPC API 已暴露

在渲染进程中使用：

```javascript
// 类型定义已提供在 src/renderer/src/env.d.ts
window.electron.showNotification(title, body)
window.electron.getAppPath()
window.electron.registerShortcut(key, action)
window.electron.onHotkey(callback)
```

## 常见任务

### 修改应用标题
编辑 `src/main/index.ts` 的 `mainWindow.webContents.setUserAgent()` 或窗口标题

### 修改窗口大小
在 `src/main/index.ts` 中修改 `new BrowserWindow()` 的配置

### 添加右键菜单
在 `src/main/index.ts` 的 `createWindow()` 中添加 `Menu` 配置

### 启用自动更新
安装 `electron-updater` 并在 `src/main/index.ts` 中配置

## 遇到问题？

1. **开发服务器无法启动**
   - 检查 Node.js 版本: `node -v`
   - 清理并重新安装: `pnpm install`

2. **Electron 无法加载应用**
   - 查看控制台输出
   - 删除 `dist/` 和 `.electron-vite/` 目录
   - 重新运行 `pnpm run dev`

3. **路径错误**
   - 确保所有导入使用 `@/` 别名
   - 检查 `electron.vite.config.ts` 中的别名配置

## 文档参考

- 📖 [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - 详细迁移步骤
- 📖 [README.md](./README.md) - 项目概览
- 🔗 [Electron 官方文档](https://www.electronjs.org/docs)
- 🔗 [Electron-Vite 官方文档](https://electron-vite.org/)

---

**准备好了吗？** 运行 `pnpm run dev` 启动你的第一个 Electron 应用！ 🎉
