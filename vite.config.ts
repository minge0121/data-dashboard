import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/data-dashboard/", // 用于部署，必须添加此行
  plugins: [tailwindcss(), react()], // 插件配置。让 Vite 识别并编译 Tailwind CSS 样式，让 Vite 支持 React（JSX/TSX 热更新、编译）
  resolve: {
    // 控制 Vite 怎么找文件、怎么识别路径。
    alias: {
      // (路径)别名配置
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"], // (文件)扩展名配置。省略导入文件扩展名时，vite自动按顺序识别查找文件
  },
  server: {
    port: 3000,
    // 配置代理解决跨域（开发环境）
    proxy: {
      '/geo': {
        target: 'https://geo.datav.aliyun.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geo/, ''),
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
