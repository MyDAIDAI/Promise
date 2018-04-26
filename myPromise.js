function Promise(executor) {
  let _this = this;
  _this.status = 'pending';
  _this.value = undefined;
  _this.reason = undefined;
  _this.onResolvedCallbacks = [];
  _this.onRejectdCallbacks = [];
  function resolve(value) {
    if (_this.status === 'pending') {
      _this.status = 'resolved';
      _this.value = value;
      _this.onResolvedCallbacks.forEach(function (fn) {
        fn();
      });
    }
  }

  function reject(reason) {
    if (_this.status === 'pending') {
      _this.status = 'rejected';
      _this.reason = reason;
      _this.onRejectdCallbacks.forEach(function (fn) {
        fn();
      })
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFulfilled, onRjected) {
  // 返回状态改变的promise，由于状态改变就不能改变了，所以需要返回一个新的，
  // 状态已经改变的promise
  let _this = this;
  let promise2;
  // then执行的时候就判断，但是promise中的函数状态仍然处于pending状态
  if (_this.status === 'resolved') {
    promise2 = new Promise(function (resolve, reject) {
      try {
        let x = onFulfilled(_this.value);
        resolve(x);
      } catch (e) {
        reject(e)
      }
    })

  }
  if (_this.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
      try {
        let x = onRjected(_this.reason);
        resolve(x);
      } catch (e) {
        reject(e);
      }
    })
  }
  // 状态是pending时的处理，异步处理
  if (_this.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      _this.onResolvedCallbacks.push(function () {
        try {
          let x = onFulfilled(_this.value);
          resolve(x);
        } catch (e) {
          reject(e)
        }
      });
      _this.onRejectdCallbacks.push(function () {
        try {
          let x = onRjected(_this.reason);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      })
    })
  }
  return promise2
}
module.exports = Promise