let readFile = require('fs').readFile;

function getFile(url) {
  return new Promise((resolve, reject) => {
    readFile(url, 'utf8', function (err, data) { 
      resolve(data)
    })
  })
}
getFile('1.text').then(data => {
  return getFile(data)
}).then(data => {
  return getFile(data)
}).then(data => {
  console.log(data)
})