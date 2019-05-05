let globalState = require('./globalState')

module.exports = async function updateGlobalState(newState) {
  globalState = Object.assign({}, globalState, newState)
  return globalState
}