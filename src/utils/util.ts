import { isDef } from "./validator";
import { ref } from "vue";
import type { Ref } from "@/typings/model";
/**
 * 获取系统信息，存于变量中
 * 避免多次调用uni.getSystemInfoSync()
 */
let systemInfo: UniApp.GetSystemInfoResult;
export function getSystemInfoSync() {
    if (!isDef(systemInfo)) {
        systemInfo = uni.getSystemInfoSync();
    }
    return systemInfo;
}

/**
 * 分页器
 */

export function usePaginator<T>(requestFn: Function) {
    const pageNum = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const list: Ref<T[]> = ref([]);
    async function initList(filter?: AnyObject) {
        const { rows, total: totalNum } = await requestList(pageNum.value, filter);
        pageNum.value = 1;
        total.value = totalNum;
        list.value = rows;
    }
    async function nextList(filter?: AnyObject) {
        console.log(total.value, pageNum.value, pageSize.value);
        if (pageNum.value * pageSize.value >= total.value) return;
        const nextPage = pageNum.value + 1;
        console.log(nextPage);
        const { rows } = await requestList(nextPage, filter);
        pageNum.value = nextPage;
        list.value = [...list.value, ...rows];
    }
    async function requestList(pageNum = 1, filter?: AnyObject) {
        const { rows, total } = await requestFn(pageNum, pageSize.value, filter);
        console.log("总数", rows, total);
        const list: Array<T> = rows || [];
        return { rows: list, total };
    }
    return {
        list,
        initList,
        nextList
    };
}
