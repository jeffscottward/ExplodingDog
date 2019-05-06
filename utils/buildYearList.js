const getCleanDOM = require('./getCleanDOM')
const updateGlobalState = require('./updateGlobalState')

module.exports = async function buildYearList(globalState) {
  this.years = []
  this.mainURLDOM = await getCleanDOM(globalState.mainURL)

  this.mainURLDOM('.drawings ol li a').each((idx, item) => {
    this.years.push(this.mainURLDOM(item).text())
  })

  const newState = updateGlobalState({ years: this.years })
  return newState
}