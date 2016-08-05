# deferred-hyperlog

defer operations to a [hyperlog][1]

[1]: https://npmjs.com/package/hyperlog

# example

``` js
var hyperlog = require('hyperlog')
var memdb = require('memdb')

var log = require('deferred-hyperlog')()
log.createReadStream({ live: true })
  .on('data', console.log)

log.append('hey')
log.append('what')

setTimeout(function () {
  log.setLog(hyperlog(memdb()))
}, 100)
```

# api

``` js
var dlog = require('deferred-hyperlog')
```

## var log = dlog()

Create a new deferred hyperlog instance `log`.
All of the methods available to hyperlogs are provided by `log`, but no
operations will be performed until `log.setLog()` is called.

## log.setLog(newlog)

Defer operations to `newlog`, a hyperlog instance.

# install

```
npm install deferred-hyperlog
```

# license

BSD
