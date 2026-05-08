# Vue3 Music Player Desktop App

使用 Electron + Vue3 + TypeScript 构建的跨平台音乐播放器桌面应用。

## 功能特性

- 🎵 音乐播放和管理
- 🎨 现代化 UI 设计（深色主题）
- 🖥️ 系统托盘支持
- ⌨️ 全局快捷键
- 📢 系统通知
- 🔄 跨平台支持（Windows/Mac/Linux）

## 项目结构

```
vue3-music-app/
├── src/
│   ├── main/              # Electron 主进程
│   ├── preload/           # 预加载脚本
│   ├── renderer/
│   │   └── src/
│   │       ├── assets/    # 样式和资源
│   │       ├── components/# Vue 组件
│   │       ├── router/    # 路由配置
│   │       ├── stores/    # Pinia 状态管理
│   │       ├── utils/     # 工具函数
│   │       ├── views/     # 页面组件
│   │       └── main.ts    # 应用入口
├── electron.vite.config.ts
├── electron.builder.config.json
└── package.json
```

## 开发

### 安装依赖

\`\`\`bash
cd vue3-music-app
pnpm install
\`\`\`

### 运行开发环境

\`\`\`bash
pnpm run dev
\`\`\`

### 构建生产版本

\`\`\`bash
pnpm run build
\`\`\`

### 打包应用

\`\`\`bash
pnpm run pack:win    # Windows
pnpm run pack:mac    # macOS
pnpm run pack:linux  # Linux
\`\`\`

## 集成的功能

### 1. 系统托盘
- 支持最小化到托盘
- 快速菜单访问
- 点击托盘图标显示/隐藏窗口

### 2. 全局快捷键
- 主进程注册全局快捷键
- 通过 IPC 通信触发应用事件

### 3. 系统通知
- 播放控制通知
- 应用事件通知

### 4. 上下文菜单
- 托盘右键菜单
- 自定义菜单项

## 技术栈

- **框架**: Vue 3.5.0
- **构建工具**: Electron-Vite + Vite 8
- **编程语言**: TypeScript 6.0
- **UI 框架**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **Electron**: 31.0
- **Electron Builder**: 25.0

## 下一步

1. 迁移原有音乐播放器的完整功能
2. 连接 Netease 云音乐 API
3. 实现本地音乐库管理
4. 添加更多原生功能集成

## 许可证

MIT
