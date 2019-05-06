const updateGlobalState = require('./updateGlobalState')
const getPaintingsforYear = require('./getPaintingsforYear')

function makePromiseArray(globalState) {
  this.promiseArray = []

  globalState.years.map(async year => {
    this.promiseArray.push(getPaintingsforYear(globalState, year))
  })

  return this.promiseArray
}

module.exports = async function buildPaintingsDirectory(globalState) {  
  const yearItemPromiseArray = makePromiseArray(globalState)
  return Promise.all(yearItemPromiseArray)
    .then((result) => { 
      const newState = updateGlobalState({ yearsData: result })
      return newState
    })
    .catch(() => { console.log('ERROR on YEAR') })
}