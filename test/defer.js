var hyperlog = require('hyperlog')
var memdb = require('memdb')
var test = require('tape')

test('deferred writes', function (t) {
  t.plan(1)
  var log = require('../')()
  var docs = []
  log.createReadStream({ live: true })
    .on('data', push)
    .on('end', compare)

  log.add('hey')
  log.append('what')
  log.batch([
    { links: [], value: 'ever' },
    { links: [], value: 'ugh' }
  ])
  setTimeout(function () {
    log.setLog(hyperlog(memdb()))
  }, 1)
  function push (doc) { docs.push(doc.value) }
  function compare () {
    t.deepEqual(docs, [ 'hey', 'what', 'ever', 'ugh' ])
  }
})
