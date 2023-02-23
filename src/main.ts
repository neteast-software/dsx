import { createSSRApp } from "vue";
import App from "./App.vue";
import uniTransition from "@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue";

export function createApp() {
    const app = createSSRApp(App);
    app.component("uniTransition", uniTransition);
    return {
        app
    };
}
