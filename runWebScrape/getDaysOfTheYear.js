const getCleanDOM = require('../utils/getCleanDOM')

module.exports = async function getDaysOfTheYear(globalState, year) {
  // Get HTML list of art for that year
  let yearURLDOM = await getCleanDOM(globalState.mainURL + year + ".html")
  let $ = yearURLDOM
  let days = $('.day')
  return days
}