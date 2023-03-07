<template>
    <!-- #ifdef MP-WEIXIN -->
    <page-meta page-style="height: 100%;">
        <!-- #endif -->
        <view class="wrap small grey">
            <image class="wrap-bg" src="@/assets/my/bg.png" mode="widthFix"></image>
            <view class="userbar flex-center relative" @tap="toSetting">
                <image v-if="user.avatar" class="avatar" :src="user.avatar" mode="aspectFill"></image>
                <image v-else class="avatar" src="@/assets/imgs/avatar.png" mode="aspectFill"></image>
                <view class="content flex-column-between flex-rest-width">
                    <view class="title">{{ user.nickname || "抖省心" }}</view>
                    <view class="intro">{{ user.mobile || "抖音选品第一平台" }}</view>
                </view>
                <image class="setting" src="@/assets/icons/setting.png" mode="widthFix"></image>
            </view>
            <view class="signbar flex-between relative" @tap="toSign">
                <image class="bg" src="@/assets/imgs/sign-bg.png" mode="aspectFill"></image>
                <view class="flex-center relative">
                    <image class="vip" src="@/assets/icons/vip.png" mode="widthFix"></image>
                    <text class="font-middle">签约管理</text>
                </view>
                <view class="flex-center relative">
                    <text>新增签约账号</text>
                    <image class="arrow" src="@/assets/icons/arrow-fill.png" mode="widhtFix"></image>
                </view>
            </view>
            <view class="tabbar flex-between">
                <view class="tab fan" @tap="toFan">
                    <image class="tab-img" src="@/assets/imgs/fan.png" mode="heightFix"></image>
                    <view class="tab-title">我的粉丝</view>
                    <view class="intro">关注你的人</view>
                </view>
                <view class="tab share" @tap="toShare">
                    <image class="tab-img" src="@/assets/imgs/share.png" mode="heightFix"></image>
                    <view class="tab-title">分享有礼</view>
                    <view class="intro">更多好友来帮您</view>
                </view>
            </view>
            <view class="navlist">
                <view class="nav flex-center" @tap="toIntegral">
                    <image class="nav-icon" src="@/assets/my/token.png" mode="widthFix"></image>
                    <view class="nav-content flex-rest-width">我的积分</view>
                    <uni-icons type="forward" size="20"></uni-icons>
                </view>
                <view class="nav flex-center" @tap="toModify">
                    <image class="nav-icon" src="@/assets/my/password.png" mode="widthFix"></image>
                    <view class="nav-content flex-rest-width">修改密码</view>
                    <uni-icons type="forward" size="20"></uni-icons>
                </view>
                <view class="nav flex-center" @tap="toServiceProtocol">
                    <image class="nav-icon" src="@/assets/my/user.png" mode="widthFix"></image>
                    <view class="nav-content flex-rest-width">用户协议</view>
                    <uni-icons type="forward" size="20"></uni-icons>
                </view>
                <view class="nav flex-center" @tap="toPrivacyProtocol">
                    <image class="nav-icon" src="@/assets/my/privacy.png" mode="widthFix"></image>
                    <view class="nav-content flex-rest-width">隐私协议</view>
                    <uni-icons type="forward" size="20"></uni-icons>
                </view>
                <view class="nav flex-center">
                    <image class="nav-icon" src="@/assets/my/version.png" mode="widthFix"></image>
                    <view class="nav-content flex-rest-width flex-between">
                        <text>当前版本</text>
                        <text class="tip">{{ APP_VERSION }}</text>
                    </view>
                    <uni-icons type="forward" size="20"></uni-icons>
                </view>
                <view class="nav flex-center" @tap="clear">
                    <image class="nav-icon" src="@/assets/my/clear.png" mode="widthFix"></image>
                    <view class="nav-content flex-rest-width flex-between">
                        <text>清除缓存</text>
                        <text class="tip">{{ cache }}</text>
                    </view>
                    <uni-icons type="forward" size="20"></uni-icons>
                </view>
            </view>
        </view>
        <!-- #ifdef MP-WEIXIN -->
    </page-meta>
    <!-- #endif -->
</template>

<script setup lang="ts">
import router from "@/utils/router";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import user from "@/store/user";
import { APP_VERSION } from "@/config/env";
import { Toast } from "@/utils/uniapi";
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getCache, clearCache } from "@/utils/util";
// const defaultAvatar = new URL("@/assets/imgs/avatar.png", import.meta.url).href;
const cache = ref("");

onReady(async () => {
    cache.value = await getCache();
});
async function clear() {
    await clearCache();
    Toast("缓存清理完成");
    cache.value = await getCache();
}
function toSetting() {
    router.push("setting");
}
function toModify() {
    router.push("modify");
}
function toFan() {
    router.push("fan");
}
function toIntegral() {
    router.push("integral");
}
function toPrivacyProtocol() {
    router.push("privacyProtocol");
}
function toServiceProtocol() {
    router.push("serviceProtocol");
}
function toShare() {
    // Toast("功能开发中，敬请期待！");
    router.push("share");
}
function toSign() {
    Toast("功能开发中，敬请期待！");
    // router.push("sign");
}
</script>

<style scoped lang="scss">
@import "./my.scss";
</style>
