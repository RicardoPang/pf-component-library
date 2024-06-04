import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 支持 Vue 单文件
import svg from 'vite-svg-loader' // 支持 SVG 文件
import glob from 'glob'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// 动态生成入口文件列表
async function makeList(dirPath) {
  const tsFiles = glob.sync(`${dirPath}/**/*.ts`)
  const lessFiles = glob.sync(`${dirPath}/**/*.less`)
  const list = {}
  for (const file of tsFiles) {
    const component = file.split(/[/.]/)[2]
    list[component] = `./${file}`
  }
  for (const file of lessFiles) {
    const component = file.split(/[/.]/)[2]
    list[`${component}_style`] = `./${file}`
  }
  return list
}

const list = await makeList('components')
console.log(list)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svg(),
    dts({
      entryRoot: 'components/lib',
      outDir: 'types',
      include: ['components/lib/**/*.ts', 'components/lib/**/*.vue'],
      exclude: ['vite.config.ts', '**/*.spec.ts']
    }),
    viteStaticCopy({
      // 使用命名导入的插件
      targets: [
        {
          src: 'fonts/*',
          dest: 'fonts'
        }
      ]
    })
  ], // 使用插件
  build: {
    rollupOptions: {
      input: list,
      external: ['vue'], // 外部依赖, 不打包
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModules: true, // 保留原来目录结构
          // explicitly specified when in monorepo
          preserveModulesRoot: '.',
          assetFileNames: '[name][extname]'
        },
        {
          format: 'commonjs',
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          // explicitly specified when in monorepo
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
    sourcemap: true, // 生成源码映射, 便于调试
    emptyOutDir: false, // 构件式不清空输出目录
    cssCodeSplit: true // 开启 CSS 代码拆分
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./components', import.meta.url))
    }
  }
})
