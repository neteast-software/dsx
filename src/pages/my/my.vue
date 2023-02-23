<template>
    <view class="wrap small grey">
        <image class="wrap-bg" src="@/assets/my/bg.png" mode="widthFix"></image>
        <view class="userbar flex-center">
            <image class="avatar" src="@/assets/imgs/avatar.png" mode="aspectFill"></image>
            <view class="content flex-column-between flex-rest-width">
                <view class="title">抖省心</view>
                <view class="intro">抖音选品第一平台</view>
            </view>
            <image class="setting" src="@/assets/icons/setting.png" mode="widthFix"></image>
        </view>
        <view class="signbar flex-between relative">
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
            <view class="tab fan">
                <image class="tab-img" src="@/assets/imgs/fan.png" mode="heightFix"></image>
                <view class="tab-title">我的粉丝</view>
                <view class="intro">关注你的人</view>
            </view>
            <view class="tab share">
                <image class="tab-img" src="@/assets/imgs/share.png" mode="heightFix"></image>
                <view class="tab-title">分享有礼</view>
                <view class="intro">更多好友来帮您</view>
            </view>
        </view>
        <view class="navlist">
            <view class="nav flex-center">
                <image class="nav-icon" src="@/assets/my/token.png" mode="widthFix"></image>
                <view class="nav-content flex-rest-width">我的积分</view>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
            <view class="nav flex-center">
                <image class="nav-icon" src="@/assets/my/password.png" mode="widthFix"></image>
                <view class="nav-content flex-rest-width">修改密码</view>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
            <view class="nav flex-center">
                <image class="nav-icon" src="@/assets/my/user.png" mode="widthFix"></image>
                <view class="nav-content flex-rest-width">用户协议</view>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
            <view class="nav flex-center">
                <image class="nav-icon" src="@/assets/my/privacy.png" mode="widthFix"></image>
                <view class="nav-content flex-rest-width">隐私协议</view>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
            <view class="nav flex-center">
                <image class="nav-icon" src="@/assets/my/version.png" mode="widthFix"></image>
                <view class="nav-content flex-rest-width flex-between">
                    <text>当前版本</text>
                    <text class="tip">1.2.10</text>
                </view>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
            <view class="nav flex-center">
                <image class="nav-icon" src="@/assets/my/clear.png" mode="widthFix"></image>
                <view class="nav-content flex-rest-width flex-between">
                    <text>清除缓存</text>
                    <text class="tip">5.8M</text>
                </view>
                <uni-icons type="forward" size="20"></uni-icons>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
</script>

<style scoped lang="scss">
@import "./my.scss";
</style>
