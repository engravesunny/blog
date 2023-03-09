import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
// import postCssPxToRem from 'postcss-pxtorem'  //移动端适配

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  // 移动端适配
  // css: {
  //   postcss: {
  //     plugins: [
  //       postCssPxToRem({
  //         rootValue: 37.5, // 1rem的大小
  //         propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
  //       })
  //     ]
  //   }
  // },
  server:{
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://47.93.87.206:3000/',
        // target就是你要访问的目标地址，可以是基础地址，这样方便在这个网站的其他api口调用数据
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // 要记得加rewrite这句
      },
    },
    // proxy: {
    //   '/api': {
    //     target: 'https://baidu.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue','vue-router'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),

    Components({
      resolvers: [
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Inspect(),
  ],
})
