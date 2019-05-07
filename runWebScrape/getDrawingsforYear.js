const getDayDateAndCorrespondingImageURLS = require('./getDayDateAndCorrespondingImageURLS')
const getCleanDOM = require('../utils/getCleanDOM')

module.exports = async function getDrawingsforYear(globalState, year) {
  // Get the days of the year
  let yearURLDOM = await getCleanDOM(globalState.mainURL + year + ".html")
  let $ = yearURLDOM
  let days = $('.day')

  // Get all the art for each day of the current year
  // The array of art for each day is an array of promises
  let currentYearDrawingsArray = await getDayDateAndCorrespondingImageURLS($, days, globalState)
  
  // Send back a full year of days,
  // each as a promise array of multiple art work
  let newYDObj = {}
  newYDObj[year] = currentYearDrawingsArray

  return newYDObj
}