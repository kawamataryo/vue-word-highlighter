import {
  defineComponent,
  h,
  computed,
  install,
  PropType,
  watch,
} from "vue-demi";
import { createHighlightPattern } from "../utils/createHighlightPattern";
import { getDefaultSlotsText } from "../utils/getDefaultSlotsText";

install();

export default defineComponent({
  name: "VueWordHighlighter",
  props: {
    query: {
      type: [String, Object] as PropType<string | RegExp>,
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
      default: "",
    },
    highlightStyle: {
      type: [Object, String, Array],
      default: "",
    },
    highlightTag: {
      type: String,
      default: "mark",
    },
    wrapperTag: {
      type: String,
      default: "span",
    },
    wrapperClass: {
      type: [Object, String, Array],
      default: "",
    },
    textToHighlight: {
      type: String,
      default: "",
    },
  },
  emits: ["match"],
  setup(props, ctx) {
    const targetText = computed(() => {
      // If textToHighlight is exist, give priority to that.
      if (props.textToHighlight) {
        return props.textToHighlight;
      }
      return getDefaultSlotsText(ctx.slots);
    });

    const emitsMatchEvent = (isMatch: boolean) => {
      ctx.emit("match", isMatch);
    };

    const highlightWordChunk = computed(() => {
      if (
        !props.query ||
        (props.query instanceof String && !props.query.trim())
      ) {
        return targetText.value;
      }

      const pattern = createHighlightPattern({
        query: props.query,
        splitBySpace: props.splitBySpace,
        caseSensitive: props.caseSensitive,
      });

      const words = targetText.value.split(pattern);

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

    watch(
      () => props.query,
      (to, from) => {
        emitsMatchEvent(
          Array.isArray(highlightWordChunk.value) &&
            highlightWordChunk.value.length > 1
        );
      },
      {
        immediate: true,
      }
    );

    return () =>
      h(
        props.wrapperTag,
        {
          class: props.wrapperClass,
        },
        highlightWordChunk.value
      );
  },
});
