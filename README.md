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
TODO


## Props

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| query | String | ✓ | Search words. use regular expressions in the search string if `regex` is true. |
| caseSensitive | Boolean |  | Search should be case sensitive. defaults to `false` |
| splitBySpace | Boolean |  | Whether string being searched as a whole word. If false, string being searched as a whole word. defaults to `false` |
| regex | Boolean |  | `query` string is evaluated as a regular expression. default to `false`|
| highlightClass | String or Object or Array |  | The class name to be applied to an highlight tag.|
| highlightStyle | String or Object |  | The inline style to be applied to an highlight tag. |
| highlightTag | String |  | Type of tag to wrap around highlighted matches; defaults to `mark` |
