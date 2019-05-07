const getCleanDOM = require('./getCleanDOM')
const updateGlobalState = require('./updateGlobalState')

module.exports = async function buildYearList(globalState) {
  // Go to homepage - get years from html
  this.years = []
  this.mainURLDOM = await getCleanDOM(globalState.mainURL)

  // Get the years from the page
  this.mainURLDOM('.drawings ol li a').each((idx, item) => {
    this.years.push(this.mainURLDOM(item).text())
  })

  // Update the global state with possible years
  const newState = updateGlobalState({ years: this.years })
  return newState
}