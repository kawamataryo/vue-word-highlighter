# Vue Word Highlighter

The word highlighter library for Vue.js 2.x & 3.x 💅  
powered by [vue-demi](https://github.com/antfu/vue-demi).


## Installation

**Vue3.x**
```bash
yarn add vue-word-highlighter
# or
npm install vue-word-highlighter
```

**Vue2.x**
```bash
yarn add vue-word-highlighter @vue/composition-api
# or
npm install vue-word-highlighter @vue/composition-api
```

## Usage
To use it, just provide it with a search words to props and a body of text to default slots.


```vue
<template>
  <WordHighlighter
    query="highlighter"
  >
    The word highlighter library for Vue.js 2.x & 3.x
  </WordHighlighter
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WordHighlighter from "vue-word-highlighter";

export default defineComponent({
  name: "App",
  components: {
    WordHighlighter,
  },
  setup() {
    return {};
  },
});
</script>
```

Output.

![](https://i.gyazo.com/deb1a15b4275183ca2a50a382c6f46d1.png)

## Props

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| query | String | ✓ | Search words. use regular expressions in the search string if `regex` is true. |
| caseSensitive | Boolean |  | Search should be case sensitive. defaults to `false` |
| splitBySpace | Boolean |  | whether split the string with spaces to make it a search string. If false, string being searched as a whole word. defaults to `false` |
| regex | Boolean |  | `query` string is evaluated as a regular expression. default to `false`|
| highlightClass | String or Object or Array |  | The class name to be applied to an highlight tag.|
| highlightStyle | String or Object |  | The inline style to be applied to an highlight tag. |
| highlightTag | String |  | Type of tag to wrap around highlighted matches; defaults to `mark` |
