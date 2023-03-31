<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
    console.log("App Launch");
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
