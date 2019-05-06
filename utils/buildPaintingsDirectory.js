const updateGlobalState = require('./updateGlobalState')
const getPaintingsforYear = require('./getPaintingsforYear')

module.exports = async function buildPaintingsDirectory(globalState) {
  this.paintingYears = {}
  // const paintingYearsData = await 
  return globalState.years.map(async year => {
    this.paintingYears[year] = await getPaintingsforYear(globalState, year)
    // return Promise.all(this.paintingYears).then(async completed => {
    //   return updateGlobalState({ yearsData: completed })
    // })
  })
}