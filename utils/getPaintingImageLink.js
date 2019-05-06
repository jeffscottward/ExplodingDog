const getCleanDOM = require('./getCleanDOM')
const globalState = require('./globalState')

module.exports = async function getPaintingImageLink(paintingPageLink) {
  async function retry(err) {
    try {
      this.paintingPageDOM = await getCleanDOM(paintingPageLink)
      if (this.paintingPageDOM !== '404') {
        const $ = this.paintingPageDOM
        const img = $('img')
        const imgSRC = img.attr('src')
        return (globalState.mainURL + imgSRC).replace('//drawing', '/drawing')
      } else {
        return '404'
      }
    } catch (err) {
      console.log(`ERROR - TRYING ${paintingPageLink} AGAIN`)
      retry()
    }
  }
  return retry()
}