import { getSystemInfoSync } from "./util";
const systemInfo = getSystemInfoSync();

export const statusBarHeight = systemInfo.statusBarHeight;
