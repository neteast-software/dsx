import { getMsgDetail, getVipUpgradeMsg } from "@/api/dsx/business";
import { ref } from "vue";

export function useVipUpgrade() {
    const showCongratulation = ref(false);
    let msgId: string;
    async function checkVipUpgrade() {
        const { data } = await getVipUpgradeMsg();
        const { id } = data;
        if (!id) return;
        msgId = id;
        showCongratulation.value = true;
    }
    async function confirmUpgrade() {
        await getMsgDetail(msgId);
        showCongratulation.value = false;
    }
    return {
        showCongratulation,
        checkVipUpgrade,
        confirmUpgrade
    };
}
