import { getSystemInfoSync } from "./util";
const systemInfo = getSystemInfoSync();
console.log("系统信息", systemInfo);

export const statusBarHeight = systemInfo.statusBarHeight;
