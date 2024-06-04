import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 支持 Vue 单文件
import svg from 'vite-svg-loader' // 支持 SVG 文件
import glob from 'glob'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// 常量
const COMPONENTS_DIR = 'components'
const TYPES_DIR = 'types'
const LIB_DIR = 'components/lib'
const FONTS_DIR = 'fonts'

// 生成 TypeScript 文件列表
async function generateTsFilesList(dirPath) {
  const tsFiles = glob.sync(`${dirPath}/**/*.ts`)
  const list = {}
  for (const file of tsFiles) {
    const component = file.split(/[/.]/)[2]
    list[component] = `./${file}`
  }
  return list
}

// 生成 LESS 文件列表
async function generateLessFilesList(dirPath) {
  const lessFiles = glob.sync(`${dirPath}/**/*.less`)
  const list = {}
  for (const file of lessFiles) {
    const component = file.split(/[/.]/)[2]
    list[`${component}_style`] = `./${file}`
  }
  return list
}

// 动态生成入口文件列表
async function makeList(dirPath) {
  try {
    const tsFilesList = await generateTsFilesList(dirPath)
    const lessFilesList = await generateLessFilesList(dirPath)
    return { ...tsFilesList, ...lessFilesList }
  } catch (error) {
    console.error('Error generating file lists:', error)
    return {}
  }
}

const list = await makeList(COMPONENTS_DIR)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svg(),
    dts({
      entryRoot: LIB_DIR,
      outDir: TYPES_DIR,
      include: [`${LIB_DIR}/**/*.ts`, `${LIB_DIR}/**/*.vue`],
      exclude: ['vite.config.ts', '**/*.spec.ts']
    }),
    viteStaticCopy({
      targets: [
        {
          src: `${FONTS_DIR}/*`,
          dest: FONTS_DIR
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: list,
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModules: true,
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
          entryFileNames: '[name].mjs',
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
    sourcemap: true,
    emptyOutDir: false,
    cssCodeSplit: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(`./${COMPONENTS_DIR}`, import.meta.url))
    }
  }
})
