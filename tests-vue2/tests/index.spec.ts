import { mount } from "@vue/test-utils1";
import VueWordHighlighter from "vue-word-highlighter";

describe("VueWordHighlighter", () => {
  const createWrapper = (
    props: Record<string, unknown>,
    defaultSlot: string
  ) => {
    return mount(VueWordHighlighter, {
      propsData: props,
      slots: {
        default: defaultSlot,
      },
    });
  };

  it("should highlight word", () => {
    const wrapper = createWrapper({ query: "actor" }, "He are actor");

    const highlightWords = wrapper.findAll("mark");

    expect(highlightWords.length).toBe(1);
    expect(highlightWords.at(0).text()).toBe("actor");
  });

  describe("caseSensitive", () => {
    describe("true", () => {
      it("should highlight word", () => {
        const wrapper = createWrapper(
          { query: "Convallis", caseSensitive: true },
          "Convallis is convallis"
        );

        const highlightWords = wrapper.findAll("mark");

        expect(highlightWords.length).toBe(1);
        expect(highlightWords.at(0).text()).toBe("Convallis");
      });
    });

    describe("false", () => {
      it("should highlight word", () => {
        const wrapper = createWrapper(
          {
            query: "Convallis",
            caseSensitive: false,
          },
          "Convallis is convallis"
        );

        const highlightWords = wrapper.findAll("mark");

        expect(highlightWords.length).toBe(2);
        expect(highlightWords.at(0).text()).toBe("Convallis");
        expect(highlightWords.at(1).text()).toBe("convallis");
      });
    });
  });

  describe("splitBySpace", () => {
    describe("true", () => {
      it("should highlight word", () => {
        const wrapper = createWrapper(
          {
            query: "lorem ipsum",
            splitBySpace: true,
          },
          "Lorem Ipsum is simply dummy text of the printing and typesetting. lorem"
        );

        const highlightWords = wrapper.findAll("mark");

        expect(highlightWords.length).toBe(3);
        expect(highlightWords.at(0).text()).toBe("Lorem");
        expect(highlightWords.at(1).text()).toBe("Ipsum");
        expect(highlightWords.at(2).text()).toBe("lorem");
      });
    });

    describe("false", () => {
      it("should highlight word", () => {
        const wrapper = createWrapper(
          {
            query: "lorem ipsum",
            splitBySpace: false,
          },
          "Lorem Ipsum is simply dummy text of the printing and typesetting. lorem"
        );

        const highlightWords = wrapper.findAll("mark");

        expect(highlightWords.length).toBe(1);
        expect(highlightWords.at(0).text()).toBe("Lorem Ipsum");
      });
    });
  });
});
