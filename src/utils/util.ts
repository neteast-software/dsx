import { isDef } from "./validator";

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
