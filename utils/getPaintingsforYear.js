const getCleanDOM = require('./getCleanDOM')
const grabDateAndCorrespondingImageURL = require('./grabDateAndCorrespondingImageURL')

module.exports = async function getPaintingsforYear(globalState, year) {
  let yearURLDOM = await getCleanDOM(globalState.mainURL + year + ".html")
  let $ = yearURLDOM
  let days = $('.day')
  let currentYearDataArray = await grabDateAndCorrespondingImageURL($, days, globalState)
  let newYDObj = {}
  newYDObj[year] = currentYearDataArray
  return newYDObj
}