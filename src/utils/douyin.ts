import { Toast } from "./uniapi";

const scope = "user_info,trial.whitelist";
const state = "1424";
const douyin = uni.requireNativePlugin ? uni.requireNativePlugin("Html5app-Tiktok") : undefined;
console.log("抖音插件", douyin);
export function douyinAuth() {
    return new Promise((resolve, reject) => {
        if (!douyin) {
            Toast("抖音插件不存在");
            return reject("抖音插件不存在");
        }
        douyin.auth({ scope, state }, (ret) => {
            if (ret.state !== state) {
                Toast("授权失败");
                return reject("授权失败");
            }
            return resolve(ret.authCode);
        });
    });
}

export function douyinShareVideos(videos, title, hashtags = []) {
    return new Promise((resolve, reject) => {
        const info: AnyObject = { videos, hashtags, state };
        if (title) {
            info.title = title;
            info.description = title;
        }
        douyin.share(info, (ret) => {
            if (ret.code !== 0 || ret.state !== state) {
                Toast("分享失败");
                return reject("分享失败");
            }
            return resolve(ret);
        });
    });
}
