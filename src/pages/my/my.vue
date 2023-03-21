<template>
    <!-- #ifdef MP-WEIXIN -->
    <page-meta page-style="height: 100%;">
        <!-- #endif -->
        <view class="wrap small grey">
            <image class="wrap-bg" src="@/assets/my/bg.png" mode="widthFix"></image>
            <view :style="{ height: statusBarHeight + 'px' }"></view>
            <!-- #ifdef APP-PLUS -->
            <view class="setting-app" @tap="toSetting">
                <image class="setting-img" src="@/assets/icons/setting.png" mode="widthFix"></image
            ></view>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <view class="setting" @tap="toSetting">
                <image class="setting-img" src="@/assets/icons/setting.png" mode="widthFix"></image
            ></view>
            <!-- #endif -->
            <view class="userbar flex-center relative">
                <view class="flex-center" @tap="toSetting">
                    <image v-if="user.avatar" class="avatar" :src="user.avatar" mode="aspectFill"></image>
                    <image v-else class="avatar" src="@/assets/imgs/avatar.png" mode="aspectFill"></image>
                    <view class="content flex-column-between flex-rest-width">
                        <view class="title">{{ user.nickname || "抖省心" }}</view>
                        <view class="intro">{{ user.mobile || "抖音选品第一平台" }}</view>
                    </view>
                </view>
                <view class="flex-column-center integral" @tap.stop="toIntegral">
                    <view class="integral-item flex-center">
                        <image class="heart-img" src="@/assets/imgs/heart-circle.png" mode="scaleToFill"></image>
                        <view>{{ user.integral }}</view>
                    </view>
                    <text class="">可用积分</text>
                </view>
            </view>
            <view class="signbar flex-between relative" @tap="showApply">
                <image class="bg" src="@/assets/imgs/sign-bg.png" mode="aspectFill"></image>
                <view class="flex-center relative">
                    <image class="vip" src="@/assets/icons/vip.png" mode="widthFix"></image>
                    <text class="font-middle">签约管理</text>
                </view>
                <view class="flex-center relative" v-if="user.agencyStatus == '0'">
                    <text>新增签约账号</text>
                    <image class="arrow" src="@/assets/icons/arrow-fill.png" mode="widhtFix"></image>
                </view>
                <view class="date relative" v-else-if="user.agencyStatus == '1'">申请签约中</view>
                <view class="date relative" v-else>签约日期: {{ user.agencyTime.substring(0, 10) }}</view>
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
            <uni-popup type="center" ref="apply">
                <view class="apply">
                    <image class="apply-img" src="@/assets/imgs/fly.png" mode="scaleToFill"></image>
                    <uni-icons class="apply-close" type="close" color="#FFFFFF" size="30" @tap="closeApply" />
                    <view class="flex-column-center">
                        <view class="apply-title">签约申请</view>
                        <view class="apply-text">
                            签约申请申请绑定抖省心签约达人,获得更多商家扶持,申请绑定后请耐心等待,客服人员将在1-3个工作日内联系您
                        </view>
                        <button class="apply-btn" @tap="signConfirm">发起申请</button>
                    </view>
                </view>
            </uni-popup>
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
import { onReady, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getCache, clearCache } from "@/utils/util";
import { statusBarHeight } from "@/utils/systemInfo";
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { doApply } from "@/api/dsx/business";
// import NavBar from "@/components/navBar.vue";
// const defaultAvatar = new URL("@/assets/imgs/avatar.png", import.meta.url).href;
const cache = ref("");
const apply = ref<any>(null);
onReady(async () => {
    cache.value = await getCache();
});
onShow(() => {
    user.initUserInfo();
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
// function toSign() {
//     Toast("功能开发中，敬请期待！");
//     // router.push("sign");
// }
function showApply() {
    if (!apply.value) return;
    if (user.agencyStatus == "0") {
        apply.value.open();
    } else if (user.agencyStatus == "1") {
        toSignSuccess();
    } else if (user.agencyStatus == "2") {
        Toast("当前帐号已成功完成签约");
    }
}
function closeApply() {
    if (!apply.value) return;
    apply.value.close();
}
function toSignSuccess() {
    router.push("signSuccess");
}
async function signConfirm() {
    //发起请求
    await doApply();
    closeApply();
    toSignSuccess();
}
</script>

<style scoped lang="scss">
@import "./my.scss";
</style>
