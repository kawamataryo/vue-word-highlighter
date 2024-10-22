<template>
  <h1 class="title is-size-4">Output</h1>
  <label class="label">Search words</label>
  <div class="tags">
    <span
      v-for="(word, index) in searchWords"
      :key="index"
      class="tag is-primary is-medium"
      :style="{ backgroundColor: 'var(--bulma-primary)', color: '#fff' }"
      >{{ word }}</span
    >
  </div>
  <label class="label">Matched word count</label>
  <div class="is-size-6 mb-3 has-text-weight-bold">
    {{ matchedWords.length }}
  </div>
  <label class="label">Result</label>
  <div
    class="result-wrapper"
    :style="{ backgroundColor: 'var(--bulma-primary-light)' }"
  >
    <WordHighlighter
      :query="query"
      :split-by-space="splitBySpace"
      :case-sensitive="caseSensitive"
      :diacritics-sensitive="diacriticsSensitive"
      @matches="
        (e) => {
          matchedWords = e;
        }
      "
      >{{ paragraph }}
    </WordHighlighter>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import WordHighlighter from "../../../vue-word-highlighter/src/components";

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
    diacriticsSensitive: {
      type: Boolean,
      required: true,
    },
    splitBySpace: {
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

    const matchedWords = ref([]);

    return {
      searchWords,
      matchedWords,
    };
  },
});
</script>

<style scoped lang="scss">
.result-wrapper {
  background-color: #f5fffa;
  padding: 15px;
  & > span {
    white-space: pre-wrap;
  }
}
</style>
