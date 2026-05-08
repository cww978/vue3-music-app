import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 仅用于命令行构建的配置
export default {
  plugins: [vue(), vueJsx()]
}
