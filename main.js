function Promise(excutor) {
  let _this = this
  _this.status = 'pending'
  _this.value = undefined
  _this.reason = undefined

  // 内置一个resolve方法，设置状态成功时的数据
  function resolve(value) {
    if (_this.status === 'pending') {
      _this.status = 'resolved'
      _this.value = value
    }
  }
  // 内置一个reject方法，设置状态失败时的数据
  function reject(reason) {
    if (_this.status === 'pending') {
      _this.status = 'rejected'
      _this.reason = reason
    }
  }
  excutor(resolve, reason)
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  let _this = this
  if (_this.status === 'resolved') {
    onFulfilled(_this.value)
  }
  if (_this.status === 'rejected') {
    onRejected(_this.reason)
  }
}
