// @ts-expect-error: TODO
import { mount } from "@vue/test-utils";
import VueWordHighlighter from "../../vue-word-highlighter/src/components";

describe("VueWordHighlighter", () => {
  const createWrapper = (props: Record<string, any>, defaultSlot: string) => {
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
    expect(highlightWords[0].text()).toBe("actor");
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
        expect(highlightWords[0].text()).toBe("Convallis");
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
        expect(highlightWords[0].text()).toBe("Convallis");
        expect(highlightWords[1].text()).toBe("convallis");
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
        expect(highlightWords[0].text()).toBe("Lorem");
        expect(highlightWords[1].text()).toBe("Ipsum");
        expect(highlightWords[2].text()).toBe("lorem");
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
        expect(highlightWords[0].text()).toBe("Lorem Ipsum");
      });
    });
  });

  describe("regex", () => {
    it("should highlight word if literal", () => {
      const wrapper = createWrapper(
        {
          query: /s\w+y/,
          regex: true,
        },
        "Lorem Ipsum is simply dummy text of the printing and typesetting. sticky"
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(2);
      expect(highlightWords[0].text()).toBe("simply");
      expect(highlightWords[1].text()).toBe("sticky");
    });

    it("should highlight word if instance", () => {
      const wrapper = createWrapper(
        {
          query: new RegExp("s\\w+y"),
          regex: true,
        },
        "Lorem Ipsum is simply dummy text of the printing and typesetting. sticky"
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(2);
      expect(highlightWords[0].text()).toBe("simply");
      expect(highlightWords[1].text()).toBe("sticky");
    });
  });

  describe("textToHighlight", () => {
    it("should highlight word", () => {
      const textToHighlight =
        "Lorem Ipsum is simply dummy text of the printing and typesetting.";
      const wrapper = createWrapper(
        {
          query: "dummy",
          regex: true,
          textToHighlight,
        },
        ""
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(1);
      expect(highlightWords[0].text()).toBe("dummy");
      expect(wrapper.text()).toBe(textToHighlight);
    });
  });
});
