const curry = require('./curry')

const delay = (duration, value) =>
  new Promise(resolve => setTimeout(resolve, duration, value))

module.exports = curry(delay)
