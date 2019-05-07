const getCleanDOM = require('./getCleanDOM')
const globalState = require('./globalState')

module.exports = async function getPaintingImageLink(paintingPageLink) {
  async function retry(err) {
    try {
      // Get the HTML
      this.paintingPageDOM = await getCleanDOM(paintingPageLink)

      // Make sure its not a dead link first
      if (this.paintingPageDOM !== '404') {
        const $ = this.paintingPageDOM
        const img = $('img')
        const imgSRC = img.attr('src')
        
        // Create and return a URL of the art
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