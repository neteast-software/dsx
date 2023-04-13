<template>
    <view class="stage">
        <status-bar></status-bar>
        <view class="nav">
            <view
                v-for="(item, index) in typeList"
                :key="index"
                :class="{ active: item.id == nav }"
                @click="changeNav(item.id, index)"
            >
                {{ item.name }}
            </view>
        </view>
        <swiper class="swiper-box" :current="currentIndex" @change="swipChange" duration="220">
            <swiper-item v-for="(t, ind) in dataList" :key="ind">
                <ItemList
                    :list="t.list"
                    :next="t.nextList"
                    :init="t.initList"
                    :id="ind"
                    @forbid="showUpgrade"
                ></ItemList>
            </swiper-item>
        </swiper>
    </view>
    <Upgrade v-model="showForbidden"></Upgrade>
    <Congratulation v-model="showCongratulation" @close="confirmUpgrade"></Congratulation>
</template>

<script setup lang="ts">
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
import { reactive, onMounted, ref } from "vue";
import statusBar from "@/components/statusBar.vue";
import { getTypeList, getCourseList } from "@/api/dsx/course";
import { usePaginator } from "@/utils/util";
import ItemList from "./itemList.vue";
import Upgrade from "@/components/upgrade.vue";
import { onShow } from "@dcloudio/uni-app";

import Congratulation from "@/components/congratulation.vue";
import { useVipUpgrade } from "@/mixins/vip";
const { showCongratulation, checkVipUpgrade, confirmUpgrade } = useVipUpgrade();
onShow(checkVipUpgrade);

const nav = ref<number>(0);
const typeList = ref<TypeItem[]>([]);
const dataList = ref<Record<number, any>>({});
const currentIndex = ref<number>(0);

//课程分类
async function getTypes() {
    const { data } = await getTypeList();
    typeList.value = data;

    data.map((item) => {
        dataList.value[item.id] = {
            //课程列表
            ...usePaginator<CourseListItem>(getCourseList),
            init: false
        };
    });
}

function swipChange(e: any) {
    if (currentIndex.value == e.detail.current) return;
    changeNav(typeList.value[e.detail.current].id, e.detail.current);
}

function changeNav(id: number, index: number) {
    nav.value = id;
    const list = dataList.value[id];
    if (!list.init) {
        list.initList({ id });
        list.init = true;
    } else {
        list.nextList({ id });
    }
    currentIndex.value = index;
}

async function initData() {
    await getTypes();
    nav.value = typeList.value[0].id;
    const list = dataList.value[nav.value];
    list.initList({ id: nav.value });
    list.init = true;
}

onMounted(initData);

/////////
interface li {
    username: String;
    title: String;
    read_count: Number;
    avatar: String;
}
let tmp: li[] = [];
for (let i = 1; i <= 100; i++) {
    let title = "数销通-陈老师教你";
    if (i % 2 == 0) {
        title += title;
    }
    tmp.push({
        username: "鱼丸" + i,
        title,
        read_count: 12000,
        avatar: "/static/course/user.png"
    });
}
let newData = [].concat(
    ...Array.from(
        tmp.reduce(
            (total, cur, index) => {
                total[index % 2].push(cur);
                return total;
            },
            { 0: [], 1: [], length: 2 }
        )
    )
);

const data = reactive<li[]>([...newData]);

const showForbidden = ref(false);
const showUpgrade = () => {
    showForbidden.value = true;
};
</script>

<style>
page {
    height: 100%;
}
</style>
<style scoped lang="scss">
.stage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f7f8fa;
}
.swiper-box {
    width: 100%;
    height: 100%;
}
.items {
    padding: 60rpx 32rpx;
    column-count: 2;

    .item {
        width: 334rpx;
        border-radius: 36rpx;
        overflow: hidden;
        background-color: #fff;
        margin-bottom: 20rpx;
        padding-bottom: 10rpx;

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
        }
        .read_count {
            flex: 1;
            margin-left: auto;
            text-align: right;
        }
    }
}
.nav {
    position: sticky;
    top: 0;
    padding-top: 32rpx;
    font-size: 28rpx;
    color: #3d3d3d;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    align-items: center;

    & > view {
        min-width: 144rpx;
        margin: 0 45rpx;
        &.active {
            font-size: 36rpx;
            font-weight: bold;
        }
    }
}
</style>
