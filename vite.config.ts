import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'node:path'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  //获取各种环境下的对应的变量
  const env = loadEnv(mode, process.cwd())
  console.log('mode', mode, env)
  return {
    base: env.VITE_PUBLIC_PATH, // 这里设置部署根目录
    // build: {
    //   assetsInlineLimit: 0, // 禁止内联任何静态资源
    // },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock', // 设置模拟数据的文件夹路径
        ignore: /^_/, // 忽略下划线开头的文件
        watchFiles: true, // 监听文件内容变更
        localEnabled: true,
        prodEnabled: true,
        logger: true,
        injectCode: `
        import { setupProdMockServer } from '../mockProdServer';
        setupProdMockServer();
      `,
        injectFile: resolve('src/main.ts')
      }),
      VueDevTools(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
