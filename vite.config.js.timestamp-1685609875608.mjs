// vite.config.js
import path from "path";
import { defineConfig } from "file:///E:/Front_Web/github/newnewBlog/node_modules/vite/dist/node/index.js";
import Vue from "file:///E:/Front_Web/github/newnewBlog/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/Front_Web/github/newnewBlog/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/Front_Web/github/newnewBlog/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///E:/Front_Web/github/newnewBlog/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Inspect from "file:///E:/Front_Web/github/newnewBlog/node_modules/vite-plugin-inspect/dist/index.mjs";
import postcssPresetEnv from "file:///E:/Front_Web/github/newnewBlog/node_modules/postcss-preset-env/dist/index.mjs";
import postCssPxToRem from "file:///E:/Front_Web/github/newnewBlog/node_modules/postcss-pxtorem/index.js";
import { prismjsPlugin } from "file:///E:/Front_Web/github/newnewBlog/node_modules/vite-plugin-prismjs/dist/index.js";
import CompressionPlugin from "file:///E:/Front_Web/github/newnewBlog/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\Front_Web\\github\\newnewBlog";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  base: "./",
  server: {
    port: 4e3,
    open: true,
    proxy: {
      "/api": {
        target: "http://kecat.top:5000/",
        // target就是你要访问的目标地址，可以是基础地址，这样方便在这个网站的其他api口调用数据
        ws: true,
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // 要记得加rewrite这句
      },
      "/song": {
        target: "https://kecat.top:3000/",
        // target就是你要访问的目标地址，可以是基础地址，这样方便在这个网站的其他api口调用数据
        ws: true,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/song/, "")
        // 要记得加rewrite这句
      },
      "/post": {
        target: "https://kecat.top",
        ws: true,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/post/, "")
      }
    }
  },
  resolve: {
    alias: {
      "@": pathSrc
    }
  },
  build: {
    rollupOptions: {
      plugins: []
    }
  },
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        "custom-properties": {
          preserve: false
        }
      }
    }),
    postCssPxToRem({
      propList: ["*"],
      replace: true,
      selectorBlackList: ["html"],
      mediaQuery: true,
      minPixelValue: 0,
      rootValue: {
        mobile: 37.5,
        desktop: 160
      }
    }),
    CompressionPlugin({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
      // 10KB
      deleteOriginFile: false,
      include: /\.(js|css|html|json|svg|vue)$/
    }),
    prismjsPlugin({
      languages: ["javascript", "css", "less", "html", "js", "typescript", "ts"],
      defaultLanguage: "javascript",
      // 配置行号插件
      plugins: ["line-numbers", "show-language", "inline-color", "previewers", "toolbar", "copy-to-clipboard", "match-braces"],
      // 主题名
      theme: "tomorrow",
      css: true
    }),
    Vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router"],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts")
    }),
    Components({
      resolvers: [
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, "components.d.ts")
    }),
    Inspect()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxGcm9udF9XZWJcXFxcZ2l0aHViXFxcXG5ld25ld0Jsb2dcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXEZyb250X1dlYlxcXFxnaXRodWJcXFxcbmV3bmV3QmxvZ1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovRnJvbnRfV2ViL2dpdGh1Yi9uZXduZXdCbG9nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQgcG9zdGNzc1ByZXNldEVudiBmcm9tICdwb3N0Y3NzLXByZXNldC1lbnYnO1xuaW1wb3J0IHBvc3RDc3NQeFRvUmVtIGZyb20gJ3Bvc3Rjc3MtcHh0b3JlbSc7XG5pbXBvcnQgeyBwcmlzbWpzUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tcHJpc21qcydcbmltcG9ydCBDb21wcmVzc2lvblBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogJy4vJyxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNDAwMCxcbiAgICBvcGVuOiB0cnVlLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2tlY2F0LnRvcDo1MDAwLycsXG4gICAgICAgIC8vIHRhcmdldFx1NUMzMVx1NjYyRlx1NEY2MFx1ODk4MVx1OEJCRlx1OTVFRVx1NzY4NFx1NzZFRVx1NjgwN1x1NTczMFx1NTc0MFx1RkYwQ1x1NTNFRlx1NEVFNVx1NjYyRlx1NTdGQVx1Nzg0MFx1NTczMFx1NTc0MFx1RkYwQ1x1OEZEOVx1NjgzN1x1NjVCOVx1NEZCRlx1NTcyOFx1OEZEOVx1NEUyQVx1N0Y1MVx1N0FEOVx1NzY4NFx1NTE3Nlx1NEVENmFwaVx1NTNFM1x1OEMwM1x1NzUyOFx1NjU3MFx1NjM2RVxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAvLyByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICAvLyBcdTg5ODFcdThCQjBcdTVGOTdcdTUyQTByZXdyaXRlXHU4RkQ5XHU1M0U1XG4gICAgICB9LFxuICAgICAgJy9zb25nJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwczovL2tlY2F0LnRvcDozMDAwLycsXG4gICAgICAgIC8vIHRhcmdldFx1NUMzMVx1NjYyRlx1NEY2MFx1ODk4MVx1OEJCRlx1OTVFRVx1NzY4NFx1NzZFRVx1NjgwN1x1NTczMFx1NTc0MFx1RkYwQ1x1NTNFRlx1NEVFNVx1NjYyRlx1NTdGQVx1Nzg0MFx1NTczMFx1NTc0MFx1RkYwQ1x1OEZEOVx1NjgzN1x1NjVCOVx1NEZCRlx1NTcyOFx1OEZEOVx1NEUyQVx1N0Y1MVx1N0FEOVx1NzY4NFx1NTE3Nlx1NEVENmFwaVx1NTNFM1x1OEMwM1x1NzUyOFx1NjU3MFx1NjM2RVxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvc29uZy8sICcnKSxcbiAgICAgICAgLy8gXHU4OTgxXHU4QkIwXHU1Rjk3XHU1MkEwcmV3cml0ZVx1OEZEOVx1NTNFNVxuICAgICAgfSxcbiAgICAgICcvcG9zdCc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9rZWNhdC50b3AnLFxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvcG9zdC8sICcnKSxcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoU3JjLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgcGx1Z2luczogW10sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHBvc3Rjc3NQcmVzZXRFbnYoe1xuICAgICAgc3RhZ2U6IDMsXG4gICAgICBmZWF0dXJlczoge1xuICAgICAgICAnY3VzdG9tLXByb3BlcnRpZXMnOiB7XG4gICAgICAgICAgcHJlc2VydmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBwb3N0Q3NzUHhUb1JlbSh7XG4gICAgICBwcm9wTGlzdDogWycqJ10sXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgc2VsZWN0b3JCbGFja0xpc3Q6IFsnaHRtbCddLFxuICAgICAgbWVkaWFRdWVyeTogdHJ1ZSxcbiAgICAgIG1pblBpeGVsVmFsdWU6IDAsXG4gICAgICByb290VmFsdWU6IHtcbiAgICAgICAgbW9iaWxlOiAzNy41LFxuICAgICAgICBkZXNrdG9wOiAxNjAsXG4gICAgICB9XG4gICAgfSksXG4gICAgQ29tcHJlc3Npb25QbHVnaW4oe1xuICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgZXh0OiAnLmJyJyxcbiAgICAgIHRocmVzaG9sZDogMTAyNDAsIC8vIDEwS0JcbiAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlLFxuICAgICAgaW5jbHVkZTogL1xcLihqc3xjc3N8aHRtbHxqc29ufHN2Z3x2dWUpJC9cbiAgICB9KSxcbiAgICBwcmlzbWpzUGx1Z2luKHtcbiAgICAgIGxhbmd1YWdlczogWydqYXZhc2NyaXB0JywgJ2NzcycsICdsZXNzJywgJ2h0bWwnLCAnanMnLCAndHlwZXNjcmlwdCcsICd0cyddLFxuICAgICAgZGVmYXVsdExhbmd1YWdlOiAnamF2YXNjcmlwdCcsXG4gICAgICAvLyBcdTkxNERcdTdGNkVcdTg4NENcdTUzRjdcdTYzRDJcdTRFRjZcbiAgICAgIHBsdWdpbnM6IFsnbGluZS1udW1iZXJzJywgJ3Nob3ctbGFuZ3VhZ2UnLCAnaW5saW5lLWNvbG9yJywgJ3ByZXZpZXdlcnMnLCAndG9vbGJhcicsICdjb3B5LXRvLWNsaXBib2FyZCcsICdtYXRjaC1icmFjZXMnXSxcbiAgICAgIC8vIFx1NEUzQlx1OTg5OFx1NTQwRFxuICAgICAgdGhlbWU6ICd0b21vcnJvdycsXG4gICAgICBjc3M6IHRydWVcbiAgICB9KSxcbiAgICBWdWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIC8vIEF1dG8gaW1wb3J0IGZ1bmN0aW9ucyBmcm9tIFZ1ZSwgZS5nLiByZWYsIHJlYWN0aXZlLCB0b1JlZi4uLlxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IFZ1ZSBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFyZWYsIHJlYWN0aXZlLCB0b1JlZiBcdTdCNDlcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSxcblxuICAgICAgLy8gQXV0byBpbXBvcnQgZnVuY3Rpb25zIGZyb20gRWxlbWVudCBQbHVzLCBlLmcuIEVsTWVzc2FnZSwgRWxNZXNzYWdlQm94Li4uICh3aXRoIHN0eWxlKVxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFFbE1lc3NhZ2UsIEVsTWVzc2FnZUJveC4uLiAoXHU1RTI2XHU2ODM3XHU1RjBGKVxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICAgIF0sXG5cbiAgICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsICdhdXRvLWltcG9ydHMuZC50cycpLFxuICAgIH0pLFxuXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgLy8gQXV0byByZWdpc3RlciBFbGVtZW50IFBsdXMgY29tcG9uZW50c1xuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1N0VDNFx1NEVGNlxuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgICBdLFxuXG4gICAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoU3JjLCAnY29tcG9uZW50cy5kLnRzJyksXG4gICAgfSksXG4gICAgSW5zcGVjdCgpLFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1IsT0FBTyxVQUFVO0FBQ3JTLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxvQkFBb0I7QUFDM0IsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyx1QkFBdUI7QUFWOUIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxLQUFL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
