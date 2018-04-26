let Promise = require('./myPromise');
let p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('resolve');
  }, 1000);
});
p.then(function (value) {
  console.log(value)
}, function (err) {
  console.log(err)
});