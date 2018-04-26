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
      _.onRejectdCallbacks.forEach(function (fn) {
        fn();
      })
    }
  }
  executor(resolve, reject);
}

Promise.prototype.then = function (onFulfilled, onRjected) {
  let _this = this;
  // then执行的时候就判断，但是promise中的函数状态仍然处于pending状态
  if (_this.status === 'resolved') {
    onFulfilled(_this.value);
  }
  if (_this.status === 'rejected') {
    onRjected(_this.reason);
  }
  // 状态是pending时的处理，异步处理
  if (_this.status === 'pending') {
    _this.onResolvedCallbacks.push(function () {
      onFulfilled(_this.value);
    });
    _this.onRejectdCallbacks.push(function () {
      onRjected(_this.reason);
    })
  }

}
module.exports = Promise