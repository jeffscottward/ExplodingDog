const updateGlobalState = require('./updateGlobalState')
const getPaintingsforYear = require('./getPaintingsforYear')

module.exports = async function buildPaintingsDirectory(globalState) {
  this.paintingYears = {}
  const paintingYearsData = await globalState.years.map(async year => {
    return (this.paintingYears[year] = await getPaintingsforYear(globalState, year))
  })
  
  return Promise.all(paintingYearsData).then(async completed => {
    const paintingDirectory = await updateGlobalState({ yearsData: completed })
    return paintingDirectory
  })
}