<template>
    <view class="flex-column h-full bg-black">
        <nav-bar title="视频处理" background-color="#000000" color="#ffffff" />
        <view class="flex-rest-height flex-column">
            <view class="bg-chooser flex-between" @tap="toVideoBackground">
                <view class="left flex-center">
                    <image class="icon-frame" src="/videoPages/static/icons/frame-bg.svg" mode="widthFix" />
                    边框背景
                </view>
                <view class="right flex-center">
                    <view v-show="!btnForm.bkg?.value">更换背景图</view>
                    <video
                        v-if="btnForm.bkg?.value && btnForm.bkg?.value.includes('.mp4')"
                        :controls="false"
                        :duration="0.1"
                        autoplay
                        id="thumbVideo"
                        :muted="true"
                        :show-play-btn="false"
                        :show-center-play-btn="false"
                        :src="btnForm.bkg?.value"
                        @timeupdate="pauseVideo2"
                        class="thumb-background-image"
                    ></video>
                    <image
                        v-show="btnForm.bkg?.value"
                        class="thumb-background-image"
                        :src="btnForm.bkg?.value"
                        mkde="widthFix"
                    />
                    <uni-icons class="icon-forward" type="forward" size="20" color="#fff"></uni-icons>
                </view>
            </view>
            <view class="video-preview flex-rest-height">
                <!-- #ifdef MP-WEIXIN -->
                <video class="cover" :src="mediaFile?.tempFilePath" mode="aspectFit"></video>
                <!-- #endif -->
                <!-- #ifdef APP-PLUS -->
                <video
                    id="myVideo"
                    class="cover"
                    autoplay
                    :src="mediaFile?.tempFilePath"
                    :muted="!first"
                    @timeupdate="pauseVideo"
                    mode="aspectFit"
                ></video>
                <!-- #endif -->
            </view>
            <view class="drawer flex-column" :class="{ isSmall }">
                <view class="handler"></view>
                <template v-if="!showStickers">
                    <scroll-view
                        class="scroller flex-rest-height"
                        scroll-y
                        :show-scrollbar="false"
                        enable-flex
                        style="margin-bottom: 54rpx"
                    >
                        <view class="op-list">
                            <view
                                class="op flex-column-center flex-shrink-0"
                                :class="{
                                    active: btnForm[item.fieldName]?.id === item.id && btnForm[item.fieldName].value
                                }"
                                v-for="item in btnList"
                                :key="item.id"
                                @click="onClickBtn(item)"
                            >
                                <view v-if="item.fieldName === 'sticker'" class="icon-wrap flex-all-center">
                                    <image
                                        class="icon-op"
                                        :src="btnForm[item.fieldName]?.value?.url || item.icon"
                                        mode="scaleToFill"
                                    />
                                </view>
                                <view v-else class="icon-wrap flex-all-center">
                                    <image class="icon-op" :src="item.icon" mode="scaleToFill" />
                                </view>
                                <text class="op-name">{{ item.name }}</text>
                            </view>
                        </view>
                    </scroll-view>
                    <button class="btn btn--primary btn--round upload-btn" @tap="handleProcess">上传并处理视频</button>
                </template>
                <template v-else>
                    <scroll-view
                        class="scroller flex-rest-height"
                        scroll-y
                        @scrolltolower="nextList({ type: stickerId })"
                    >
                        <view class="stickers">
                            <view
                                class="sticker flex-all-center"
                                :class="{ active: item.id === btnForm['sticker']?.cid }"
                                v-for="item in stickerList"
                                :key="item.id"
                                @tap="onClickSticker(item)"
                            >
                                <image class="img" :src="item.url" mode="scaleToFill" />
                            </view>
                        </view>
                    </scroll-view>
                    <view class="check-btn-list flex-between">
                        <view class="check-btn no flex-all-center" @tap="closeStickerList">
                            <uni-icons type="closeempty" color="#fff" :size="28" />
                        </view>
                        <view class="check-btn yes flex-all-center" @tap="confirmStickerChoose">
                            <uni-icons type="checkmarkempty" color="#fff" :size="28" />
                        </view>
                    </view>
                </template>
            </view>
        </view>
        <Dialog
            :show="isShowConfirm"
            :content="deductionMessage"
            @cancel="hideConfirm"
            @confirm="uploadAndProcess"
        ></Dialog>
        <Upgrade v-model="showForbidden" title="暂不支持合成"></Upgrade>
    </view>
</template>

<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import router from "@/utils/router";
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import Dialog from "@/components/dialog.vue";
import { ref, getCurrentInstance } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { getVideoProcessBtnList, getVideoMaterialList, uploadMagicVideo, processMagicVideo } from "@/api/dsx/business";
import { useDebounceFn } from "@vueuse/core";
import { computed } from "vue";
import { reactive } from "vue";
import { usePaginator } from "@/utils/util";
import { toRaw } from "vue";
import user from "@/store/user";
import { Toast, showModal } from "@/utils/uniapi";
import Upgrade from "@/components/upgrade.vue";
const { list: stickerList, initList, nextList } = usePaginator<StickerInfo>(getVideoMaterialList, 30);

