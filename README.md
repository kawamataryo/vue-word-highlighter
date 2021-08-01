<p><img width="400" alt="Vue Word highlighter" src="https://user-images.githubusercontent.com/11070996/127788684-906f7756-865f-44ae-b27a-2a80e3c7349b.png"></p>


<a href="https://npmcharts.com/compare/vue-word-highlighter?minimal=true"><img src="https://img.shields.io/npm/dt/vue-word-highlighter.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-word-highlighter"><img src="https://img.shields.io/npm/v/vue-word-highlighter.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-word-highlighter"><img src="https://img.shields.io/npm/l/vue-word-highlighter.svg" alt="License"></a>

The word highlighter library for Vue 2.x & Vue 3.x 🖍  

### [Demo](https://kawamataryo.github.io/vue-word-highlighter/)


## Installation

**Vue 3.x**
```bash
yarn add vue-word-highlighter
# or
npm install vue-word-highlighter
```

**Vue 2.x**  
powered by [vue-demi](https://github.com/antfu/vue-demi).
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
    query="vue"
  >
    The word highlighter library for Vue 2.x & Vue 3.x 💅
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

![](https://i.gyazo.com/ca4c1c6b76a47797cc5318ef6d01d6f2.png)

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

## License

vue-word-highlighter is available under the MIT License.
