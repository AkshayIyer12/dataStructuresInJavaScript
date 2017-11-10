function HashTable () {
  this.SIZE = 16
  this.currentSize = 0
  this.storage = new Array(this.SIZE)
}
function hashCode (string, size) {
  var hash = 0
  if (string.length === 0) return hash
  for (var i = 0; i < string.length; i++) {
    var letter = string.charCodeAt(i)
    hash = ((hash << 5) - hash) + letter
    hash = hash & hash
  }
  return Math.abs(hash) % size
}
HashTable.prototype.set = function (key, value) {
  let hashKey = hashCode(key, this.SIZE)
  if (!this.storage[hashKey]) {
    let obj = {}
    obj[key] = value
    this.storage[hashKey] = obj
    this.currentSize++
  } else {
    this.storage[hashKey][key] = value
    this.currentSize++
  }
  if (this.currentSize >= 0.75 * this.SIZE) {
    this.rehash()
  }
}
// HashTable.prototype.rehash = function (size) {
//   this.SIZE *= 2
//   this.currentSize = 0
//   let storage = this.storage
//   this.storage = new Array(this.SIZE)
//   storage.forEach(obj => {
//     for (let key in obj) {
//       let hashKey = hashCode(key, this.SIZE)
//       if (!this.storage[hashKey]) {
//         let tempObj = {}
//         tempObj[key] = obj[key]
//         this.storage[hashKey] = tempObj
//         this.currentSize++
//       } else {
//         // check for passing in same key with diff value
//         this.storage[hashKey][key] = obj[key]
//         this.currentSize++
//       }
//     }
//   })
// }
HashTable.prototype.get = function (key) {
  let hashKey = hashCode(key, this.SIZE)
  return (this.storage[hashKey]) ? this.storage[hashKey][key] : undefined
}
HashTable.prototype.remove = function (key) {
  let value = this.get(key)
  let hashKey = hashCode(key, this.SIZE)
  if (value) delete this.storage[hashKey][key]
  if (!Object.keys(this.storage[hashKey]).length) {
    this.storage[hashKey] = undefined
    this.currentSize--
  }
  if (this.currentSize <= 0.25 * this.SIZE && this.SIZE > 16) {
    this.rehash()
  }
  return value
}
HashTable.prototype.rehash = function (resize, size) {
  resize ? this.SIZE *= 2 : this.SIZE = Math.ceil(this.SIZE / 2)
  this.currentSize = 0
  let storage = this.storage
  this.storage = new Array(this.SIZE)
  storage.forEach(obj => {
    for (let key in obj) {
      let hashKey = hashCode(key, this.SIZE)
      if (!this.storage[hashKey]) {
        let tempObj = {}
        tempObj[key] = obj[key]
        this.storage[hashKey] = tempObj
      } else {
        this.storage[hashKey][key] = obj[key]
        this.currentSize++
      }
    }
  })
}
HashTable.prototype.retrieveAll = function () {
  console.log(this.storage)
  // console.log(this._limit);
}
var HashT = new HashTable()
HashT.set('Alex Hawkins', '5105991930')
HashT.set('Boo Radley', '5205891970')
HashT.set('Vance Carter', '1205891970')
HashT.set('Rick Mires', '5205891970')
HashT.set('Tom Bradey', '5205891970')
HashT.set('Biff Tanin', '5205891970')
HashT.retrieveAll()
HashT.remove('Biff Tanin')
HashT.retrieveAll()
