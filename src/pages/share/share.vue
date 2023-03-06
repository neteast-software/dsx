<template>
    <view class="container share">
        <image :src="shareImg" class="poster-img" mode="widthFix"> </image>
        <image src="@/assets/imgs/code.png" class="code-img" mode="widthFix"></image>
        <!-- <button class="share-btn">马上分享</button> -->
        <view class="share-code font-middle" @tap="copyToClipboard(user.inviteCode)"
            >点击复制您的邀请码：{{ user.inviteCode }}</view
        >
        <button class="share-btn" @tap="shareToggle">
            <text class="button-text">马上分享</text>
        </button>
        <uni-popup ref="sharePop" type="share" safeArea backgroundColor="#fff">
            <view class="popup flex-column-center">
                <text class="title">请选择分享至</text>
                <view class="share-content">
                    <view class="item flex-column-center" @tap="shareToFriends(shareImg)">
                        <image src="@/assets/share/weixin.png" class="item-img" mode="widthFix"></image>
                        <view class="item-text">微信</view>
                    </view>
                    <view class="item flex-column-center" @tap="shareToTimeline(shareImg)">
                        <image src="@/assets/share/Moments.png" class="item-img" mode="widthFix"></image>
                        <view class="item-text">朋友圈</view>
                    </view>
                </view>
                <button class="cancel-btn" @tap="close">取消</button>
            </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
import { ref } from "vue";
import user from "@/store/user";
import { shareToWechat } from "@/utils/uniapi";
import { onReady } from "@dcloudio/uni-app";
import { getShareImg } from "@/api/dsx/business";
const sharePop = ref<any>(null);
function copyToClipboard(text: string) {
    uni.setClipboardData({
        data: text
    });
}
function shareToggle() {
    // #ifdef APP-PLUS
    sharePop.value.open();
    // #endif
    // #ifdef MP-WEIXIN
    shareToFriends(shareImg.value);
    // #endif
}
function close() {
    sharePop.value.close();
}
const shareImg = ref("");
async function initShare() {
    const { data } = await getShareImg();
    shareImg.value = data;
}
onReady(initShare);
//分享到微信
function shareToFriends(url: string) {
    // #ifdef APP-PLUS
    shareToWechat(url);
    // #endif
    // #ifdef MP-WEIXIN
    uni.downloadFile({
        url,
        success: (res) => {
            uni.showShareImageMenu({
                path: res.tempFilePath,
                success: (res) => {
                    console.log("success:");
                },
                fail: (err) => {
                    console.log("fail:");
                }
            });
        }
    });
    // #endif
    close();
}
// 分享到朋友圈
function shareToTimeline(url: string) {
    // #ifdef APP-PLUS
    shareToWechat(url, 2, "WXSceneTimeline");
    // #endif
    close();
}
</script>

<style scoped lang="scss">
@import "./share.scss";
</style>
