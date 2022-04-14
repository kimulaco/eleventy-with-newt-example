module.exports = (eleventyConfig) => {
  // Layout Alias
  // https://www.11ty.dev/docs/layouts/#layout-aliasing
  eleventyConfig.addLayoutAlias('default', 'layout/default.njk')

  return {
    dir: {
      input: 'src/html',
      output: 'dist',
    },
  }
}
