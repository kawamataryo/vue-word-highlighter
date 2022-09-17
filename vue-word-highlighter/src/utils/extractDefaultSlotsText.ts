import { isVue3 } from "vue-demi";

type SlotItem = { children: string | SlotItem[]; text: string };
type Slots = { default?: () => SlotItem[] };

const getSlotText = (slot: SlotItem): string => {
  if (!Array.isArray(slot.children)) {
    return slot.children ?? "";
  }
  return slot.children.map(getSlotText).join("");
};

export const extractDefaultSlotsText = (slots?: Slots): string => {
  if (slots && slots.default) {
    const defaultSlot = slots.default();
    let slotText;
    if (isVue3) {
      slotText = getSlotText(defaultSlot[0]);
    } else {
      // vue 2 slots text is in vnode's text attribute
      slotText = defaultSlot[0].text;
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