const { windowWidth, windowHeight } = uni.getSystemInfoSync();
const ratio = windowWidth / 750;
console.log("windowHeight", windowHeight);
const isSmall = computed(() => windowHeight < 750);
// 初始化视频信息
const mediaFile = ref<UniApp.ChooseVideoSuccess>();
onReady(() => {
    const _this = getCurrentInstance()?.proxy as any;
    const eventChannel = _this.getOpenerEventChannel();
    if (typeof eventChannel.on !== "function") return;
    eventChannel.on("acceptVideoInfo", function (data: UniApp.ChooseVideoSuccess) {
        mediaFile.value = data;
    });
});
// 初始化操作按钮
const showStickers = ref(false);
let oldSticker: any = null;
const stickerId = ref(0);
const btnList = ref<VideoProcessBtn[]>([]);
const btnForm = reactive<Record<string, any>>({});
async function initBtnList() {
    const { data } = await getVideoProcessBtnList();
    btnList.value = data;
    data.map((item) => {
        btnForm[item.fieldName] = "";
        if (item.fieldName === "sticker") {
            stickerId.value = item.id;
            initList({ type: item.id });
        }
    });
    console.log(btnForm);
}
onReady(initBtnList);
async function onClickBtn(btn: VideoProcessBtn) {
    const { fieldName, buttonType } = btn;
    if (buttonType !== "1") {
        if (btnForm[fieldName]?.id === btn.id) {
            btnForm[fieldName] = "";
            return;
        }
        btnForm[fieldName] = { id: btn.id, value: btn.defaultValue };
    } else if (fieldName === "sticker") {
        oldSticker = btnForm[fieldName];
        showStickers.value = true;
    }
}
function onClickSticker(sticker: StickerInfo) {
    if (btnForm.sticker?.cid === sticker.id) {
        btnForm.sticker = "";
    } else {
        btnForm.sticker = {
            id: stickerId.value,
            cid: sticker.id,
            value: { url: sticker.url, width: sticker.width, height: sticker.height }
        };
    }
}
function closeStickerList() {
    btnForm.sticker = oldSticker;
    showStickers.value = false;
}
function confirmStickerChoose() {
    showStickers.value = false;
}

const isShowConfirm = ref(false);
function hideConfirm() {
    isShowConfirm.value = false;
}
function showConfirm() {
    if (user.integral === 0) {
        Toast("积分不足");
        return;
    }
    isShowConfirm.value = true;
}
const deductionMessage = computed(() => {
    const deductionPoints = user.syntheticMagicIntegrals;
    return `合成视频要扣除${deductionPoints}个积分`;
});

async function handleProcess() {
    // #ifdef MP-WEIXIN
    showConfirm();
    // #endif
    // #ifdef APP-PLUS
    await showModal("温馨提示", deductionMessage.value);
    uploadAndProcess();
    // #endif
}
async function uploadAndProcess() {
    try {
        uni.showLoading({ title: "视频上传中..." });
        isShowConfirm.value = false;
        const { data: uploadData } = await uploadMagicVideo(mediaFile.value!.tempFilePath);
        const { key } = uploadData;
        let params: AnyObject = {};
        Object.entries(toRaw(btnForm)).map(([key, formValue]) => {
            if (typeof formValue.value !== "object") {
                params[key] = formValue.value;
            } else {
                Object.entries(formValue.value).map(([subkey, subvalue]) => {
                    const fullkey = `${key}_${subkey}`;
                    params[fullkey] = subvalue;
                });
            }
        });
        try {
        } catch (error) {}
        const { data: processData } = await processMagicVideo(key, params).catch((err) => {
            if (err === "forbidden") {
                showUpgrade();
                hideConfirm();
            }
            throw err;
        });
        const { task: taskId, token } = processData;
        console.log("taskId", taskId);
        console.log("token", token);
        router.push("export", { query: { taskId, token } });
        hideConfirm();
    } catch (error) {
        console.log(error);
        Toast("系统繁忙，请稍后再试");
    } finally {
        uni.hideLoading();
    }
}

async function toVideoBackground() {
    await router.push("videoBackground", {
        events: {
            setBackground: function (url) {
                btnForm.bkg = { value: url };
            }
        }
    });
}

const first = ref(false);
function pauseVideo(e) {
    if (!first.value && e.detail.currentTime) {
        first.value = true;
        const ctx = uni.createVideoContext("myVideo");
        ctx.pause();
    }
}
const first2 = ref(false);
function pauseVideo2(e) {
    if (!first2.value && e.detail.currentTime) {
        first2.value = true;
        const ctx = uni.createVideoContext("myVideo");
        ctx.pause();
    }
}

const showForbidden = ref(false);
const showUpgrade = () => {
    showForbidden.value = true;
};

// 改变高度, 暂时不要
// const maxDrawerHeight = 445;
// const minDrawerHeight = maxDrawerHeight - 384 * ratio;
// const drawerHeight = ref(maxDrawerHeight);
// let _startY = 0;
// let _moveY = 0;
// function onTouchStart(e: TouchEvent) {
//     console.log(e);
//     _startY = e.changedTouches[0].pageY;
// }

// function onTouchMove(e: TouchEvent) {
//     const { pageY } = e.changedTouches[0];
//     const moveY = pageY - _startY;
//     const offsetY = moveY - _moveY;
//     _moveY = moveY;
//     drawerHeight.value = Math.min(Math.max(drawerHeight.value - offsetY, minDrawerHeight), maxDrawerHeight);
//     console.log(drawerHeight.value);
// }
// const onTouchMoveDebounce = useDebounceFn((e: TouchEvent) => {
//     onTouchMove(e);
// }, 20);
// function onTouchEnd(e: TouchEvent) {
//     _startY = 0;
//     _moveY = 0;
// }
</script>

<style scoped lang="scss">
@import "./videoProcess.scss";
</style>
