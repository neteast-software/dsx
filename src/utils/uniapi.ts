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
