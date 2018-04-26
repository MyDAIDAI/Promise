function Promise(executor) {
  let _this = this;
  _this.status = 'pending';
  _this.value = undefined;
  _this.reason = undefined;

  function resolve(value) {
    if (_this.status === 'pending') {
      _this.status = 'resolved';
      _this.value = value;
    }
  }

  function reject(reason) {
    if (_this.status === 'pending') {
      _this.status = 'rejected';
      _this.reason = reason;
      console.log('status： ', _this.status);
    }
  }
  executor(resolve, reject);
}

Promise.prototype.then = function (onFulfilled, onRjected) {
  let _this = this;
  console.log('then status: ', _this.status)
  if (_this.status === 'resolved') {
    onFulfilled(_this.value);
  }
  if (_this.status === 'rejected') {
    onRjected(_this.reason);
  }
}
module.exports = Promise