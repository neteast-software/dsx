<template>
    <page-meta page-style="background: #f7f8fa"></page-meta>
    <view class="container">
        <status-bar></status-bar>
        <view class="bj relative">
            <view class="back"><uni-icons @tap="back" class="back-icon" type="back" color="#fff" size="24" /></view>
            <video class="video" :src="videoUrl" autoplay></video>
        </view>
        <view class="wrap small grey flex-rest-height w-full">
            <view class="deatil flex-between">
                <view class="flex-column-center">
                    <view class="sale-num">{{ salesCount || 0 }}</view>
                    <view class="sale-text">销量</view>
                </view>
                <view class="line"></view>
                <view class="flex-column-center">
                    <view class="sale-num">{{ salesTotal || 0 }}</view>
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
                    <view class="write" :selectsble="true" user-select="ture">{{ goodInfo?.description }}</view>
                    <view class="btn-copy flex-center" @click="copyText(goodInfo?.description || '')"
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
import { saveVideoToAlbum, showModal, Toast } from "@/utils/uniapi";
import { onLoad } from "@dcloudio/uni-app";
import { douyinShareVideos } from "@/utils/douyin";
import { ref, computed } from "vue";
import statusBar from "@/components/statusBar.vue";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import router from "@/utils/router";
import { getGoodsDetail } from "@/api/dsx/business";
import { useDebounceFn } from "@vueuse/core";
const timer = ref<MaybeNull<NodeJS.Timer>>(null);
const progress = ref(0);
const videoUrl = ref("");
const description = ref("");
const goodInfo = ref<GoodDetail>();

onLoad((options) => {
    // description.value = options?.description || "";
    // const taskId = options?.taskId || "";
    // const token = options?.token || "";
    videoUrl.value = options?.url || "";
    const goodId = options?.id || "";
    initGoodInfo(goodId);
});
const salesCount = computed(() => {
    const saleCount = goodInfo.value?.saleCount || 0;
    return saleCount > 10000 ? (saleCount / 10000).toFixed(0) + "w+" : saleCount;
});

const salesTotal = computed(() => {
    const saleCount = goodInfo.value?.saleCount || 0;
    const price = goodInfo.value?.price || 0;
    const total = saleCount * price;
    return total > 10000 ? ((saleCount * price) / 10000).toFixed(0) + "w+" : total;
});

async function initGoodInfo(id: string | number) {
    const { data } = await getGoodsDetail(id);
    goodInfo.value = data;
}

function copyText(description: string) {
    // copywriting.value = description.value;
    uni.setClipboardData({
        data: description
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
const saveToAlbum = useDebounceFn((url) => {
    saveVideoToAlbum(url)
        .then(() => {
            Toast("保存成功");
        })
        .catch(() => {
            Toast("保存失败");
        });
}, 600);

function back() {
    router.back();
}
</script>
<style>
.wrap {
    height: fit-content !important;
}
</style>
<style scoped lang="scss">
@import "./videoPreview.scss";
</style>
