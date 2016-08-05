var hyperlog = require('hyperlog')
var memdb = require('memdb')

var log = require('../')()
log.createReadStream({ live: true })
  .on('data', console.log)

log.append('hey')
log.append('what')

setTimeout(function () {
  log.setLog(hyperlog(memdb()))
}, 100)
