import { defineComponent, h, install, PropType, isVue3, VNode } from "vue-demi";
import { createHighlightWordChunk } from "../utils/createHighlightWordChunk";
import { extractDefaultSlotsText } from "../utils/extractDefaultSlotsText";
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
      // --------------------------
      // highlight html
      // --------------------------
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

      // --------------------------
      // highlight props text
      // --------------------------
      if (props.textToHighlight) {
        const highlightWordChunk = createHighlightWordChunk(
          props.textToHighlight,
          {
            query: props.query,
            splitBySpace: props.splitBySpace,
            caseSensitive: props.caseSensitive,
            diacriticsSensitive: props.diacriticsSensitive,
            highlightTag: props.highlightTag,
            highlightClass: props.highlightClass,
            highlightStyle: props.highlightStyle,
          }
        );

        ctx.emit("matches", extractMatchesStrings(highlightWordChunk));

        return h(
          props.wrapperTag,
          {
            class: props.wrapperClass,
          },
          highlightWordChunk
        );
      }

      // --------------------------
      // highlight slots
      // --------------------------
      // TODO: refactor this
      if (isVue3) {
        // only supported nested slots in Vue 3
        if (ctx.slots && ctx.slots.default) {
          const createHighlightedNode = (node: VNode): VNode => {
            // if node have a text, it's a text node
            if (typeof node.children == "string") {
              const highlightWordChunk = createHighlightWordChunk(
                node.children,
                {
                  query: props.query,
                  splitBySpace: props.splitBySpace,
                  caseSensitive: props.caseSensitive,
                  diacriticsSensitive: props.diacriticsSensitive,
                  highlightTag: props.highlightTag,
                  highlightClass: props.highlightClass,
                  highlightStyle: props.highlightStyle,
                }
              );

              const matchesStrings = extractMatchesStrings(highlightWordChunk);
              ctx.emit("matches", matchesStrings);

              if (matchesStrings.length === 0) {
                return node;
              }
              // if node is not a string, it's a html tag
              if (typeof node.type == "string") {
                return h(
                  node.type,
                  {
                    ...node.props,
                  },
                  [
                    h(
                      props.wrapperTag,
                      {
                        class: props.wrapperClass,
                      },
                      highlightWordChunk
                    ),
                  ]
                );
              } else {
                return h(
                  props.wrapperTag,
                  {
                    class: props.wrapperClass,
                  },
                  highlightWordChunk
                );
              }
            } else {
              console.log(
                "🚀 ~ file: index.ts:193 ~ createHighlightedNode ~ node.children",
                node.children
              );
              return h(
                node.type as string,
                {
                  ...node.props,
                },
                Array.isArray(node.children)
                  ? (node.children as VNode[]).map((c: VNode) =>
                      createHighlightedNode(c)
                    )
                  : []
              );
            }
          };
          const nodes = ctx.slots.default();
          return Array.isArray(nodes)
            ? nodes.map((n: VNode) => createHighlightedNode(n))
            : nodes;
        }
      } else {
        // not support nested slots in Vue 2
        const targetText = extractDefaultSlotsText(ctx.slots);

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
      }
    };
  },
});
