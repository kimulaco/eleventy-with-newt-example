const { newt } = require('./newt/index')

module.exports = (eleventyConfig) => {
  // Load styles
  eleventyConfig.addWatchTarget('./src/css/')
  eleventyConfig.addPassthroughCopy({
    'src/css': 'css',
  })

  // Layout Alias
  // https://www.11ty.dev/docs/layouts/#layout-aliasing
  eleventyConfig.addLayoutAlias('default', 'layout/default.njk')

  // Newt Contents
  // https://www.11ty.dev/docs/data-global-custom/
  eleventyConfig.addGlobalData('articles', async () => {
    const { data } = await newt.get('/blog2/article')
    return data.items
  })
  eleventyConfig.addGlobalData('tags', async () => {
    const { data } = await newt.get('/blog2/tag')
    console.log(data)
    return data.items
  })

  return {
    dir: {
      input: 'src/html',
      output: 'dist',
    },
  }
}
