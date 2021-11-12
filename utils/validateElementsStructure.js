const { isBool, booleanify } = require("./booleanify");
const validateElementsStructure = (elements) => {
  for (let el of elements) {
    if (!el.tagName) {
      return { isValid: false, error: "Each element must include a tag name." };
    }

    if (!!el.includeAttrs && !isBool(el.includeAttrs)) {
      return { isValid: false, error: "`includeAttrs` must be a boolean." };
    }
  }

  return { isValid: true, error: null };
};

module.exports = {
  validateElementsStructure,
};
