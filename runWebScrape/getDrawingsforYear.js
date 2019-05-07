const getDateAndCorrespondingImageURLS = require('./getDayDateAndCorrespondingImageURLS')
const getDaysOfTheYear = require('./getDaysOfTheYear')

module.exports = async function getDrawingsforYear(globalState, year) {
  // Get the days of the year
  const days = getDaysOfTheYear(globalState, year)

  // Get all the art for each day of the current year
  // The array of art for each day is an array of promises
  let currentYearDrawingsArray = await getDateAndCorrespondingImageURLS($, days, globalState)
  
  // Send back a full year of days,
  // each as a promise array of multiple art work
  let newYDObj = {}
  newYDObj[year] = currentYearDrawingsArray

  return newYDObj
}