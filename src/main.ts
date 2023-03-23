import { createSSRApp } from "vue";
import App from "./App.vue";
import uniTransition from "@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
export function createApp() {
    const app = createSSRApp(App);
    app.component("uniTransition", uniTransition);
    app.component("uniIcons", uniIcons);
    return {
        app
    };
}
