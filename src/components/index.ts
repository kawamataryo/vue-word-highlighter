import { defineComponent, h, computed } from "vue-demi";

export default defineComponent({
  name: "VueWordHighlighter",
  props: {
    query: {
      type: String,
      required: true,
    },
    caseSensitive: {
      type: Boolean,
      default: false,
    },
    splitBySpace: {
      type: Boolean,
      default: false,
    },
    highlightClass: {
      type: [Object, String, Array],
      required: false,
    },
    highlightStyle: {
      type: [Object, String, Array],
      required: false,
    },
  },
  setup(props, ctx) {
    const defaultSlotText = computed(() => {
      if (ctx.slots && ctx.slots.default) {
        const defaultSlot = ctx.slots.default();
        const slotText = defaultSlot[0].children;
        console.log(defaultSlot[0]);
        if (typeof slotText === "string") {
          return slotText;
        } else {
          console.warn("Slots should be text only");
          return "";
        }
      }
      return "";
    });

    const highlightWordChunk = computed(() => {
      if (!props.query || !props.query.trim()) {
        return defaultSlotText.value;
      }

      let pattern = /^(?!.*)/;
      if (props.splitBySpace) {
        const normalizeQuery = props.query.trim().replace(/\s+/g, " ");
        pattern = new RegExp(
          `(${normalizeQuery.split(/\s/).join("|")})`,
          `g${props.caseSensitive ? "" : "i"}`
        );
      } else {
        pattern = new RegExp(
          `(${props.query})`,
          `g${props.caseSensitive ? "" : "i"}`
        );
      }

      const words = defaultSlotText.value.split(pattern);
      return words.map((w) => {
        if (pattern.test(w)) {
          return h(
            "mark",
            {
              class: props.highlightClass,
              style: props.highlightStyle,
            },
            w
          );
        }
        return w;
      });
    });

    return () => h("span", {}, highlightWordChunk.value);
  },
});
