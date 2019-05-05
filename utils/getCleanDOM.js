const cheerio = require('cheerio')
const cleaner = require('clean-html')
const axios = require('axios')

module.exports = async function getCleanDOM (url) {
  this.siteRequest = await axios.get(url)
  this.siteURLHTML = this.siteRequest.data

  cleaner.clean(this.siteURLHTML, html => {
    this.siteURLHTMLClean = html
  })

  this.siteURLDOM = cheerio.load(this.siteURLHTMLClean)

  return this.siteURLDOM
}