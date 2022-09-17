<template>
  <VueWordHighlighter
    :query="query"
    :case-sensitive="caseSensitive"
    :split-by-space="splitBySpace"
  >
    <slot />
  </VueWordHighlighter>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueWordHighlighter from "../../../vue-word-highlighter/src/components";

export default defineComponent({
  name: "WrappedWordHighlighter",
  components: {
    VueWordHighlighter,
  },
  props: {
    query: {
      type: String,
      required: true,
    },
    caseSensitive: {
      type: Boolean,
      required: false,
    },
    splitBySpace: {
      type: Boolean,
      required: false,
    },
  },
});
</script>
