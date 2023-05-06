<template>
    <view class="tabbar">
        <view class="navigator">
            <view class="navigator-item" v-for="(item, idx) in tabBar.list" :key="item.text" @tap="routerTo(item)">
                <image class="navigator-icon" v-if="select === idx" :src="item.selectedIconPath" mode="aspectFit" />
                <image class="navigator-icon" v-else :src="item.iconPath" mode="aspectFit" />
                <text class="navigator-text" :style="{ color: select === idx ? tabBar.selectedColor : tabBar.color }">{{
                    item.text
                }}</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import type { RoutePath } from "@/utils/router";
const props = defineProps({
    select: {
        type: Number,
        default: 0
    }
});
interface TabItem {
    pagePath: RoutePath;
    iconPath: string;
    selectedIconPath: string;
    text: string;
    isTab: boolean;
}
interface TabBar {
    color: string;
    selectedColor: string;
    list: TabItem[];
}
const tabBar: TabBar = {
    color: "#7B7379",
    selectedColor: "#EA3598",
    list: [
        {
            pagePath: "/pages/index/index",
            iconPath: "/static/tabbar/index.png",
            selectedIconPath: "/static/tabbar/index-active.png",
            text: "首页",
            isTab: true
        },
        {
            pagePath: "/pages/course/course",
            iconPath: "/static/tabbar/course.png",
            selectedIconPath: "/static/tabbar/course-active.png",
            text: "省心学院",
            isTab: true
        },
        {
            pagePath: "/videoPages/videoChoose/videoChoose",
            iconPath: "/static/tabbar/ai.png",
            selectedIconPath: "/static/tabbar/ai.png",
            text: "AI视频",
            isTab: false
        },
        {
            pagePath: "/pages/my/my",
            iconPath: "/static/tabbar/my.png",
            selectedIconPath: "/static/tabbar/my-active.png",
            text: "我的",
            isTab: true
        }
    ]
};
function routerTo(item: TabItem) {
    const url = item.pagePath;
    item.isTab ? router.switchTab(url) : router.push(url);
}
</script>

<style scoped lang="scss">
.navigator {
    display: flex;
    justify-content: space-around;
    padding-top: 12rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
}
.navigator-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.navigator-icon {
    width: 48rpx;
    height: 48rpx;
}
.navigator-text {
    font-size: 22rpx;
    margin-top: 8rpx;
}
</style>
