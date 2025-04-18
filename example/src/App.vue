<template>
  <div class="container">
    <ForkTag />
    <h1 class="title is-size-2">
      <a
        href="https://github.com/kawamataryo/vue-word-highlighter"
        class="has-text-black"
        >Vue Word <mark>Highlighter</mark></a
      >
    </h1>
    <p class="subtitle is-6 mt-3 mb-5">
      The word highlighter library for Vue 2.x & Vue 3.x.
    </p>
    <div class="columns">
      <div class="column is-half">
        <div class="box height-100">
          <InputBlock
            v-model:query="query"
            v-model:paragraph="paragraph"
            v-model:case-sensitive="options.caseSensitive"
            v-model:split-by-space="options.splitBySpace"
            v-model:diacritics-sensitive="options.diacriticsSensitive"
            v-model:match-mode="options.matchMode"
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
            :diacritics-sensitive="options.diacriticsSensitive"
            :match-mode="options.matchMode"
          ></OutputBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { MatchMode } from "../../vue-word-highlighter/src/utils/createHighlightWordChunk";
import ForkTag from "./components/ForkTag.vue";
import InputBlock from "./components/InputBlock.vue";
import OutputBlock from "./components/OutputBlock.vue";

const DEFAULT_PARAGRAPH =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,  The first line of Lorem Ipsum, comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. \n\n  IлｔèｒｎåｔïｏｎɑｌíƶａｔïØԉ. internationalization.';

export default defineComponent({
  name: "App",
  components: {
    ForkTag,
    InputBlock,
    OutputBlock,
  },
  setup() {
    const query = ref("Latin literature");
    const paragraph = ref(DEFAULT_PARAGRAPH);
    const options = reactive({
      caseSensitive: false,
      splitBySpace: true,
      diacriticsSensitive: false,
      matchMode: "partial" as MatchMode,
    });
    return {
      query,
      paragraph,
      options,
    };
  },
});
</script>

<style scoped lang="scss">
.title {
  font-family: "Caveat", cursive;
  & > a > mark {
    background-color: #41b883;
    padding: 0 10px 0 5px;
    color: #fff;
  }
}

.height-100 {
  height: 100%;
}
</style>
