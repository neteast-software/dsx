<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import user from "@/store/user";
onLaunch(() => {});
onShow(() => {
    user.initUserInfo();
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});
</script>
<style></style>
