const updateGlobalState = require('../utils/updateGlobalState')
const getDrawingsforYear = require('./getDrawingsforYear')

// Construct an array of Promises to 
// resolve completely before 
// returning the sitemap (aka directory)
function makeArrayOfPromises(globalState) {
  this.arrayOfPromises = []

  globalState.years.map(async year => {
    this.arrayOfPromises.push(getDrawingsforYear(globalState, year))
  })

  return this.arrayOfPromises
}

module.exports = async function buildDrawingsDirectory(globalState) {  
  // Create a promise array of ALL the years
  const yearsPromiseArray = makeArrayOfPromises(globalState)
  
  // Resolve the entire sitemap
  return Promise.all(yearsPromiseArray)
    .then((result) => { 
      const newState = updateGlobalState({ drawings: result })
      return newState
    })
    .catch(() => { console.log('ERROR on YEAR') })
}