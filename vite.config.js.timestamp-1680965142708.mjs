// vite.config.js
import path from "path";
import { defineConfig } from "file:///E:/Front_Web/github/newnewBlog/node_modules/vite/dist/node/index.js";
import Vue from "file:///E:/Front_Web/github/newnewBlog/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/Front_Web/github/newnewBlog/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/Front_Web/github/newnewBlog/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///E:/Front_Web/github/newnewBlog/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Inspect from "file:///E:/Front_Web/github/newnewBlog/node_modules/vite-plugin-inspect/dist/index.mjs";
import postcssPresetEnv from "file:///E:/Front_Web/github/newnewBlog/node_modules/.store/postcss-preset-env@8.0.1/node_modules/postcss-preset-env/dist/index.mjs";
import postCssPxToRem from "file:///E:/Front_Web/github/newnewBlog/node_modules/postcss-pxtorem/index.js";
import { prismjsPlugin } from "file:///E:/Front_Web/github/newnewBlog/node_modules/.store/vite-plugin-prismjs@0.0.8/node_modules/vite-plugin-prismjs/dist/index.js";
import CompressionPlugin from "file:///E:/Front_Web/github/newnewBlog/node_modules/.store/vite-plugin-compression@0.5.1/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\Front_Web\\github\\newnewBlog";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  base: "./",
  server: {
    port: 4e3,
    proxy: {
      "/api": {
        target: "http://kecat.top/",
        // target就是你要访问的目标地址，可以是基础地址，这样方便在这个网站的其他api口调用数据
        ws: true,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
        // 要记得加rewrite这句
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
      },
      rootValue: {
        mobile: "var(--root-value-mobile)",
        desktop: "var(--root-value-desktop)"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxGcm9udF9XZWJcXFxcZ2l0aHViXFxcXG5ld25ld0Jsb2dcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXEZyb250X1dlYlxcXFxnaXRodWJcXFxcbmV3bmV3QmxvZ1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovRnJvbnRfV2ViL2dpdGh1Yi9uZXduZXdCbG9nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQgcG9zdGNzc1ByZXNldEVudiBmcm9tICdwb3N0Y3NzLXByZXNldC1lbnYnO1xuaW1wb3J0IHBvc3RDc3NQeFRvUmVtIGZyb20gJ3Bvc3Rjc3MtcHh0b3JlbSc7XG5pbXBvcnQgeyBwcmlzbWpzUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tcHJpc21qcydcbmltcG9ydCBDb21wcmVzc2lvblBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTonLi8nLFxuICBzZXJ2ZXI6e1xuICAgIHBvcnQ6IDQwMDAsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8va2VjYXQudG9wLycsXG4gICAgICAgIC8vIHRhcmdldFx1NUMzMVx1NjYyRlx1NEY2MFx1ODk4MVx1OEJCRlx1OTVFRVx1NzY4NFx1NzZFRVx1NjgwN1x1NTczMFx1NTc0MFx1RkYwQ1x1NTNFRlx1NEVFNVx1NjYyRlx1NTdGQVx1Nzg0MFx1NTczMFx1NTc0MFx1RkYwQ1x1OEZEOVx1NjgzN1x1NjVCOVx1NEZCRlx1NTcyOFx1OEZEOVx1NEUyQVx1N0Y1MVx1N0FEOVx1NzY4NFx1NTE3Nlx1NEVENmFwaVx1NTNFM1x1OEMwM1x1NzUyOFx1NjU3MFx1NjM2RVxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICAvLyBcdTg5ODFcdThCQjBcdTVGOTdcdTUyQTByZXdyaXRlXHU4RkQ5XHU1M0U1XG4gICAgICB9LFxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGhTcmMsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBwbHVnaW5zOiBbXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcG9zdGNzc1ByZXNldEVudih7XG4gICAgICBzdGFnZTogMywgXG4gICAgICBmZWF0dXJlczoge1xuICAgICAgICAnY3VzdG9tLXByb3BlcnRpZXMnOiB7XG4gICAgICAgICAgcHJlc2VydmU6IGZhbHNlLCBcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcG9zdENzc1B4VG9SZW0oe1xuICAgICAgcHJvcExpc3Q6IFsnKiddLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHNlbGVjdG9yQmxhY2tMaXN0OiBbJ2h0bWwnXSxcbiAgICAgIG1lZGlhUXVlcnk6IHRydWUsXG4gICAgICBtaW5QaXhlbFZhbHVlOiAwLFxuICAgICAgcm9vdFZhbHVlOiB7XG4gICAgICAgIG1vYmlsZTogMzcuNSxcbiAgICAgICAgZGVza3RvcDogMTYwLFxuICAgICAgfSxcbiAgICAgIHJvb3RWYWx1ZToge1xuICAgICAgICBtb2JpbGU6ICd2YXIoLS1yb290LXZhbHVlLW1vYmlsZSknLFxuICAgICAgICBkZXNrdG9wOiAndmFyKC0tcm9vdC12YWx1ZS1kZXNrdG9wKScsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIENvbXByZXNzaW9uUGx1Z2luKHtcbiAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgIGV4dDogJy5icicsXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQwLCAvLyAxMEtCXG4gICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZSxcbiAgICAgIGluY2x1ZGU6IC9cXC4oanN8Y3NzfGh0bWx8anNvbnxzdmd8dnVlKSQvXG4gICAgfSksXG4gICAgcHJpc21qc1BsdWdpbih7XG5cdFx0XHRsYW5ndWFnZXM6IFsnamF2YXNjcmlwdCcsJ2NzcycsJ2xlc3MnLCdodG1sJywnanMnLCd0eXBlc2NyaXB0JywndHMnXSxcbiAgICAgIGRlZmF1bHRMYW5ndWFnZTogJ2phdmFzY3JpcHQnLFxuXHRcdFx0Ly8gXHU5MTREXHU3RjZFXHU4ODRDXHU1M0Y3XHU2M0QyXHU0RUY2XG5cdFx0XHRwbHVnaW5zOiBbJ2xpbmUtbnVtYmVycycsJ3Nob3ctbGFuZ3VhZ2UnLCdpbmxpbmUtY29sb3InLCdwcmV2aWV3ZXJzJywndG9vbGJhcicsJ2NvcHktdG8tY2xpcGJvYXJkJywnbWF0Y2gtYnJhY2VzJ10sXG5cdFx0XHQvLyBcdTRFM0JcdTk4OThcdTU0MERcblx0XHRcdHRoZW1lOiAndG9tb3Jyb3cnLFxuXHRcdFx0Y3NzOiB0cnVlXG5cdFx0fSksXG4gICAgVnVlKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICAvLyBBdXRvIGltcG9ydCBmdW5jdGlvbnMgZnJvbSBWdWUsIGUuZy4gcmVmLCByZWFjdGl2ZSwgdG9SZWYuLi5cbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBWdWUgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBcmVmLCByZWFjdGl2ZSwgdG9SZWYgXHU3QjQ5XG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsJ3Z1ZS1yb3V0ZXInXSxcblxuICAgICAgLy8gQXV0byBpbXBvcnQgZnVuY3Rpb25zIGZyb20gRWxlbWVudCBQbHVzLCBlLmcuIEVsTWVzc2FnZSwgRWxNZXNzYWdlQm94Li4uICh3aXRoIHN0eWxlKVxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFFbE1lc3NhZ2UsIEVsTWVzc2FnZUJveC4uLiAoXHU1RTI2XHU2ODM3XHU1RjBGKVxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICAgIF0sXG5cbiAgICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsICdhdXRvLWltcG9ydHMuZC50cycpLFxuICAgIH0pLFxuXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgLy8gQXV0byByZWdpc3RlciBFbGVtZW50IFBsdXMgY29tcG9uZW50c1xuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1N0VDNFx1NEVGNlxuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgICBdLFxuXG4gICAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoU3JjLCAnY29tcG9uZW50cy5kLnRzJyksXG4gICAgfSksXG4gICAgSW5zcGVjdCgpLFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1IsT0FBTyxVQUFVO0FBQ3JTLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxvQkFBb0I7QUFDM0IsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyx1QkFBdUI7QUFWOUIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBRTdDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQUs7QUFBQSxFQUNMLFFBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQTtBQUFBLFFBRVIsSUFBSTtBQUFBLFFBQ0osY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUE7QUFBQSxNQUU5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxpQkFBaUI7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxRQUNSLHFCQUFxQjtBQUFBLFVBQ25CLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEdBQUc7QUFBQSxNQUNkLFNBQVM7QUFBQSxNQUNULG1CQUFtQixDQUFDLE1BQU07QUFBQSxNQUMxQixZQUFZO0FBQUEsTUFDWixlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsV0FBVztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGtCQUFrQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLEtBQUs7QUFBQSxNQUNMLFdBQVc7QUFBQTtBQUFBLE1BQ1gsa0JBQWtCO0FBQUEsTUFDbEIsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLE1BQ2YsV0FBVyxDQUFDLGNBQWEsT0FBTSxRQUFPLFFBQU8sTUFBSyxjQUFhLElBQUk7QUFBQSxNQUNoRSxpQkFBaUI7QUFBQTtBQUFBLE1BRXBCLFNBQVMsQ0FBQyxnQkFBZSxpQkFBZ0IsZ0JBQWUsY0FBYSxXQUFVLHFCQUFvQixjQUFjO0FBQUE7QUFBQSxNQUVqSCxPQUFPO0FBQUEsTUFDUCxLQUFLO0FBQUEsSUFDTixDQUFDO0FBQUEsSUFDQyxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUE7QUFBQTtBQUFBLE1BR1QsU0FBUyxDQUFDLE9BQU0sWUFBWTtBQUFBO0FBQUE7QUFBQSxNQUk1QixXQUFXO0FBQUEsUUFDVCxvQkFBb0I7QUFBQSxNQUN0QjtBQUFBLE1BRUEsS0FBSyxLQUFLLFFBQVEsU0FBUyxtQkFBbUI7QUFBQSxJQUNoRCxDQUFDO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUE7QUFBQTtBQUFBLFFBR1Qsb0JBQW9CO0FBQUEsTUFDdEI7QUFBQSxNQUVBLEtBQUssS0FBSyxRQUFRLFNBQVMsaUJBQWlCO0FBQUEsSUFDOUMsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
