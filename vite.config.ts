import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
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
    const componentName = file.split(/[/.]/)[2]
    const key = suffix ? `${componentName}_${suffix}` : componentName
    list[key] = `./${file}`
    return list
  }, {})
}

const makeList = (dirPath: string): FileList => {
  return {
    ...generateFilesList(dirPath, '**/index.ts'),
    ...generateFilesList(dirPath, '**/index.css', 'style'),
    ...generateFilesList(dirPath, '**/style.css', 'style'),
    ...generateFilesList(dirPath, '**/types.ts', 'types')
  }
}

const list = makeList(COMPONENTS_DIR)
// console.log(list)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), eslint()],
  build: {
    rollupOptions: {
      input: list,
      external: [
        'vue',
        '@popperjs/core',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome'
      ],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModules: true, // 保留原来目录结构
          preserveModulesRoot: '.',
          assetFileNames: '[name][extname]'
        },
        {
          format: 'commonjs',
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: '.',
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./components', import.meta.url))
    }
  }
})
