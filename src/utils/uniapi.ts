type ToastIcon = "none" | "success" | "loading" | "error";
export function toast(title: string, icon: ToastIcon = "none") {
    uni.showToast({
        icon,
        title,
        duration: 2000
    });
}
