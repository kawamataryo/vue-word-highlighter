import { defineComponent, h, computed, install } from "vue-demi";
import { createHighlightPattern } from "../utils/createHighlightPattern";
import { getDefaultSlotsText } from "../utils/getDefaultSlotsText";

install();

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
      default: "",
    },
    highlightStyle: {
      type: [Object, String, Array],
      required: false,
      default: "",
    },
    regex: {
      type: Boolean,
      default: false,
    },
    highlightTag: {
      type: String,
      default: "mark",
    },
    wrapperTag: {
      type: String,
      default: "span",
    },
  },
  setup(props, ctx) {
    const defaultSlotsText = computed(() => {
      return getDefaultSlotsText(ctx.slots);
    });

    const highlightWordChunk = computed(() => {
      if (!props.query || !props.query.trim()) {
        return defaultSlotsText.value;
      }

      const pattern = createHighlightPattern({
        query: props.query,
        splitBySpace: props.splitBySpace,
        caseSensitive: props.caseSensitive,
        regex: props.regex,
      });

      const words = defaultSlotsText.value.split(pattern);
      return words.map((w: string) => {
        if (pattern.test(w)) {
          return h(
            props.highlightTag,
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

    return () => h(props.wrapperTag, {}, highlightWordChunk.value);
  },
});
