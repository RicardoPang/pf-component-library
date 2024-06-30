import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'glob'

const COMPONENTS_DIR = 'components'

type FileList = Record<string, string>

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
      input: list,
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@element-plus/icons-vue',
        '@popperjs/core',
        'async-validator',
        'axios',
        'lodash-es',
        'element-plus',
        'normalize.css',
        'vue-router'
      ],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModules: true, // 保留原来目录结构
          preserveModulesRoot: `${COMPONENTS_DIR}/lib`,
          assetFileNames: '[name][extname]'
        },
        {
          format: 'commonjs',
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
      preserveEntrySignatures: 'strict'
    },
    sourcemap: true, // 对应到具体代码
    emptyOutDir: false
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3050',
        changeOrigin: true
      },
      '/static': {
        target: 'http://localhost:3050',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/static/, '')
      }
    }
  }
})
