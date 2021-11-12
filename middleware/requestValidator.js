const { booleanify, isBool } = require("../utils/booleanify");
const {
  validateElementsStructure,
} = require("../utils/validateElementsStructure");

const validateRequest = (req, res, next) => {
  const { url, isSPA, images, links, rawContent, elements } = req.body;
  if (!url || url.length < 1) {
    res.status(400).send({ error: "`url` field is required." });
    return;
  }

  if (typeof url !== "string") {
    res.status(400).send({ error: "`url` field must be a string type." });
    return;
  }

  if (!!isSPA && !isBool(isSPA)) {
    res.status(400).send({ error: "`isSPA` field must be a boolean type." });
    return;
  } else {
    req.body.isSPA = booleanify(isSPA);
  }

  if (!!images && !isBool(images)) {
    res.status(400).send({ error: "`images` field must be a boolean type." });
    return;
  } else {
    req.body.images = booleanify(images);
  }
  console.log(req.body);

  if (!!links && !isBool(links)) {
    res.status(400).send({ error: "`links` field must be a boolean type." });
    return;
  } else {
    req.body.links = booleanify(links);
  }

  if (!!rawContent && !isBool(rawContent)) {
    res
      .status(400)
      .send({ error: "`rawContent` field must be a boolean type." });
    return;
  } else {
    req.body.rawContent = booleanify(rawContent);
  }

  if (!!elements && !["object", "string"].includes(typeof elements)) {
    res
      .status(400)
      .send({ error: "`elements` array must be a type of array or string." });
    return;
  } else if (!!elements && typeof elements === "string") {
    try {
      req.body.elements = JSON.parse(elements);
    } catch (e) {
      res.send({ error: e.message });
      return;
    }
  }

  if (!!elements && req.body.elements.length < 1) {
    res
      .status(400)
      .send({ error: "`elements` array must have at least one element." });
    return;
  }

  if (!!elements) {
    const { error, isValid } = validateElementsStructure(req.body.elements);
    if (!isValid) {
      res.status(400).send({ error: error });
      return;
    } else {
      req.body.elements.forEach((el) => {
        el.includeAttrs = booleanify(el.includeAttrs);
      });
    }
  }

  if (
    !req.body.images &&
    !req.body.links &&
    !req.body.rawContent &&
    !req.body.elements
  ) {
    res.status(400).send({
      error:
        "You must use at least one field of 'images', 'links', 'rawContent' or 'elements' to retrieve content.",
    });
    return;
  }

  next();
};

module.exports = {
  validateRequest,
};
