type ToastType = "none" | "success" | "loading" | "error";
type ToastOptions = { title: string; icon?: ToastType; duration?: number };
type ToastFn = (params: ToastOptions | string) => void;
type toastMethod = (title: string) => void;
interface Toast extends ToastFn {
    success: toastMethod;
    error: toastMethod;
    loading: toastMethod;
}
function MyToast(params: ToastOptions | string) {
    const options: ToastOptions = { title: "", icon: "none", duration: 2000 };
    if (typeof params === "string") {
        options.title = params;
    } else {
        Object.assign(options, params);
    }
    uni.showToast({
        icon: options.icon,
        title: options.title,
        duration: options.duration
    });
}
const ToastFn: ToastFn & Partial<Toast> = MyToast;
const toastMethods = ["success", "error", "loading"] as const;
toastMethods.forEach((method) => {
    ToastFn[method] = (title = "") => {
        const options: ToastOptions = { title, icon: method, duration: 2000 };
        return ToastFn(options);
    };
});

export const Toast = ToastFn as Toast;

export function showModal(title: string, content: string, confirmColor = "#3594FD", showCancel = true) {
    return new Promise<UniApp.ShowModalRes>((resolve, reject) => {
        uni.showModal({
            title,
            content,
            showCancel,
            confirmColor,
            success: resolve,
            fail: reject
        });
    });
}

// export function showDialog(title: string, content: string, confirmColor = "#3594FD") {
//     return new Promise<UniApp.ShowModalRes>((resolve, reject) => {
//         uni.showModal({
//             title,
//             content,
//             confirmColor,
//             editable: true,
//             placeholderText: "",
//             success: resolve,
//             fail: reject
//         });
//     });
// }

// 从相册选择图片
export function chooseImageByAlbum() {
    return new Promise<UniApp.ChooseImageSuccessCallbackResult>((resolve, reject) => {
        uni.chooseImage({
            count: 1,
            sourceType: ["album"],
            success: resolve,
            fail: reject
        });
    });
}

// 分享到微信
export function shareToWechat(
    imageUrl: string,
    type: 0 | 1 | 2 | 3 | 4 | 5 = 2,
    scene: "WXSceneSession" | "WXSceneTimeline" | "WXSceneFavorite" = "WXSceneSession"
) {
    return new Promise((resolve, reject) => {
        uni.share({
            provider: "weixin",
            type, // 图文
            title: "抖省心",
            scene,
            summary: "我正在使用抖省心，快来一起省心吧！",
            href: "https://dsxmanager.huoyuanyouxuan.com/profile/upload/webImage/logo.png",
            imageUrl,
            success: resolve,
            fail: reject
        });
    });
}

// 下载网络文件
export function downloadFile(url: string) {
    return new Promise<UniApp.DownloadSuccessData>((resolve, reject) => {
        uni.downloadFile({
            url,
            success: resolve,
            fail: reject
        });
    });
}

// 保存视频到相册
export async function saveVideoToAlbum(url: string) {
    const res = await downloadFile(url);
    return new Promise<any>((resolve, reject) => {
        uni.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success: resolve,
            fail: reject
        });
    });
}

// 保存网络图片到相册
export async function saveImageToAlbum(url: string) {
    const res = await downloadFile(url);
    return new Promise<any>((resolve, reject) => {
        uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: resolve,
            fail: reject
        });
    });
}

// 保存本地图片到相册
export function saveImageToLocal(url: string) {
    return new Promise((resolve, reject) => {
        uni.saveImageToPhotosAlbum({
            filePath: url,
            success: resolve,
            fail: reject
        });
    });
}

// 获取节点信息
export function getNodeInfo(selector: string, instance = null) {
    return new Promise<UniApp.NodeInfo>((resolve, reject) => {
        const query = instance ? uni.createSelectorQuery().in(instance) : uni.createSelectorQuery();
        query
            .select(selector)
            .boundingClientRect((data) => {
                if (data) {
                    resolve(data as UniApp.NodeInfo);
                } else {
                    reject();
                }
            })
            .exec();
    });
}

// 登录
export function uniLogin(provider: "weixin" | "apple") {
    return function () {
        return new Promise<UniApp.LoginRes>((resolve, reject) => {
            uni.login({
                provider,
                success: resolve,
                fail: reject
            });
        });
    };
}
