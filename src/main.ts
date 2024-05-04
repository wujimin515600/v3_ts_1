import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import * as antdIcons from '@ant-design/icons-vue'

import App from './App.vue'
import router from './router'
// import { setPageGuard } from './router/guard'

const app = createApp(App)
const store = createPinia()

Object.keys(antdIcons).forEach((key: any) => {
  app.component(key, antdIcons[key as keyof typeof antdIcons])
})
// 添加到全局
app.config.globalProperties.$antdIcons = antdIcons

store.use(persist)
app.use(store)

app.use(router)
app.mount('#app')
