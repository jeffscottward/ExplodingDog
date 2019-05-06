const getCleanDOM = require('./getCleanDOM')

module.exports = async function getPaintingImageLink(paintingPageLink) {
  async function retry(err) {
    try {
      this.paintingPageDOM = await getCleanDOM(paintingPageLink)
      if (this.paintingPageDOM !== '404') {
        const $ = this.paintingPageDOM
        const img = $('img')
        const imgSRC = img.attr('src')
        return imgSRC
      } else {
        return '404'
      }
    } catch (err) {
      // if(!err === err )
      // console.log(paintingPageLink)
      // console.log({err})
      console.log('TRYING AGAIN')
      retry()
    }
  }
  return retry()
}