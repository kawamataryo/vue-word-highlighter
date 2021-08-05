import { defineComponent, h, install, PropType } from "vue-demi";
import { getDefaultSlotsText } from "../utils/getDefaultSlotsText";
import { getHighlightWordChunk } from "../utils/getHighlightWordChunk";
import { getMatchesFromWordChunk } from "../utils/getMatchesFromWordChunk";

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
  emits: ["matches"],
  setup(props, ctx) {
    return () => {
      // If textToHighlight is exist, give priority to that.
      const targetText = props.textToHighlight
        ? props.textToHighlight
        : getDefaultSlotsText(ctx.slots);

      const highlightWordChunk = getHighlightWordChunk(targetText, {
        query: props.query,
        splitBySpace: props.splitBySpace,
        caseSensitive: props.caseSensitive,
        highlightTag: props.highlightTag,
        highlightClass: props.highlightClass,
        highlightStyle: props.highlightStyle,
      });

      ctx.emit("matches", getMatchesFromWordChunk(highlightWordChunk));

      return h(
        props.wrapperTag,
        {
          class: props.wrapperClass,
        },
        highlightWordChunk
      );
    };
  },
});
