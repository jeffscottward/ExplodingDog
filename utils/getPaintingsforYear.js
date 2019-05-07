const getCleanDOM = require('./getCleanDOM')
const grabDateAndCorrespondingImageURLS = require('./grabDateAndCorrespondingImageURLS')

module.exports = async function getPaintingsforYear(globalState, year) {
  // Get HTML list of art for that year
  let yearURLDOM = await getCleanDOM(globalState.mainURL + year + ".html")
  let $ = yearURLDOM
  let days = $('.day')
  
  // Get all the art for each day of the current year
  // The array of art for each day is an array of promises
  let currentDayDataArray = await grabDateAndCorrespondingImageURLS($, days, globalState)
  
  // Send back a full year of days,
  // each as a promise array of multiple art work
  let newYDObj = {}
  newYDObj[year] = currentDayDataArray

  return newYDObj
}