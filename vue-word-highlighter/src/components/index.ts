import { defineComponent, h, install, PropType } from "vue-demi";
import { extractDefaultSlotsText } from "../utils/extractDefaultSlotsText";
import { createHighlightWordChunk } from "../utils/createHighlightWordChunk";
import { extractMatchesStrings } from "../utils/extractMatchesStrings";

install();

export default defineComponent({
  name: "VueWordHighlighter",
  props: {
    query: {
      type: [String, Object as () => RegExp],
      required: true,
      default: "",
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
        : extractDefaultSlotsText(ctx.slots);

      const highlightWordChunk = createHighlightWordChunk(targetText, {
        query: props.query,
        splitBySpace: props.splitBySpace,
        caseSensitive: props.caseSensitive,
        highlightTag: props.highlightTag,
        highlightClass: props.highlightClass,
        highlightStyle: props.highlightStyle,
      });

      ctx.emit("matches", extractMatchesStrings(highlightWordChunk));

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
