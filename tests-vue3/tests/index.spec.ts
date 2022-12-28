import { mount } from "@vue/test-utils";
import VueWordHighlighter from "../../vue-word-highlighter/src/components";
import WrappedWordHighlighter from "./fixtures/WrappedWordHighlighter.vue";
import { describe, it, expect } from "vitest";

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

  describe("diacriticsSensitive", () => {
    describe("true", () => {
      it("should highlight word", () => {
        const wrapper = createWrapper(
          { query: "Internationalizati0n", diacriticsSensitive: true },
          "Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ"
        );

        const highlightWords = wrapper.findAll("mark");

        expect(highlightWords.length).toBe(0);
      });
    });

    describe("false", () => {
      it("should highlight word", () => {
        const wrapper = createWrapper(
          { query: "Internationalizati0n", diacriticsSensitive: false },
          "aaa Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ"
        );

        const highlightWords = wrapper.findAll("mark");

        expect(highlightWords.length).toBe(1);
        expect(highlightWords[0].text()).toBe("Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ");
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
      expect(highlightWords[0].text()).toBe("dummy");
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
      expect(highlightWords[0].text()).toBe("dummy");
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
      expect(highlightWords[0].text()).toBe("dummy");
      expect(wrapper.classes()).toEqual(["mb-2", "is-primary"]);
    });
  });

  describe("emits", () => {
    describe("matches", () => {
      it("should fire at change query", async () => {
        const textToHighlight =
          "Lorem Ipsum is simply dummy text of the printing and typesetting. ipsum";
        const wrapper = createWrapper(
          {
            query: "dummy",
          },
          textToHighlight
        );

        expect(wrapper.emitted<[][]>().matches.length).toBe(1);
        expect(wrapper.emitted<[][]>().matches[0][0]).toEqual(["dummy"]);

        await wrapper.setProps({ query: "hello world" });

        expect(wrapper.emitted<[][]>().matches.length).toBe(2);
        expect(wrapper.emitted<[][]>().matches[1][0]).toEqual([]);

        await wrapper.setProps({ query: "ipsum" });

        expect(wrapper.emitted<[][]>().matches.length).toBe(3);
        expect(wrapper.emitted<[][]>().matches[2][0]).toEqual([
          "Ipsum",
          "ipsum",
        ]);
      });
    });
  });

  describe("htmlToHighlight", () => {
    it("should highlight word", () => {
      const htmlToHighlight = `
<b>hoge dummy</b>
foo dummy
<script>alert('dummy')</script>
`;
      const expectedText = `
<span class="">
<b>hoge <mark class="red-color" style="font-weight: bold">dummy</mark></b>
foo <mark class="red-color" style="font-weight: bold">dummy</mark>
<script>alert('dummy')</script>
</span>
`.trim();
      const wrapper = createWrapper(
        {
          query: "dummy",
          highlightClass: "red-color",
          highlightStyle: "font-weight: bold",
          htmlToHighlight,
        },
        ""
      );

      const highlightWords = wrapper.findAll("mark");

      expect(highlightWords.length).toBe(2);
      expect(highlightWords[0].text()).toBe("dummy");
      expect(highlightWords[1].text()).toBe("dummy");
      expect(wrapper.html()).toBe(expectedText);
    });
  });
});

describe("VueWordHighlighter if wrapped", () => {
  const createWrapper = (
    props: Record<string, unknown>,
    defaultSlot: string
  ) => {
    return mount(WrappedWordHighlighter, {
      propsData: props,
      slots: {
        default: defaultSlot,
      },
    });
  };

  it("should highlight word with wrapped component", () => {
    const wrapper = createWrapper({ query: "actor" }, "He are actor");

    const highlightWords = wrapper.findAll("mark");

    expect(highlightWords.length).toBe(1);
    expect(highlightWords[0].text()).toBe("actor");
  });
});
