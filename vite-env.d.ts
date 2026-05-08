// Vite 环境变量类型提示
declare module 'vite/types/importMeta' {
  interface ImportMeta {
    env: {
      readonly VITE_API_BASE_URL: string
      readonly VITE_DEV: string
    }
  }
}

export {}
