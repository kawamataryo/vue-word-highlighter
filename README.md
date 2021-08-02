<p><img width="400" alt="Vue Word highlighter" src="https://user-images.githubusercontent.com/11070996/127788684-906f7756-865f-44ae-b27a-2a80e3c7349b.png"></p>


<a href="https://npmcharts.com/compare/vue-word-highlighter?minimal=true"><img src="https://img.shields.io/npm/dt/vue-word-highlighter.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-word-highlighter"><img src="https://img.shields.io/npm/v/vue-word-highlighter.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-word-highlighter"><img src="https://img.shields.io/npm/l/vue-word-highlighter.svg" alt="License"></a>

The word highlighter library for Vue 2.x & Vue 3.x. 

### [Demo](https://kawamataryo.github.io/vue-word-highlighter/)
### [CodeSandbox](https://codesandbox.io/s/vue3-word-highlighter-example-u2bhe)


## Installation

### Vue 3.x
```bash
yarn add vue-word-highlighter
# or
npm install vue-word-highlighter
```

### Vue 2.x
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
    The word highlighter library for Vue 2.x Vue 3.x 💅
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
| query | String or RegExp | ✓ | Search words. Can be use string or regular expressions. |
| caseSensitive | Boolean |  | Search should be case sensitive. defaults to `false`. |
| splitBySpace | Boolean |  | Whether split the string with spaces to make it a search string. If false, string being searched as a whole word. defaults to `false`. When query is set to a RegExp, the value of splitBySpace will be set to false.  |
| highlightTag | String |  | Type of tag to wrap around highlighted matches; defaults to `mark`. |
| highlightClass | String or Object or Array |  | Classes to be added to highlighted tag. Similar to class bindings in vue, it accepts Array syntax, Object syntax, or class as String.|
| highlightStyle | String or Object or Array | | Styles to be applied to highlighted tag. Similar to style bindings in vue, it accepts Array syntax, Object syntax, or plain styling as String. |
| wrapperTag | String |  | Type of tag to wrap around whole text; defaults to `span`. |
| wrapperClass | String or Object or Array |  | Classes to be added to  wrap around whole tag. Similar to class bindings in vue, it accepts Array syntax, Object syntax, or class as String. |

## License

vue-word-highlighter is available under the MIT License.
