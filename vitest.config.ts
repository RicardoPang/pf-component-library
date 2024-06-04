import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue' // 支持 Vue 单文件

export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  resolve: {
    // 优先识别 main，如果没有配置 main，则识别 module
    mainFields: ['main', 'module', 'exports']
  },
  test: {
    globals: true,
    mockReset: false,
    silent: process.env.CI === 'true',
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['cobertura', 'text', 'html', 'clover', 'json']
    }
  }
})
