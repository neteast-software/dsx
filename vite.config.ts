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
});
