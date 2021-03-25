import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

// 路径拼接
function pathResolve(dir: string) {
  return path.resolve(__dirname, dir)
}

export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@':pathResolve('src')
    }
  },
  server: {
    port: 3000,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,  // 开启跨域
        //secure: false,  // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉/api前缀，后端不用加上/api
      },
    },
  },
  css:{
    preprocessorOptions:{
      scss:{
        // additionalData:'@import "./src/assets/style/base.scss";'
      }
    }
  }
})
