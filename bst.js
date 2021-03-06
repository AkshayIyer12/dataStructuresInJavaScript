const Node = function (value, left, right, parent) {
  this.value = value
  this._left = left
  this._right = right
  this._parent = parent
}

const BinaryTree = function () {
  this._root = null
}

BinaryTree.prototype.insert = function (value, current) {
  if (this._root === null) {
    this._root = new Node(value, null, null, null)
    return
  }

  let insertKey
  current = current || this._root
  
  if (current.value > value) insertKey = '_left'
  else insertKey = '_right'
  
  if (!current[insertKey]) current[insertKey] = new Node(value, null, null, current)
  else this.insert(value, current[insertKey]) 
}

BinaryTree.prototype._inorder = function (current, callback) {
  if (!current) return

  this._inorder(current._left, callback)
  if (typeof callback === 'function') callback(current)
  this._inorder(current._right, callback)
}

BinaryTree.prototype.inorder = function (callback) {
  return this._inorder(this._root, callback)
}

BinaryTree.prototype._postorder = function (current, callback) {
  if (!current) return
  this._postorder(current._left, callback)
  this._postorder(current._right, callback)
  if (typeof callback === 'function')  callback(current)
}

BinaryTree.prototype.postorder = function (callback) {
  return this._postorder(this.root, callback)
}

BinaryTree.prototype._preorder = function (current, callback) {
  if (!current) return
  if (typeof callback === 'function') callback(current)
  this._preorder(current._left, callback)
  this._preorder(current._right, callback)
}

BinaryTree.prototype.preorder = function (callback) {
  return this._preorder(this._root, callback)
}

BinaryTree.prototype._find = function (value, current) {
  if (!current) return null
  if (current.value === value) return current
  if (current.value > value) return this._find(value, current._left)
  if (current.value < value) return this._find(value, current._right)
}

BinaryTree.prototype.find = function (value) {
  return this._find(value, this._root)
}

BinaryTree.prototype._replaceChild = function (parent, oldChild, newChild) {
  if (!parent) {
    this._root = newChild
    if (this.root !== null) this._root_parent = null
  } else {
    if (parent._left === oldChild) parent._left = newChild
    else parent._right = newChild
    if (newChild) newChild._parent = parent
  }
}

BinaryTree.prototype.remove = function (node) {
  if (!node) return false
  if (node._left && node._right) {
    let min = this._findMin(node._right)
    let temp = node.value
    node.value = min.value
    min.value = temp
    return this.remove(min)
  } else {
    if (node._left) this._replaceChild(node._parent, node, node._left)
    else if (node._right) this._replaceChild(node._parent, node, node._right)
    else this._replaceChild(node._parent, node, null)
    return true
  }
}

BinaryTree.prototype._findMin = function (node, current) {
  current = current || { value: Infinity }
  if (!node) return current
  if (current.value > node.value) current = node
  return this._findMin(node._left, current)
}

BinaryTree.prototype._findMax = function (node, current) {
  current = current || { value: -Infinity }
  if (!node) return current
  if (current.value < node.value) current = node
  return this._findMax(node._right, current)
}

BinaryTree.prototype.findMin = function () {
  return this._findMin(this._root)
}

BinaryTree.prototype.findMax = function () {
  return this._findMax(this._root)
}

BinaryTree.prototype._isBalanced = function (current) {
  if (!current) return true
  return this._isBalanced(current._left) &&
    this._isBalanced(current._right) &&
    Math.abs(this._getHeight(current._left) - this._getHeight(current._right)) <= 1
}

BinaryTree.prototype.isBalanced = function () {
  return this._isBalanced(this._root)
}

BinaryTree.prototype.getDiameter = function () {
  let getDiameter = function (root) {
    if (!root) return 0
    let leftHeight = this._getHeight(root._left)
    let rightHeight = this._getHeight(root._right)
    let path = leftHeight + rightHeight + 1
    return Math.max(path, getDiameter(root._left), getDiameter(root._right))
  }.bind(this)
  return getDiameter(this._root)
}

BinaryTree.prototype.getHeight = function () {
  return this._getHeight(this._root)
}

BinaryTree.prototype._getHeight = function (node) {
  if (!node) return 0
  return 1 + Math.max(this._getHeight(node._left), this._getHeight(node._right))  
}

BinaryTree.prototype.lowestCommonAncestor = function (firstNode, secondNode) {
  return this._lowestCommonAncestor(firstNode, secondNode, this._root)
}

BinaryTree.prototype._lowestCommonAncestor = function (firstNode, secondNode, current) {
  let firstNodeInLeft = this._existInSubtree(firstNode, current._left)
  let secondNodeInLeft = this._existInSubtree(secondNode, current._left)
  let firstNodeInRight = this._existInSubtree(firstNode, current._right)
  let secondNodeInRight = this._existInSubtree(secondNode, current._right)
  if ((firstNodeInLeft && secondNodeInRight) || (firstNodeInRight && secondNodeInLeft)) return current
  if (secondNodeInLeft && firstNodeInLeft) return this._lowestCommonAncestor(firstNode, secondNode, current._left)
  if (secondNodeInRight && secondNodeInLeft) return this._lowestCommonAncestor(firstNode, secondNode, current._right)
  return null
}

BinaryTree.prototype._existsInSubtree = function (node, root) {
  if (!root) return false
  if (node === root.value) return true
  return this._existInSubtree(node, root._left) || this._existInSubtree(node, root._right)
}
let bst = new BinaryTree()
bst.insert(2000)
bst.insert(1989)
bst.insert(1991)
bst.insert(2001)
bst.insert(1966)
let node = bst.find(1989)
console.log(node.value) // 1989
let minNode = bst.findMin()
console.log(minNode.value) // 1966
let maxNode = bst.findMax()
console.log(maxNode.value) //2001
let diameter = bst.getDiameter()
console.log(diameter)
let height = bst.getHeight()
console.log(height)
let arr = []
const pusher = x => arr.push(x.value)
console.log('\nInorder\n')

bst.inorder(pusher)
console.log(arr)
arr = []
console.log('\nPostorder\n')
bst.postorder(pusher)
console.log(arr)
arr = []
console.log('\nPreorder\n')
bst.preorder(pusher)
console.log(arr)
