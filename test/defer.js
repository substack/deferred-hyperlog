var hyperlog = require('hyperlog')
var memdb = require('memdb')
var test = require('tape')

test('deferred writes', function (t) {
  t.plan(1)
  var log = require('../')()
  var docs = []
  log.createReadStream({ live: true })
    .on('data', push)

  log.add([],'hey')
  log.append('what')
  log.batch([
    { links: [], value: 'ever' },
    { links: [], value: 'ugh' }
  ])
  setTimeout(function () {
    log.setLog(hyperlog(memdb()))
  }, 1)
  function push (doc) {
    docs.push(doc.value)
    if (docs.length === 4) compare()
  }
  function compare () {
    t.deepEqual(docs.map(tostr).sort(),
      [ 'ever', 'hey', 'ugh', 'what' ])
  }
})
function tostr (b) { return b.toString() }
