const getCleanDOM = require('../utils/getCleanDOM')
const globalState = require('../state/globalState')

module.exports = async function getdrawingImageLink(drawingPageLink) {
  async function retry(err) {
    try {
      // Get the HTML
      this.drawingPageDOM = await getCleanDOM(drawingPageLink)

      // Make sure its not a dead link first
      if (this.drawingPageDOM !== '404') {
        const $ = this.drawingPageDOM
        const img = $('img')
        const imgSRC = img.attr('src')
        
        // Create and return a URL of the art
        return (globalState.mainURL + imgSRC).replace('//drawing', '/drawing')
      } else {
        return '404'
      }
    } catch (err) {
      console.log(`ERROR - TRYING ${drawingPageLink} AGAIN`)
      retry()
    }
  }
  return retry()
}