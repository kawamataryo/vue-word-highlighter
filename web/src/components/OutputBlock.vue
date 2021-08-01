<template>
  <h1 class="title">Output</h1>
  <label class="label">Search words</label>
  <div class="tags">
    <span
      v-for="(word, index) in searchWords"
      :key="index"
      class="tag is-info is-medium"
      >{{ word }}</span
    >
  </div>
  <label class="label">Result</label>
  <div class="result-wrapper">
    <WordHighlighter
      :query="query"
      :split-by-space="splitBySpace"
      :case-sensitive="caseSensitive"
      :regex="regex"
      >{{ paragraph }}
    </WordHighlighter>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import WordHighlighter from "../../../src/components";

export default defineComponent({
  name: "OutputBlock",
  components: {
    WordHighlighter,
  },
  props: {
    query: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    caseSensitive: {
      type: Boolean,
      required: true,
    },
    splitBySpace: {
      type: Boolean,
      required: true,
    },
    regex: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const searchWords = computed(() => {
      if (!props.query) {
        return [];
      }
      if (!props.splitBySpace) {
        return [props.query];
      }
      return props.query.trim().split(/\s+/);
    });

    return {
      searchWords,
    };
  },
});
</script>

<style scoped>
.result-wrapper {
  background-color: #f0f8ff;
  padding: 15px;
}
</style>
