<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { wxLogin } from "./weapp/utils";
onLaunch(() => {
    wxLogin().then((res) => {
        console.log("wxLogin", res);
    });
});
onShow(() => {
    // user.initUserInfo();
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});
</script>
<style>
page {
    height: 100%;
    background-color: #fff;
}
</style>
