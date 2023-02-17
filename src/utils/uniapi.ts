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
export const Toast: ToastFn & Partial<Toast> = MyToast;
const toastMethods = ["success", "error", "loading"] as const;
toastMethods.forEach((method) => {
    Toast[method] = (title) => {
        const options: ToastOptions = { title, icon: method, duration: 2000 };
        return Toast(options);
    };
});
