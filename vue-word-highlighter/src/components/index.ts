import { defineComponent, h, install, PropType, isVue3 } from "vue-demi";
import { extractDefaultSlotsText } from "../utils/extractDefaultSlotsText";
import { createHighlightWordChunk } from "../utils/createHighlightWordChunk";
import { extractMatchesStrings } from "../utils/extractMatchesStrings";

install();

export default defineComponent({
  name: "VueWordHighlighter",
  props: {
    query: {
      type: [String, RegExp],
      required: true,
      default: "",
    },
    caseSensitive: {
      type: Boolean,
      default: false,
    },
    diacriticsSensitive: {
      type: Boolean,
      default: false,
    },
    splitBySpace: {
      type: Boolean,
      default: false,
    },
    highlightClass: {
      type: [Object, String, Array] as PropType<
        Record<string, boolean> | string | string[]
      >,
      default: "",
    },
    highlightStyle: {
      type: [Object, String, Array] as PropType<
        Record<string, boolean> | string | string[]
      >,
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
    htmlToHighlight: {
      type: String,
      default: "",
    },
  },
  emits: ["matches"],
  setup(props, ctx) {
    return () => {
      // preferred htmlToHighlight if provided
      if (props.htmlToHighlight) {
        if (!isVue3) {
          throw new Error("htmlToHighlight prop is only supported in Vue 3");
        }
        const HTML_TAG_PATTERN = `(<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>)`;
        const words: string[] = props.htmlToHighlight.split(
          new RegExp(HTML_TAG_PATTERN, "gs")
        );
        const highlightedHtml = words
          .map((word, i) => {
            // Skip if the word is inside a script tag
            if (new RegExp(HTML_TAG_PATTERN).test(word)) {
              return word;
            }
            // Skip if the word is inside a script tag
            if (i > 0 && words[i - 1].startsWith("<script")) {
              return word;
            }

            return createHighlightWordChunk(
              word,
              {
                query: props.query,
                splitBySpace: props.splitBySpace,
                caseSensitive: props.caseSensitive,
                diacriticsSensitive: props.diacriticsSensitive,
                highlightTag: props.highlightTag,
                highlightClass: props.highlightClass,
                highlightStyle: props.highlightStyle,
              },
              true
            );
          })
          .join("");

        return h(props.wrapperTag, {
          class: props.wrapperClass,
          innerHTML: highlightedHtml,
        });
      }

      const targetText = props.textToHighlight
        ? props.textToHighlight
        : extractDefaultSlotsText(ctx.slots);

      const highlightWordChunk = createHighlightWordChunk(targetText, {
        query: props.query,
        splitBySpace: props.splitBySpace,
        caseSensitive: props.caseSensitive,
        diacriticsSensitive: props.diacriticsSensitive,
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
