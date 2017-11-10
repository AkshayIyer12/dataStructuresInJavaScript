/* Creating a constructor in Stack which has
two properties _size and _storage */
function Stack() {
	this._size = 0;
	this._storage = {};
}

Stack.prototype.push = function(data) {
	//increase the size of our storage
	var size = this._size++;

	// assign size as key of storage
	// assign data as the value  of this key 
	this._storage[size] = data;
};

Stack.prototype.pop = function() {
	//Setting the value of size to the current top value
	var size = this._size;
	
	if(size) {
	//Setting the value of deletedData to the value at location size in _storage array
	var deletedData = this._storage[size];

	//deleting the value at location size of the _storage array
	delete this._storage[size];
	//decrementing to update the value of size after an element is popped off
	this._size--;

	//returning the element that was popped off
	return deletedData;
	}
};




