<template>
  <div class="fork__tag" @click="openGithub">
    <img :src="githubIcon" class="github__icon" />
    <div class="fork__description">Fork me</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GITHUB_ICON from "../../public/images/github-logo.png";

const GITHUB_REPO = "https://github.com/kawamataryo/vue-word-highlighter";

export default defineComponent({
  name: "ForkTag",
  setup() {
    const openGithub = () => {
      window.open(GITHUB_REPO);
    };
    return {
      githubIcon: GITHUB_ICON,
      openGithub,
    };
  },
});
</script>

<style lang="scss" scoped>
.fork__tag {
  position: fixed;
  z-index: 100;
  top: 16px;
  right: -50px;
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  background-color: #000;
  transform: rotate(45deg);
  transition: background-color 0.5s ease;
  .github__icon {
    width: 75px;
  }
  @media screen and (max-width: 414px) {
    top: 9px;
    right: -56.5px;
    .fork__description {
      display: none;
    }
  }
  @media screen and (min-width: 414px) {
    .fork__description {
      position: absolute;
      bottom: -20px;
      opacity: 0;
      font-weight: 500;
      transition: all 0.2s ease;
      pointer-events: none;
      z-index: 0;
    }
    &:hover {
      transition: background-color 0.2s ease;
      background-color: #444;
      cursor: pointer;
      .fork__description {
        opacity: 0.7;
        bottom: -30px;
      }
    }
  }
}
</style>
