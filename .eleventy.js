const htmlMinifier = require("html-minifier")
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
    const tags = await Promise.all(data.items.map((tag) => {
      return new Promise(async (resolve, reject) => {
        try {
          const articles = await newt.get('/blog2/article', { tags: tag.slug })
          resolve({
            ...tag,
            articles: articles.data,
          })
        } catch (error) {
          reject(error)
        }
      })
    }))
    return tags
  })

  // Output
  // https://www.11ty.dev/docs/config/#transforms
  eleventyConfig.addTransform('htmlMinifier', (content, outputPath) => {
    if(outputPath && outputPath.endsWith('.html')) {
      return htmlMinifier.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
    }
    return content
  })

  return {
    dir: {
      input: 'src/html',
      output: 'dist',
    },
  }
}
