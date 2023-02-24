<template>
    <view class="wrap small grey pt-60">
        <view class="setting-list">
            <view class="setting flex-between" @tap="showDrawer">
                <text class="font-middle">修改昵称</text>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
            <view class="setting flex-between" @tap="changeAvatar">
                <text class="font-middle">修改头像</text>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
            <view class="setting flex-between" @tap="showDialog">
                <text class="font-middle">注销账号</text>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
        </view>
        <button class="logout font-middle" @tap="logout">退出登录</button>
    </view>
    <uni-popup ref="drawer" type="bottom">
        <view class="drawer">
            <view class="drawer-title">修改昵称</view>
            <view class="drawer-input">
                <input type="text" v-model="nickname" maxlength="20" placeholder="请输入昵称" />
            </view>
            <view class="btn-wrap">
                <button v-if="nickname" class="btn confirm font-middle" @tap="changeNickname(nickname)">确定</button>
                <button v-else class="btn cancel font-middle" @tap="closeDrawer">取消</button>
            </view>
        </view>
    </uni-popup>
    <uni-popup ref="logoffDialog" type="center">
        <view class="dialog">
            <view class="dialog-upper">
                <view class="content"> 您是否确认要注销账号？</view>
                <view class="content">确认请输入“我确认” </view>
                <input v-model="logoffText" class="input" type="text" />
            </view>
            <view class="dialog-lower">
                <button class="btn cancel" @tap="closeDialog">取消</button>
                <button class="btn confirm" @tap="logoff">确定</button>
            </view>
        </view>
    </uni-popup>
</template>

<script setup lang="ts">
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { ref } from "vue";
import { chooseImageByAlbum, showModal, Toast } from "@/utils/uniapi";
import { uploadFile } from "@/api/dsx/root";
import { updateUserInfo, logOut, logOff } from "@/api/dsx/user";
import router from "@/utils/router";
import storage from "@/utils/storage";
import user from "@/store/user";
// 修改昵称
const nickname = ref("");
const drawer = ref<any>(null);
function showDrawer() {
    if (!drawer.value) return;
    drawer.value.open();
}
function closeDrawer() {
    if (!drawer.value) return;
    drawer.value.close();
}
function resetNickname() {
    nickname.value = "";
}
async function changeNickname(nickname: string) {
    await updateUserInfo({ nickname });
    Toast.success("修改成功");
    closeDrawer();
    resetNickname();
    user.initUserInfo();
}
// 修改头像
async function changeAvatar() {
    const { tempFilePaths } = await chooseImageByAlbum();
    const { fileName: avatar } = await uploadFile(tempFilePaths[0]);
    await updateUserInfo({ avatar });
    Toast.success("修改成功");
    user.initUserInfo();
}

// 注销账号
const logoffDialog = ref<any>(null);
const logoffText = ref("");
function showDialog() {
    if (!logoffDialog.value) return;
    logoffDialog.value.open();
}
function closeDialog() {
    if (!logoffDialog.value) return;
    logoffDialog.value.close();
}
async function logoff() {
    if (logoffText.value !== "我确认") return Toast("输入错误");
    await logOff();
    storage.remove("token");
    router.reLaunch("login");
}
// 退出登录
async function logout() {
    await showModal("", "确定退出登录吗？", "#F03737");
    await logOut();
    storage.remove("token");
    router.reLaunch("login");
}
</script>

<style scoped lang="scss">
@import "./setting.scss";
</style>
