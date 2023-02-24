<template>
    <view class="wrap small">
        <view class="header flex-center">
            <view class="search-input flex-center">
                <view class="line"></view>
                <input type="text" placeholder="请搜索内容" />
            </view>
            <view>取消</view>
        </view>
        <view class="goods">
            <image class="cover" src="@/static/index/goods2.png"></image>
            <view class="info">
                <view class="row">
                    <view class="label">
                        <image src="@/static/index/label.svg"></image>
                        <view> 专属高佣</view>
                    </view>
                    <view class="title">百雀羚肌初赋活抗皱紧致护肤品</view>
                </view>
                <view class="row detail">
                    <view>售价 ¥12.8 <view></view></view>
                    <view>销量 12w+<view></view></view>
                </view>
                <view class="row money">
                    <view class="percent">高佣 45%</view>
                    <view class="profit">赚: ¥ <view>5.2</view></view>
                </view>
            </view>
            <button class="add-btn" type="button">加橱窗</button>
        </view>
    </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "@/styles/goods.scss";
@import "./search.scss";
</style>
