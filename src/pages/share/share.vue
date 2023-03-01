<template>
    <view class="container share">
        <image
            src="https://dsxmanager.huoyuanyouxuan.com/profile/upload/webImage/share-poster.png"
            class="poster-img"
            mode="widthFix"
        >
        </image>
        <image src="@/assets/imgs/code.png" class="code-img" mode="widthFix"></image>
        <!-- <button class="share-btn">马上分享</button> -->
        <view class="share-code font-middle" @tap="copyToClipboard(user.inviteCode)"
            >您的邀请码：{{ user.inviteCode }}</view
        >
        <button class="share-btn" @tap="shareToggle">
            <text class="button-text">马上分享</text>
        </button>
        <uni-popup ref="sharePop" type="share" safeArea backgroundColor="#fff">
            <view class="popup flex-column-center">
                <text class="title">请选择分享至</text>
                <view class="share-content">
                    <view class="item flex-column-center">
                        <image src="@/assets/share/weixin.png" class="item-img" mode="widthFix"></image>
                        <view class="item-text">微信</view>
                    </view>
                    <view class="item flex-column-center">
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
const sharePop = ref<any>(null);
function copyToClipboard(text: string) {
    uni.setClipboardData({
        data: text
    });
}
function shareToggle() {
    sharePop.value.open();
}
function close() {
    sharePop.value.close();
}
//分享到微信
// uni.share({
//     provider: "weixin",
//     scene: "WXSceneSession",
//     type: 2,
//     imageUrl: "https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png",
//     success: function (res) {
//         console.log("success:" + JSON.stringify(res));
//     },
//     fail: function (err) {
//         console.log("fail:" + JSON.stringify(err));
//     }
// });
//分享到朋友圈
// uni.share({
//     provider: "weixin",
//     scene: "WXSceneTimeline",
//     type: 2,
//     imageUrl: "https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png",
//     success: function (res) {
//         console.log("success:" + JSON.stringify(res));
//     },
//     fail: function (err) {
//         console.log("fail:" + JSON.stringify(err));
//     }
// });
</script>

<style scoped lang="scss">
@import "./share.scss";
</style>
