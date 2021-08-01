<template>
  <div class="container">
    <ForkTag />
    <h1 class="title">Vue word highlighter</h1>
    <p class="subtitle is-6 mt-3 mb-5">
      The word highlighter library for Vue 2.x & Vue 3.x 🖍
    </p>
    <div class="columns is-variable is-0-mobile">
      <div class="column is-half">
        <div class="box height-100">
          <InputBlock
            v-model:query="query"
            v-model:paragraph="paragraph"
            v-model:caseSensitive="options.caseSensitive"
            v-model:splitBySpace="options.splitBySpace"
            v-model:regex="options.regex"
          ></InputBlock>
        </div>
      </div>
      <div class="column is-half">
        <div class="box height-100">
          <OutputBlock
            :query="query"
            :paragraph="paragraph"
            :case-sensitive="options.caseSensitive"
            :split-by-space="options.splitBySpace"
            :regex="options.regex"
          ></OutputBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ForkTag from "./components/ForkTag.vue";
import InputBlock from "./components/InputBlock.vue";
import OutputBlock from "./components/OutputBlock.vue";

const DEFAULT_PARAGRAPH =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.';

export default defineComponent({
  name: "App",
  components: {
    ForkTag,
    InputBlock,
    OutputBlock,
  },
  setup() {
    const query = ref("lorem simply");
    const paragraph = ref(DEFAULT_PARAGRAPH);
    const options = reactive({
      caseSensitive: false,
      splitBySpace: true,
      regex: false,
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
  padding: 0 15px;
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
}
@media screen and (max-width: 769px) {
  #app {
    padding-top: 50px;
  }
}

.height-100 {
  height: 100%;
}
</style>
