<template>
  <ForkTag />
  <div class="container">
    <h1 class="title">Vue word highlighter</h1>
    <div class="columns">
      <div class="column is-half">
        <div class="box height-100">
          <h1 class="title">Input</h1>
          <div class="field">
            <label class="label">Search words</label>
            <div class="control">
              <input
                v-model="query"
                class="input is-primary"
                type="text"
                placeholder="words"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Options</label>
            <div class="control">
              <input
                id="options-case-sensitive"
                v-model="options.caseSensitive"
                class="is-checkradio has-background-color"
                type="checkbox"
              />
              <label for="options-case-sensitive">Case sensitive</label>
              <input
                id="options-split-by-space"
                v-model="options.splitBySpace"
                class="is-checkradio has-background-color"
                type="checkbox"
              />
              <label for="options-split-by-space">Split by space</label>
              <input
                id="options-regex"
                v-model="options.regex"
                class="is-checkradio has-background-color"
                type="checkbox"
              />
              <label for="options-regex">Regex</label>
            </div>
          </div>
          <div class="field">
            <label class="label">Search target text</label>
            <textarea
              v-model="paragraph"
              class="textarea"
              placeholder="Search target text"
              rows="12"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="box height-100">
          <h1 class="title">Result</h1>
          <label class="label">Search query</label>
          <div class="search-queries mb-2">
            <span
              v-for="(word, index) in searchWords"
              :key="index"
              class="tag is-primary is-medium mr-2"
              >{{ word }}</span
            >
          </div>
          <label class="label">Output</label>
          <div class="output-wrapper">
            <WordHighlighter
              :query="query"
              :split-by-space="options.splitBySpace"
              :case-sensitive="options.caseSensitive"
              :regex="options.regex"
              >{{ paragraph }}
            </WordHighlighter>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import WordHighlighter from "../../src/components";
import ForkTag from "./components/ForkTag.vue";

const DEFAULT_PARAGRAPH =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.';

export default defineComponent({
  name: "App",
  components: {
    WordHighlighter,
    ForkTag,
  },
  setup() {
    const query = ref("");
    const paragraph = ref(DEFAULT_PARAGRAPH);
    const options = reactive({
      caseSensitive: false,
      splitBySpace: true,
      regex: false,
    });

    const searchWords = computed(() => {
      if (!query.value) {
        return [];
      }
      if (!options.splitBySpace) {
        return [query.value];
      }
      return query.value.trim().split(/\s+/);
    });

    return {
      query,
      paragraph,
      options,
      searchWords,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
.output-wrapper {
  background-color: #efefef;
  padding: 15px;
}
.height-100 {
  height: 100%;
}
.search-queries {
  min-height: 30px;
}
</style>
