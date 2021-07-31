import { Slots } from "vue";
import { isVue3 } from "vue-demi";

export const getDefaultSlotsText = (slots: Slots): string => {
  if (slots && slots.default) {
    const defaultSlot = slots.default();
    let slotText;
    if (isVue3) {
      slotText = defaultSlot[0].children;
    } else {
      // vue 2 slots text is in vnode's text attribute
      slotText = (defaultSlot[0] as any).text;
    }
    if (typeof slotText === "string") {
      return slotText;
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Slots should be text only");
      }
      return "";
    }
  }
  return "";
};
