import { createApp } from 'vue'
import { clerkPlugin } from 'vue-clerk/plugin'
import pinia from './store'
import App from './App.vue'
import './assets/font/font.css'
import './assets/icon/iconfont/iconfont.css'
import './style/index.css'
import './style/root.css'
import router from './router'
import 'amfe-flexible'

const app = createApp(App)

app.use(clerkPlugin, {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
})
app.use(router)
app.use(pinia)



app.mount('#app')

