var inherits = require('inherits')
var duplexify = require('duplexify')
var EventEmitter = require('events').EventEmitter

module.exports = Log
inherits(Log, EventEmitter)

function Log () {
  var self = this
  if (!(self instanceof Log)) return new Log()
  EventEmitter.call(self)
  self._onpreadd = function (node) { self.emit('preadd', node) }
  self._onadd = function (node) { self.emit('add', node) }
  self._onreject = function (node) { self.emit('reject', node) }
}
Log.prototype.setLog = function (log) {
  if (this._log) {
    this._log.removeListener('preadd', this._onpreadd)
    this._log.removeListener('add', this._onadd)
    this._log.removeListener('reject', this._onreject)
  }
  log.on('preadd', this._onpreadd)
  log.on('add', this._onadd)
  log.on('reject', this._onreject)
  this._log = log
  this.emit('_log', log)
}
Log.prototype.add = function (links, value, opts, cb) {
  if (this._log) this._log.add(links, value, opts, cb)
  else this.once('_log', function (log) { log.add(links, value, opts, cb) })
}
Log.prototype.append = function (value, opts, cb) {
  if (this._log) this._log.append(value, opts, cb)
  else this.once('_log', function (log) { log.append(value, opts, cb) })
}
Log.prototype.batch = function (docs, ops, cb) {
  if (this._log) this._log.batch(docs, opts, cb)
  else this.once('_log', function (log) { log.batch(docs, opts, cb) })
}
Log.prototype.get = function (link, opts, cb) {
  if (this._log) this._log.get(link, opts, cb)
  else this.once('_log', function (log) { log.get(link, opts, cb) })
}
Log.prototype.heads = function (opts, cb) {
  if (this._log) return this._log.heads(opts, cb)
  var d = duplexify.obj()
  this.once('_log', function (log) {
    d.setReadable(log.heads(opts, cb))
  })
  return d
}
Log.prototype.createReadStream = function (opts) {
  if (this._log) return this._log.createReadStream(opts, cb)
  var d = duplexify.obj()
  this.once('_log', function (log) {
    d.setReadable(log.createReadStream(opts))
  })
  return d
}
Log.prototype.createReplicationStream = function (opts) {
  if (this._log) return this._log.createReplicationStream(opts)
  var d = duplexify.obj()
  this.once('_log', function (log) {
    d.setReadable(log.createReplicationStream(opts))
  })
  return d
}
Log.prototype.replicate = function (opts) {
  if (this._log) return this._log.replicate(opts)
  var d = duplexify.obj()
  this.once('_log', function (log) {
    d.setReadable(log.replicate(opts))
  })
  return d
}
