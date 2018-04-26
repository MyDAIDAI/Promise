let Promise = require('./myPromise');
// let p = new Promise(function (resolve, reject) {
//   resolve('ok')
// });
// p.then(function (value) {
//   return '1'
// }, function (err) {
//   console.log(err)
// }).then(function (value) {
//   console.log(value)
// });
Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}