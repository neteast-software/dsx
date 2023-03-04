<template>
    <scroll-view
        class="scroll"
        scroll-y="true"
        refresher-enabled="true"
        :refresher-triggered="topLoading"
        @refresherrefresh="reload()"
        @scrolltolower="nextPage()"
    >
        <view class="items">
            <view class="item" v-for="(item, index) in list" :key="item.id" @tap="showVideo(item.id)">
                <image :src="item.viewCoveUrl" mode="aspectFit" />
                <view class="title">{{ item.name }}</view>
                <view class="user">
                    <image class="avatar" :src="item.authorAvatar" mode="aspectFit" />
                    <view class="name">{{ item.author }}</view>
                    <view class="read_count">
                        <uni-icons type="eye-filled" size="24rpx" color="#7B7379"></uni-icons>
                        {{ item.viewCount }}</view
                    >
                </view>
                <video
                    v-if="activeVideoId == item.id"
                    class="video-box"
                    :id="'video' + item.id"
                    :src="item.viewUrl || ''"
                    @fullscreenchange="exitVideo"
                ></video>
            </view>
        </view>
        <view class="nomore" v-if="nomore"> -- 没有更多了 --</view>
    </scroll-view>
</template>

<script setup lang="ts">
import { ref, nextTick, getCurrentInstance, onMounted } from "vue";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
const topLoading = ref<boolean>(false);
const nomore = ref<boolean>(false);
const { list, next, init, id } = defineProps<{
    list: CourseListItem[];
    next: Function;
    init: Function;
    id: number;
}>();
async function reload() {
    await init({ id });
    topLoading.value = true;
    nextTick(() => {
        topLoading.value = false;
    });
}

async function nextPage() {
    let o = list.length;
    await next({ id });
    nomore.value = false;
    nextTick(() => {
        if (list.length == o) {
            nomore.value = true;
        }
    });
}
let instance: any = null;
onMounted(() => {
    console.log("挂在", getCurrentInstance());
    instance = getCurrentInstance();
});
const scroller = ref<any>();
let videoContext: MaybeNull<UniApp.VideoContext> = null;
const activeVideoId = ref(0);
function showVideo(id: number) {
    activeVideoId.value = id;
    nextTick(() => {
        // setTimeout(() => {
        videoContext = uni.createVideoContext("video" + id, instance);
        console.log("showVideo", videoContext);
        if (!videoContext) return;
        videoContext.requestFullScreen({ direction: 0 });
        videoContext.play();
        // }, 200);
    });
}

function exitVideo(e) {
    if (e.detail?.fullScreen) return;
    activeVideoId.value = 0;
    if (!videoContext) return;
    videoContext.seek(0);
    videoContext.pause();
}
</script>
<style scoped lang="scss">
.items {
    position: relative;
    width: 100%;
    color: #3d3d3d;
    overflow: hidden;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding-bottom: 60rpx;
}
.video-box {
    width: 0;
    height: 0;
}
.nomore {
    color: #a1a1a1;
    padding-bottom: 120rpx;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 20rpx;
}
.scroll {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 20rpx 32rpx;
    overflow-y: auto;
}
.item {
    width: 334rpx;
    border-radius: 36rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
    padding-bottom: 10rpx;
    background-color: #fff;

    &:nth-child(2n + 1) {
        order: 1;
    }
    &:nth-child(2n) {
        order: 2;
    }
    & > image {
        width: 100%;
        height: 334rpx;
    }
    .title {
        padding: 0 30rpx;
        margin: 16rpx 0;
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        font-size: 28rpx;
        height: 78rpx;
    }

    .user {
        display: flex;
        padding: 0 30rpx;
        color: #7b7379;
        font-size: 24rpx;
        align-items: center;
    }
    .avatar {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
    }
    .name {
        margin-left: 12rpx;
        color: #7b7379;
    }
    .read_count {
        flex: 1;
        margin-left: auto;
        text-align: right;
        color: #7b7379;
    }
}
</style>
