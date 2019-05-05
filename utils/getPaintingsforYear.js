
const getCleanDOM = require('./getCleanDOM')
const rate = 1000 // in milliseconds
const throttle = require('promise-ratelimit')(rate)

async function getPaintingImageLink (paintingPageLink) {
  console.log({paintingPageLink})
  console.log('GET IMG- ' + paintingPageLink)
  this.paintingPageDOM = await getCleanDOM(paintingPageLink)
  const $ = this.paintingPageDOM
  const img = $('img')
  const imgSRC = img.attr('src')
  return imgSRC
}

async function grabDateAndCorrespondingImageURL($, days, globalState) {
  this.currentYearData = {}
  
  $(days).each((idx, day) => {
    const date = $(day)
      .find('h3')
      .text()
    this.currentYearData[date] = []

    $(day)
      .find('a')
      .each(async (indx, paintingPageLink) => {
        // console.log(this.currentYearData[date])
        let pageLink = (globalState.mainURL + paintingPageLink.attribs.href).replace('//title', '/title')
        let imgLink = 'X'
        try {
          await throttle()
          imgLink = await getPaintingImageLink(pageLink)
        } catch (err) {
          throw (err)
        }
        this.currentYearData[date].push(imgLink)
      })
  })

  return this.currentYearData
}

module.exports = async function getPaintingsforYear (globalState, year) {
  
  // await throttle()
  console.log('GET PAGE - ' + globalState.mainURL + year + ".html")
  this.yearURLDOM = await getCleanDOM(globalState.mainURL + year + ".html")
  let $ = this.yearURLDOM
  let days = $('.day')
  
  const currentYearData = await grabDateAndCorrespondingImageURL($,days, globalState)
  console.log(currentYearData)

  let newYDObj = {}
  newYDObj[year] = currentYearData

  return newYDObj
}