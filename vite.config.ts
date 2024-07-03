import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'glob'

// 组件目录
const COMPONENTS_DIR = 'components'
// 文件列表
type FileList = Record<string, string>
// 生成文件列表
const generateFilesList = (
  dirPath: string,
  pattern: string,
  suffix: string = ''
): FileList => {
  const files = glob.sync(`${dirPath}/${pattern}`)
  return files.reduce<FileList>((list, file) => {
    if (file.includes('.test.')) return list // 排除测试文件
    const componentName = file.split(/[/.]/)[2]
    const key = suffix ? `${componentName}_${suffix}` : componentName
    list[key] = `./${file}`
    return list
  }, {})
}
const makeList = (): FileList => {
  const cssDir = `${COMPONENTS_DIR}/css`
  const libDir = `${COMPONENTS_DIR}/lib`
  return {
    // 读取 css 目录下的 index.css
    index_style: `./${cssDir}/index.css`,
    // 读取 lib 目录下每个组件的 index.ts 文件
    ...generateFilesList(libDir, '**/index.ts'),
    // 读取 lib 目录下每个组件的 style.css 文件
    ...generateFilesList(libDir, '**/style.css', 'style')
  }
}
const list = makeList()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    rollupOptions: {
      input: list, // 入口文件
      external: [
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator',
        'axios',
        'lodash-es',
        'normalize.css',
        'vue',
        'vue-router'
      ],
      output: [
        {
          format: 'es', // 输出格式为 ES 模块
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModules: true, // 保留原来目录结构
          preserveModulesRoot: `${COMPONENTS_DIR}/lib`,
          assetFileNames: '[name][extname]'
        },
        {
          format: 'commonjs', // 输出格式为 CommonJS 模块
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: `${COMPONENTS_DIR}/lib`,
          assetFileNames: '[name][extname]'
        },
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs', // 输出单文件
          assetFileNames: '[name][extname]'
        },
        {
          format: 'commonjs',
          dir: 'dist',
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]'
        }
      ],
      preserveEntrySignatures: 'strict' // 保留入口签名
    },
    sourcemap: true, // 生成 source map，对应到具体代码
    emptyOutDir: false
  },
  server: {
    proxy: {
      // 服务代理
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
