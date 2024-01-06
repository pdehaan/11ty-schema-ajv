const { validate } = require("./schemas/index");

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {
  addCollectionValidate("blogs");

  function addCollectionValidate(name) {
    eleventyConfig.addCollection(name, function (collectionApi) {
      const pages = [...collectionApi.getFilteredByTag(name)];
      for (const p of pages) {
        try {
          validate(p.data, name, p.inputPath);
        } catch (err) {
          console.error(err.message);
          process.exitCode = 1;
        }
      }
      return pages;
    });
  }

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
