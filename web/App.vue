<template>
  <div class="container">
    <h1 class="title">Vue word highlighter example</h1>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="mb-5">
          <label class="checkbox">
            <input v-model="options.caseSensitive" type="checkbox" />
            case sensitive
          </label>
          <label class="checkbox">
            <input v-model="options.splitBySpace" type="checkbox" />
            split by space
          </label>
        </div>
        <div class="mb-5">
          <input
            v-model="query"
            class="input is-primary"
            type="text"
            placeholder="Search words"
          />
        </div>
        <div class="mb-5">
          <textarea
            v-model="paragraph"
            class="textarea"
            placeholder="Search target text"
          ></textarea>
        </div>
        <div class="box has-text-left" style="white-space: pre-wrap">
          <WordHighlighter
            :query="query"
            :split-by-space="options.splitBySpace"
            :case-sensitive="options.caseSensitive"
            >{{ paragraph }}</WordHighlighter
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import WordHighlighter from "../src/components";

const DEFAULT_PARAGRAPH =
  "Suspendisse phasellus libero placerat eros praesent justo dui lorem lobortis, montes\nsociosqu elementum nullam habitasse venenatis egestas dignissim enim, accumsan natoque\nnetus suscipit eu aenean mollis odio. Habitasse commodo est praesent sem morbi gravida\nmi";

export default defineComponent({
  name: "App",
  components: {
    WordHighlighter,
  },
  setup() {
    const query = ref("");
    const paragraph = ref(DEFAULT_PARAGRAPH);
    const options = reactive({
      caseSensitive: false,
      splitBySpace: false,
    });
    return {
      query,
      paragraph,
      options,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
