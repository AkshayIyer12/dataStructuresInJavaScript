function Node(data) {
	this.data = data;
	this.next = null;
}

function singlyList() {
	this._length = 0;
	this._head = null;
}

singlyList.prototype.add = function(value) {
	var node = new Node(value);
	var currentNode = this.head;

//1st use-case: an empty list
if(!currentNode) {
	this.head = node;
	this._length++;

	return node;
}

//2nd use-case: a non-empty list 
while(currentNode.next) {
	currentNode = currentNode.next;
}

currentNode.next = node;
this.length++;

return node;
};


singlyList.prototype.searchNodeAt = function(position) {
	var currentNode = this.head;
	var length = this._length;
	var count = 1;
	var message = {failure: 'Failure: Non-Existent node in this list.'};


//1st use-case: an invalid position
if(length === 0 || position < 1 || position > length) {
	throw new Error(message.failure);
}

//2nd use-case: a valid position
while(count < position){
	currentNode = currentNode.next;
	count++;
}
return currentNode;
};

singlyList.prototype.remove = function(position) {
	var currentNode = this.head;
	var length = this._length;
	var count = 0;
	var message = {failure: 'Failure: Non-Existent node in this list.'};
	var beforeNodeToDelete = null;
	var nodeToDelete = null;
	var deletedNode = null;

	// 1st use-case: an invalid position
    if (position < 0 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;
         
        return deletedNode;
    }
 
    // 3rd use-case: any other node is removed
    while (count < position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
    }
 
    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this._length--;
 
    return deletedNode;
};



