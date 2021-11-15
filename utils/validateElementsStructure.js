const validateElementsStructure = (elements) => {
  for (let el of elements) {
    for (let prop of Object.keys(el)) {
      if (!["tagName", "include", "id", "class"].includes(prop)) {
        return {
          isValid: false,
          error: `'${prop}' is not an allowed key.`,
        };
      }
    }

    if (!el.tagName) {
      return { isValid: false, error: "Each element must include a tag name." };
    }

    if (!!el.include && el.include.constructor !== Array) {
      return { isValid: false, error: "`include` must be an array." };
    }

    if (!!el.include && !el.include.length) {
      return {
        isValid: false,
        error: "`include` must have at least one prop.",
      };
    }

    if (!!el.include) {
      for (let prop of el.include) {
        if (typeof prop !== "string") {
          return {
            isValid: false,
            error: `'${prop}' is not a string type.`,
          };
        }

        if (!["dom", "text", "attrs"].includes(prop)) {
          return {
            isValid: false,
            error: `'${prop}' is not an allowed value.`,
          };
        }
      }
    }
  }

  return { isValid: true, error: null };
};

module.exports = {
  validateElementsStructure,
};
