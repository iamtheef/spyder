const formParams = (e) => {
  if (!!e.class) return { class: e.class };
  if (!!e.id) return { id: e.id };
  return {};
};

module.exports = {
  formParams,
};
