<template>
    <view class="background-list-container">
        <scroll-view v-if="backgroundList.length" scroll-y @scrolltolower="nextList">
            <view class="background-list-content">
                <view class="background-detail">
                    <view class="background-img border-dashed" />
                    <view class="background-text">无背景</view>
                </view>
                <view class="background-detail" v-for="(item, index) in backgroundList" :key="item.id">
                    <image class="background-img" :src="item.url" mode="scaleToFill" />
                    <view class="background-text">{{ item.name }}</view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import router from "@/utils/router";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import user from "@/store/user";
import { Toast } from "@/utils/uniapi";
import { usePaginator } from "@/utils/util";

import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getVideoBackgroundList } from "@/api/dsx/business";
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue";
const { list: backgroundList, initList, nextList } = usePaginator<BackgroundInfo>(getVideoBackgroundList);
onReady(async () => {
    await initList();
    console.log(backgroundList.value);
});
function handleSelectBackground(id) {
    Toast.success("设置成功");
    // router.push()
}
</script>

<style scoped lang="scss">
@import "./videoBackground.scss";
</style>
