<template>
    <view class="new">
        <!-- 界面1 -->
        <!-- <view class="container">
            <image class="bj1" src="../../static/export/bj1.gif" mode="widthFix" alt=""></image>
            <view class="content1">视频努力导出中{{}}%</view>
            <view class="content2">您的专属视频生成中，请勿离开</view>
            <view class="adContainer">
                <swiper class="swiper-banner">
                    <swiper-item class="swiper-item">
                        <image src="../../static/export/banner1.png" mode="scaleToFill"></image>
                    </swiper-item>
                </swiper>
                <view class="btn-close">关闭</view>
            </view>
        </view> -->
        <!-- 界面2 -->
        <view class="wrap">
            <view class="bj2">
                <video class="video"></video>
            </view>
            <!-- 提示信息 -->
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
            <!-- 文案 -->
            <view class="copywriting flex-column-center">
                <view class="write" :selectsble="true" user-select="ture"
                    >上一期没弹幕真的好不习惯，这次让我听到你们的声音好吗
                </view>
                <button class="btn-copy" @click="">复制文案</button>
            </view>
            <button class="btn" @click="">发布到抖音</button>
        </view>
    </view>
</template>

<script setup lang="ts"></script>
<style setup lang="scss">
@import "./export.scss";
</style>
