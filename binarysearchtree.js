class Node {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildTree(array) {
    if (!array.length) return null;

    array = Array.from(new Set(array.sort((a, b) => a - b)));

    function helper(start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);

        node.left = helper(start, mid - 1);
        node.right = helper(mid + 1, end);

        return node;
    }
    return helper(0, array.length - 1);
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }  

    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while(current) {
            if (value < current.val) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                } else {
                    current = current.left
                }
            } else if (value > current.val) {
                if (!current.right) {
                    current.right = newNode;
                    break;
                } else {
                    current = current.right;
                }
            } else {
                break;
            }
        }
    };

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    };

    deleteNode(node, value) {
        if (!node) return node;

        if (value < node.val) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.val) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node with only one child or no child
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }

            // Node with two children: Get the inorder successor (smallest in the right subtree)
            node.val = this.minValue(node.right);

            // Delete the inorder successor
            node.right = this.deleteNode(node.right, node.val);
        }
        return node;
    }

    minValue(node) {
        let minVal = node.val;
        while (node.left) {
            minVal = node.left.val;
            node = node.left;
        }
        return minVal;
    }

    find(value) {
        return this.findNode(this.root, value);
    };

    findNode(node, value) {
        if(!node) return null;

        if (value === node.val) {
            return node;
        } else if (value < node.val) {
            return this.findNode(node.left, value);
        } else {
            return this.findNode(node.right, value);
        }
    }

    levelOrder(callback) {
        const result = [];
        if (!this.root) return null;

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            if (callback) {
                callback(node);
            } else {
                result.push(node.val);
            }
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }

    return result;

    }

    inOrder(callback) {

    }

    preOrder(callback) {

    }

    postOrder(callback) {
        
    }
}

const bst = new Tree([5, 3, 7, 2, 4, 6, 8]);

// Without callback
console.log("Level order traversal without callback:", bst.levelOrder()); // Output: [5, 3, 7, 2, 4, 6, 8]

// With callback (printing node values)
console.log("Level order traversal with callback (printing node values):");
bst.levelOrder(node => console.log(node.val)); // Output: 5, 3, 7, 2, 4, 6, 8