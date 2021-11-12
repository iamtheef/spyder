const cacheThis = (data) => {
  // replaces old content
  fs.writeFile("cache.json", JSON.stringify(data), (e) => {
    if (!!e) console.error("Failed to write to cache.");
    else console.log("Saved in cache.json!");
  });
  return;
};

module.exports = {
  cacheThis,
};
