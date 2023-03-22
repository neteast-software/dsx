<template>
    <view>
        <status-bar></status-bar>
        <view class="bj">
            <view class="back" @tap="back"><uni-icons class="back-icon" type="back" color="#fff" size="24" /></view>
            <video class="video" :src="videoUrl" autoplay></video>
        </view>
        <view class="wrap small grey">
            <view class="deatil flex-between">
                <view class="flex-column-center">
                    <view class="sale-num">14w+</view>
                    <view class="sale-text">销售</view>
                </view>
                <view class="line"></view>
                <view class="flex-column-center">
                    <view class="sale-num">20w+</view>
                    <view class="sale-text">销售额</view>
                </view>
            </view>
            <view class="item">
                <view class="forward">转发步骤</view>
                <view class="msg flex-between">
                    <view class="group">
                        <view class="num">1</view>
                        <view class="">点击复制</view>
                    </view>
                    <view class="group">
                        <view class="num">2</view>
                        <view class="">发布到抖音</view>
                    </view>
                    <view class="group">
                        <view class="num">3</view>
                        <view class="">粘贴到抖音</view>
                    </view>
                </view>
                <view>产品描述内容</view>
                <view class="copywriting flex-between">
                    <view class="write" :selectsble="true" user-select="ture"
                        >{{ description }} 这样装修才有家的感觉配上这柜子～绝绝子#实用好物 #品质生活 #轻奢衣柜
                        #生活格调</view
                    >
                    <view class="btn-copy flex-center" @click="copyText"
                        ><image class="click-img" src="@/assets/icons/click.png" mode="scaleToFill"></image>复制</view
                    >
                </view>
            </view>
            <!-- #ifdef APP-PLUS -->
            <button class="btn" @click="publishToDouyin(videoUrl)">发布到抖音</button>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <button class="btn" @click="saveToAlbum(videoUrl)">保存到相册</button>
            <!-- #endif -->
        </view>
    </view>
</template>

<script setup lang="ts">
import { getAdList, getProcessVideo } from "@/api/dsx/business";
import { getVideoStats } from "@/api/dyh";
import { saveVideoToAlbum, Toast } from "@/utils/uniapi";
import { onLoad, onReady, onUnload } from "@dcloudio/uni-app";
import { douyinShareVideos } from "@/utils/douyin";
import { ref } from "vue";
import statusBar from "@/components/statusBar.vue";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import router from "@/utils/router";
const timer = ref<MaybeNull<NodeJS.Timer>>(null);
const progress = ref(0);
const videoUrl = ref("");
const description = ref("");
onLoad((options) => {
    description.value = options?.description || "";
    const taskId = options?.taskId || "";
    const token = options?.token || "";
    updateVideoStat(taskId, token);
    // initData(options?.id || 0);
});
async function updateVideoStat(taskId: string, token: string) {
    const { data } = await getVideoStats(taskId, token);
    if (data.status === 5) {
        progress.value = data.data.progress;
    }
    if (data.status === 7) {
        videoUrl.value = data.data.res.fileUrl;
        clearTimer();
        return;
    }
    timer.value = setTimeout(() => {
        updateVideoStat(taskId, token);
    }, 1000);
}
function clearTimer() {
    if (timer.value) {
        clearTimeout(timer.value);
    }
}
onUnload(() => {
    clearTimer();
});
function copyText() {
    // copywriting.value = description.value;
    uni.setClipboardData({
        data: description.value
    });
}
async function publishToDouyin(url) {
    uni.showLoading({
        title: "视频准备中",
        mask: true
    });
    try {
        let ar = url.split("/");
        let filename = ar[ar.length - 1];
        let ff = filename.split(".");
        filename = ff[0] + new Date().getTime() + "." + ff[1];
        let dtask = plus.downloader.createDownload(
            url,
            {
                filename: "_downloads/" + filename
            },
            (d, status) => {
                if (status == 200) {
                    let savePath = plus.io.convertLocalFileSystemURL(d.filename as string);
                    douyinShareVideos([savePath], description.value).then(
                        () => {
                            uni.showToast({
                                title: "分享抖音成功",
                                duration: 2000
                            });
                        },
                        () => {
                            console.log("分享失败");
                        }
                    );
                } else {
                    console.log("下载文件失败");
                }
            }
        );
        dtask.start();
    } finally {
        uni.hideLoading();
    }
}
function saveToAlbum(url: string) {
    saveVideoToAlbum(url)
        .then(() => {
            Toast("保存成功");
        })
        .catch(() => {
            Toast("保存失败");
        });
}
function back() {
    router.back();
}
</script>
<style></style>
<style scoped lang="scss">
@import "./videoPreview.scss";
</style>
