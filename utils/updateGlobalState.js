let globalState = require('./globalState')

module.exports = function updateGlobalState(newState) {
  globalState = Object.assign({}, globalState, newState)
  return globalState
}