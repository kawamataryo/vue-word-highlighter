<template>
  <h1 class="title is-size-4">Input</h1>
  <div class="field">
    <label class="label">Search words</label>
    <div class="control">
      <input
        :value="query"
        class="input is-primary"
        type="text"
        placeholder="words"
        @input="onInput('query', $event)"
      />
    </div>
  </div>
  <label class="label">Options</label>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control">
      <input
        id="options-split-by-space"
        :checked="splitBySpace"
        class="is-checkradio is-primary"
        type="checkbox"
        @change="onChange('splitBySpace', $event)"
      />
      <label for="options-split-by-space">Split by space</label>
    </div>
    <div class="control">
      <input
        id="options-case-sensitive"
        class="is-checkradio is-primary"
        :checked="caseSensitive"
        type="checkbox"
        @change="onChange('caseSensitive', $event)"
      />
      <label for="options-case-sensitive">Case sensitive</label>
    </div>
    <div class="control">
      <input
        id="options-diacritics-sensitive"
        class="is-checkradio is-primary"
        :checked="diacriticsSensitive"
        type="checkbox"
        @change="onChange('diacriticsSensitive', $event)"
      />
      <label for="options-diacritics-sensitive">Diacritics sensitive</label>
    </div>
  </div>
  <div class="field is-hidden-mobile">
    <label class="label">Search target text</label>
    <textarea
      :value="paragraph"
      class="textarea"
      placeholder="Search target text"
      rows="12"
      @input="onInput('paragraph', $event)"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type EmitName =
  | "query"
  | "paragraph"
  | "caseSensitive"
  | "splitBySpace"
  | "diacriticsSensitive";

export default defineComponent({
  name: "InputBlock",
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
  emits: [
    "update:query",
    "update:paragraph",
    "update:caseSensitive",
    "update:splitBySpace",
    "update:diacriticsSensitive",
  ],
  setup(_, ctx) {
    const onChange = (name: EmitName, e: { target: HTMLInputElement }) => {
      ctx.emit(`update:${name}`, e.target.checked);
    };
    const onInput = (name: EmitName, e: { target: HTMLInputElement }) => {
      ctx.emit(`update:${name}`, e.target.value);
    };
    return {
      onChange,
      onInput,
    };
  },
});
</script>
