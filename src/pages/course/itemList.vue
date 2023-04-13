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
            <view class="item relative" v-for="(item, index) in list" :key="item.id" @tap="showVideo(item.id, item)">
                <view class="vip-mark" v-if="item.isVip">
                    <image class="diamond" src="@/assets/imgs/diamond.png" mode="widthFix" />
                </view>
                <image :src="item.viewCoveUrl" mode="aspectFill" />
                <view class="title">{{ item.name }}</view>
            </view>
        </view>
        <video
            v-if="activeVideoUrl"
            class="video-box"
            id="courseVideo"
            :src="activeVideoUrl"
            @fullscreenchange="exitVideo"
        ></video>
        <view class="nomore" v-if="nomore"> -- 没有更多了 --</view>
    </scroll-view>
</template>

<script setup lang="ts">
import { ref, nextTick, getCurrentInstance, onMounted } from "vue";
import { getCourseRead } from "@/api/dsx/course";
import user from "@/store/user";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";

const emit = defineEmits(["forbid"]);
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
    instance = getCurrentInstance();
});
const scroller = ref<any>();
let videoContext: MaybeNull<UniApp.VideoContext> = null;
const activeVideoId = ref(0);
const activeVideoUrl = ref("");
async function showVideo(id: number, item: CourseListItem) {
    if (item.isVip && user.vipLvl === 0) {
        emit("forbid");
        return;
    }
    const { data } = await getCourseRead(id);
    console.log("viewUrl", data.viewUrl);
    item.viewCount++;
    activeVideoUrl.value = data.viewUrl;
    activeVideoId.value = id;
    nextTick(() => {
        videoContext = uni.createVideoContext("courseVideo", instance);
        if (!videoContext) return;
        videoContext.requestFullScreen({ direction: 0 });
        videoContext.play();
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
.vip-mark {
    position: absolute;
    z-index: 999;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 12rpx;
    right: 12rpx;
    .diamond {
        width: 48rpx;
    }
}
</style>
