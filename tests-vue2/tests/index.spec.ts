import { mount } from "@vue/test-utils1";
import VueWordHighlighter from "../../vue-word-highlighter/src/components";

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

  describe("regex", () => {
    it("should highlight word if literal", () => {
      const wrapper = createWrapper(
        {
          query: /s\w+y/,
        },
        "Lorem Ipsum is simply dummy text of the printing and typesetting. sticky"
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(2);
      expect(highlightWords.at(0).text()).toBe("simply");
      expect(highlightWords.at(1).text()).toBe("sticky");
    });

    it("should highlight word if instance", () => {
      const wrapper = createWrapper(
        {
          query: new RegExp("s\\w+y"),
        },
        "Lorem Ipsum is simply dummy text of the printing and typesetting. sticky"
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(2);
      expect(highlightWords.at(0).text()).toBe("simply");
      expect(highlightWords.at(1).text()).toBe("sticky");
    });
  });

  describe("textToHighlight", () => {
    it("should highlight word", () => {
      const textToHighlight =
        "Lorem Ipsum is simply dummy text of the printing and typesetting.";
      const wrapper = createWrapper(
        {
          query: "dummy",
          textToHighlight,
        },
        ""
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(1);
      expect(highlightWords.at(0).text()).toBe("dummy");
      expect(wrapper.text()).toBe(textToHighlight);
    });
  });

  describe("highlightTag", () => {
    it("should set specified tag to highlight tag", () => {
      const wrapper = createWrapper(
        {
          query: "dummy",
          highlightTag: "b",
        },
        "Lorem Ipsum is simply dummy text of the printing and typesetting. sticky"
      );

      const highlightWords = wrapper.findAll("b");

      expect(highlightWords.length).toBe(1);
      expect(highlightWords.at(0).text()).toBe("dummy");
      expect(wrapper.find("mark").exists()).toBe(false);
    });
  });

  describe("highlightClass", () => {
    it("should set specified class to highlight tag", () => {
      const wrapper = createWrapper(
        {
          query: "dummy",
          highlightClass: ["red-color"],
        },
        "Lorem Ipsum is simply dummy text of the printing and typesetting. sticky"
      );

      const highlightWords = wrapper.find("mark");

      expect(highlightWords.text()).toBe("dummy");
      expect(highlightWords.classes()[0]).toBe("red-color");
    });
  });

  describe("highlightStyle", () => {
    it("should set specified style to highlight tag", () => {
      const wrapper = createWrapper(
        {
          query: "dummy",
          highlightStyle: {
            color: "green",
          },
        },
        "Lorem Ipsum is simply dummy text of the printing and typesetting. sticky"
      );

      const highlightWords = wrapper.find("mark");

      expect(highlightWords.text()).toBe("dummy");
      expect(highlightWords.attributes().style).toBe("color: green;");
    });
  });

  describe("wrapperTag", () => {
    it("should set specified tag to wrapper tag", () => {
      const textToHighlight =
        "Lorem Ipsum is simply dummy text of the printing and typesetting.";
      const wrapper = createWrapper(
        {
          query: "dummy",
          wrapperTag: "div",
        },
        textToHighlight
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(1);
      expect(highlightWords.at(0).text()).toBe("dummy");
      expect(wrapper.text()).toBe(textToHighlight);
    });
  });

  describe("wrapperClass", () => {
    it("should set specified style to wrapper tag", () => {
      const textToHighlight =
        "Lorem Ipsum is simply dummy text of the printing and typesetting.";
      const wrapper = createWrapper(
        {
          query: "dummy",
          wrapperClass: ["mb-2", "is-primary"],
        },
        textToHighlight
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(1);
      expect(highlightWords.at(0).text()).toBe("dummy");
      expect(wrapper.classes()).toEqual(["mb-2", "is-primary"]);
    });
  });

  describe("emits", () => {
    describe("matches", () => {
      it("should fire at change query", async () => {
        const textToHighlight =
          "Lorem Ipsum is simply dummy text of the printing and typesetting.";
        const wrapper = createWrapper(
          {
            query: "dummy",
          },
          textToHighlight
        );
        expect(wrapper.emitted().matches!.length).toBe(1);
        expect(wrapper.emitted().matches![0][0]).toBe(true);

        await wrapper.setProps({ query: "hello world" });

        expect(wrapper.emitted().matches!.length).toBe(2);
        expect(wrapper.emitted().matches![1][0]).toBe(false);

        await wrapper.setProps({ query: "Lorem" });

        expect(wrapper.emitted().matches!.length).toBe(3);
        expect(wrapper.emitted().matches![2][0]).toBe(true);
      });
    });
  });
});
