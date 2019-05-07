let globalState = require('../state/globalState')

module.exports = function updateGlobalState(newState) {
  globalState = Object.assign({}, globalState, newState)
  return globalState
}