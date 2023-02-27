import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";
const pathResolve = (dir: string) => `${resolve(__dirname, dir)}/`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    resolve: {
        alias: {
            "@/": pathResolve("src"),
            "@utils/": pathResolve("src/utils"),
            "@components/": pathResolve("src/components"),
            "@styles/": pathResolve("src/styles")
        }
    },
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `
    //             @use "@/styles/var.scss" as *;
    //             @use "@/styles/common.scss" as *;
    //             `
    //         }
    //     }
    // }
    server: {
        cors: true,
        proxy: {
            "http://192.168.3.106:8080": {
                target: "http://192.168.3.106:8080",
                changeOrigin: true,
                secure: false
                // rewrite: (path) => path.replace(/^\/api/, "")
            },
            "https://service.dyhculture.com": {
                target: "https://service.dyhculture.com",
                changeOrigin: true,
                secure: false
            },
            "http://apidsx.huoyuanyouxuan.com": {
                target: "http://apidsx.huoyuanyouxuan.com",
                changeOrigin: true,
                secure: false
            }
        }
    }
});
