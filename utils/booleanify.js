const booleanify = (str) => {
  if (!str) return false;
  if (["false", "False", false].includes(str)) return false;
  return true;
};

const isBool = (bool) => {
  if (!["string", "boolean"].includes(typeof bool)) return false;
  return (
    [true, false].includes(bool) ||
    ["true", "false"].includes(bool.toLowerCase())
  );
};

module.exports = {
  booleanify,
  isBool,
};
