import { isDef } from "./validator";
import { computed, ref } from "vue";
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

export function usePaginator<T>(requestFn: Function, _pageSize = 10) {
    const pageNum = ref(1);
    const pageSize = ref(_pageSize);
    const total = ref(0);
    const list: Ref<T[]> = ref([]);
    const nomore = computed(() => pageNum.value * pageSize.value >= total.value);
    const loading = ref(false);
    async function initList(filter?: AnyObject) {
        const { rows, total: totalNum } = await requestList(1, filter);
        pageNum.value = 1;
        total.value = totalNum;
        list.value = rows;
    }
    async function nextList(filter?: AnyObject) {
        if (pageNum.value * pageSize.value >= total.value) return;
        const nextPage = pageNum.value + 1;
        const { rows } = await requestList(nextPage, filter);
        pageNum.value = nextPage;
        list.value = [...list.value, ...rows];
    }
    async function requestList(pageNum = 1, filter?: AnyObject) {
        loading.value = true;
        const p = requestFn(pageNum, pageSize.value, filter);
        p.finally(() => {
            loading.value = false;
        });
        const { rows, total } = await p;
        const list: Array<T> = rows || [];
        return { rows: list, total };
    }
    return {
        nomore,
        list,
        initList,
        nextList,
        loading
    };
}

/**
 * 轮询
 */
export const timeoutPromise = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function pollFetch(cb: Function, interval = 1000) {
    while (true) {
        try {
            await cb();
            await timeoutPromise(interval);
        } catch (error) {
            console.error(error);
            await timeoutPromise(interval);
        }
    }
}

/**
 * 获取缓存
 */

export function getCache() {
    if (typeof plus === "undefined") return "0B";
    return new Promise<string>((resolve) => {
        const appPlus: any = plus;
        appPlus.cache.calculate((size) => {
            let cacheSize = parseInt(size);
            let ret = "0B";
            if (cacheSize === 0) {
                ret = "0B";
            } else if (cacheSize < 1024) {
                ret = cacheSize + "B";
            } else if (cacheSize < 1024 * 1024) {
                ret = (cacheSize / 1024).toFixed(2) + "KB";
            } else if (cacheSize < 1024 * 1024 * 1024) {
                ret = (cacheSize / 1024 / 1024).toFixed(2) + "MB";
            } else {
                ret = (cacheSize / 1024 / 1024 / 1024).toFixed(2) + "GB";
            }
            resolve(ret);
        });
    });
}

/**
 * 清除缓存
 */
export function clearCache() {
    if (typeof plus === "undefined") return;
    return new Promise((resolve, reject) => {
        const appPlus: any = plus;
        const os = appPlus.os.name;
        if (os === "iOS") {
            appPlus.cache.clear(resolve);
            return;
        }
        const main = appPlus.android.runtimeMainActivity();
        const sdRoot = main.getCacheDir();
        const files = appPlus.android.invoke(sdRoot, "listFiles");
        const length = files.length;
        for (let i = 0; i < length; i++) {
            const filePath = "" + files[i];
            plus.io.resolveLocalFileSystemURL(
                filePath,
                function (entry) {
                    if (entry.isDirectory) {
                        entry.removeRecursively(
                            function () {
                                resolve("缓存清理完成");
                            },
                            function (e) {
                                reject(e.message);
                            }
                        );
                    } else {
                        entry.remove();
                        resolve("缓存清理完成");
                    }
                },
                function (e) {
                    reject("文件路径读取失败");
                }
            );
        }
    });
}

// 去抖音个人页
export function goDouyin() {
    if (typeof plus === "undefined") return;
    plus.runtime.openURL("snssdk1128://user/profile");
}
