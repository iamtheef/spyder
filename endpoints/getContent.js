const { loadPage } = require("../utils/loadPage");
const { formParams } = require("../utils/formParams");
const JSSoup = require("jssoup").default;

const getContent = async ({ body }, res) => {
  const { url, isSPA, images, links, rawContent, rawText, elements } = body;
  const C = {};
  const content = await loadPage(url, isSPA);
  const soup = new JSSoup(content);

  if (images) {
    C.images = soup.findAll("img").map((img) => img.attrs.src);
  }

  if (links) {
    C.links = soup.findAll("a").map((link) => link.attrs.href);
  }

  if (rawContent) {
    C.rawContent = content;
  }

  if (rawText) {
    C.rawContent = soup.text;
  }

  if (!!elements) {
    C.elements = [];
    elements.forEach((e) => {
      C.elements.push(
        soup.findAll(e.tagName, formParams(e)).map((l) => ({
          text: e.include.includes("text") ? l.text : undefined,
          attrs: e.include.includes("attrs") ? l.attrs : undefined,
          dom: e.include.includes("dom") ? l.prettify() : undefined,
        }))
      );
    });
  }

  res.send(C);
  return;
};

module.exports = {
  getContent,
};
