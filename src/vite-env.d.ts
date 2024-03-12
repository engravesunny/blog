/// <reference types="vite/client" />

interface ImportMetaEnv {
  NODE_ENV: string
  VITE_NAME: string
  VITE_BASE_URL: string
  BASE_URL: string
  VITE_CLERK_PUBLISHABLE_KEY: string
  VITE_QINIU_ACCESS_TOKEN: string
  VITE_QINIU_SECRET_TOKEN: string
  VITE_QINIU_DOMAIN: string
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const vueComponent: DefineComponent<>;
  export default vueComponent;
}

declare module "element-plus/dist/locale/zh-cn.mjs";
declare module "crypto-js"