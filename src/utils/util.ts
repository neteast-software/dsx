import { isDef } from "./validator";
import { ref } from "vue";

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

export function usePaginator<T extends Ref>(requestFn: Function) {
    const pageNo = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const list = ref<T[]>([]);
    async function initList() {
        const { rows, total: totalNum } = await requestList(pageNo.value);
        pageNo.value = 1;
        total.value = totalNum;
        list.value = rows;
    }
    async function nextList() {
        const nextPage = pageNo.value + 1;
        const { rows } = await requestList(nextPage);
        pageNo.value = nextPage;
        list.value = [...list.value, ...rows];
    }
    async function requestList(pageNo = 1) {
        const { rows, total } = await requestFn(pageNo, pageSize.value);
        const list: Array<T> = rows || [];
        return { rows: list, total };
    }
    return {
        list,
        initList,
        nextList
    };
}
