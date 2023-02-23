<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import user from "@/store/user";
onLaunch(() => {
    console.log("App Launch");
    user.initUserInfo();
});
onShow(() => {
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});
</script>
<style></style>
