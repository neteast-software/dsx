<template>
    <view class="wrap grey">
        <view class="account flex-box">
            <view class="share">
                <text class="text-share">分享获得积分</text>
                <view class="data-surplus">
                    <text class="data">时间: 2023-01-16 16:15:44 </text>
                    <view class="surplus">
                        <text>剩余积分：</text>
                        <text class="text-surplus">998</text>
                    </view>
                </view>
            </view>
            <text class="text-integral">+ 998</text>
        </view>
        <view class="account flex-box">
            <view class="share">
                <text class="text-share">视频合成</text>
                <view class="data-surplus">
                    <text class="data">时间: 2023-01-16 16:15:44 </text>
                    <view class="surplus">
                        <text>剩余积分：</text>
                        <text class="text-surplus">128</text>
                    </view>
                </view>
            </view>
            <text class="text-negative">- 32</text>
        </view>
    </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "./integral.scss";
</style>
