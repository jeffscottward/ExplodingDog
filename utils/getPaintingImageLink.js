const getCleanDOM = require('./getCleanDOM')

module.exports = async function getPaintingImageLink(paintingPageLink) {
  this.paintingPageDOM = await getCleanDOM(paintingPageLink)
  const $ = this.paintingPageDOM
  const img = $('img')
  const imgSRC = img.attr('src')
  return imgSRC
}