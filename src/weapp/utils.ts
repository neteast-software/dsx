import { uniLogin } from "@/utils/uniapi";

export const wxLogin = uniLogin("weixin");

export function wxRequestPayment(params: UniApp.RequestPaymentOptions) {
    return new Promise((resolve, reject) => {
        uni.requestPayment({
            ...params,
            provider: "wxpay",
            success: resolve,
            fail: reject
        });
    });
}
