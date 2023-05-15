<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import user from "./store/user";
onLaunch(() => {
    console.log("App Launch");
    user.initUserInfo();
});
onShow(() => {
    // user.initUserInfo();
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});
</script>
<style lang="scss">
page {
    height: 100%;
    background-color: #fff;
    color: $uni-text-color;
}
</style>
