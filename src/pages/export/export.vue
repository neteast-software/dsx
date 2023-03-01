<template>
    <view class="new">
        <!-- 界面1 -->
        <view class="container" v-if="!videoUrl">
            <!-- <image
                class="bj1"
                src="https://dsxmanager.huoyuanyouxuan.com/profile/upload/webImage/bj1.gif"
                mode="widthFix"
                alt=""
            ></image> -->
            <image class="bj1" src="@/static/export/bj1.gif" mode="widthFix" alt=""></image>
            <view class="content1">视频努力导出中{{ progress }}%</view>
            <view class="content2">您的专属视频生成中，请勿离开</view>
            <view class="adContainer" v-if="isAdShow && adList.length">
                <swiper class="swiper-banner" autoplay circular>
                    <swiper-item class="swiper-item" v-for="ad in adList" :key="ad.id">
                        <image :src="ad.image" mode="scaleToFill"></image>
                    </swiper-item>
                </swiper>
                <view class="btn-close" @tap="closeAd">关闭</view>
            </view>
        </view>
        <!-- 界面2 -->
        <view v-else class="wrap">
            <view class="bj2">
                <video class="video" :src="videoUrl" autoplay></video>
            </view>
            <view class="msg flex-between">
                <view class="group">
                    <view class="num">1</view>
                    <view class="">先复制文案</view>
                </view>
                <view class="group">
                    <view class="num">2</view>
                    <view class="">发布到抖音</view>
                </view>
                <view class="group">
                    <view class="num">3</view>
                    <view class="">文案粘贴到抖音</view>
                </view>
            </view>
            <view class="copywriting flex-column-center">
                <view class="write" :selectsble="true" user-select="ture">{{ description }} </view>
                <button class="btn-copy" @click="copyText">复制文案</button>
            </view>
            <button class="btn" @click="publishToDouyin(videoUrl)">发布到抖音</button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getAdList, getProcessVideo } from "@/api/dsx/business";
import { getVideoStats } from "@/api/dyh";
import { Toast } from "@/utils/uniapi";
import { onLoad, onReady, onUnload } from "@dcloudio/uni-app";
import { douyinShareVideos } from "@/utils/douyin";
import { ref } from "vue";
const timer = ref<MaybeNull<NodeJS.Timer>>(null);
const progress = ref(0);
const videoUrl = ref("");
const description = ref("");
onLoad((options) => {
    description.value = options?.description || "";
    initData(options?.id || 0);
});
// 合成视频
let retryCount = 0;
async function initData(id: number) {
    try {
        const { data } = await getProcessVideo(id);
        const { task: taskId, token } = data;
        updateVideoStat(taskId, token);
    } catch (error) {
        if (error !== "retry") return;
        if (retryCount < 10) {
            retryCount++;
            initData(id);
        } else {
            Toast("网络异常，请退出页面重试");
        }
    }
}
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

// 合并到抖音
// const copywriting = ref("");
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

// 广告
const isAdShow = ref(true);
const adList = ref<BannerInfo[]>([]);
function closeAd() {
    isAdShow.value = false;
}
async function initAdList() {
    const { data } = await getAdList();
    adList.value = data;
}
onReady(initAdList);
</script>
<style setup lang="scss">
@import "./export.scss";
</style>
