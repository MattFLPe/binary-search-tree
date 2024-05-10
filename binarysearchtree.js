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

    inOrder(callback = null) {
        const result = [];
        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                if (callback) {
                    callback(node.val);
                } else {
                    result.push(node.val);
                }
                traverse(node.right);
            }
        };
        traverse(this.root);
        return result;
    }

    preOrder(callback = null) {
        const result = [];
        const traverse = (node) => {
            if (node !== null) {
                if (callback) {
                    callback(node.val);
                } else {
                    result.push(node.val);
                }
                traverse(node.left);
                traverse(node.right);
            }
        };
        traverse(this.root);
        return result;
    }

    postOrder(callback) {
        const result = [];
        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                if (callback) {
                    callback(node.val);
                } else {
                    result.push(node.val);
                }
            }
        };
        traverse(this.root);
        return result;
    }
}

function height(node) {
    if (node === null) {
        return -1;
    }

    // Recursive calls to get the height of the left and right subtrees
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Height of the current node is the maximum height of its subtrees + 1 (to count the edge from the node to its child)
    return Math.max(leftHeight, rightHeight) + 1;
};

function depth(node, root) {
    // Base case: If the node is null or the root is null, its depth is 0
    if (node === null || root === null) {
        return 0;
    }

    // If the node is the root, its depth is 0
    if (node === root) {
        return 0;
    }

   // Check if the node is in the left subtree of the root
   if (isDescendant(root.left, node)) {
    // If it is, recursively calculate depth in the left subtree
    return depth(node, root.left) + 1;
}

// Check if the node is in the right subtree of the root
if (isDescendant(root.right, node)) {
    // If it is, recursively calculate depth in the right subtree
    return depth(node, root.right) + 1;
}

// If the node is not in either subtree, return 0 (should not happen in a binary tree)
return 0;
};

// Helper function to check if a node is a descendant of another node
function isDescendant(root, node) {
    if (root === null) {
        return false;
    }
    if (root === node) {
        return true;
    }
    return isDescendant(root.left, node) || isDescendant(root.right, node);
}

function isBalanced(node) {
    // Base case: If the node is null, it is balanced with height -1
    if (node === null) {
        return { balanced: true, height: -1 };
    }

     // Recursively get the height and balance status of the left subtree
     const left = isBalanced(node.left);
     if (!left.balanced) {
         return { balanced: false, height: 0 };ss
    }

      // Recursively get the height and balance status of the right subtree
    const right = isBalanced(node.right);
    if (!right.balanced) {
        return { balanced: false, height: 0 };
    }

    // Check if the height difference between left and right subtrees is more than 1
    if (Math.abs(left.height - right.height) > 1) {
        return { balanced: false, height: 0 };
    }

     // The tree is balanced at this node, return the height
    return { balanced: true, height: Math.max(left.height, right.height) + 1 };
}

function rebalance(tree) {
    // Perform an in-order traversal to collect nodes into an array
    const nodes = [];
    tree.inOrder((val) => nodes.push(val));
    
    // Rebuild the tree using the sorted array
    tree.root = buildTree(nodes);
} 

/*
const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log("Before rebalancing:");
console.log("InOrder traversal:", tree.inOrder()); // Before rebalancing
console.log("Is the tree balanced?", isBalanced(tree.root).balanced); // Before rebalancing

// Rebalance the tree
rebalance(tree);

console.log("\nAfter rebalancing:");
console.log("InOrder traversal:", tree.inOrder()); // After rebalancing
console.log("Is the tree balanced?", isBalanced(tree.root).balanced); // After rebalancing
*/

function generateRandomNumbers(count) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
}

// Create a binary search tree from an array of random numbers < 100
const randomNumbers = generateRandomNumbers(10); // Generate 10 random numbers
const tree = new Tree(randomNumbers);

// Confirm that the tree is balanced by calling isBalanced
console.log("Is the tree balanced?", isBalanced(tree.root).balanced);

// Print out all elements in level, pre, post, and in order
console.log("Level order traversal:", tree.levelOrder());
console.log("Preorder traversal:", tree.preOrder());
console.log("Postorder traversal:", tree.postOrder());
console.log("Inorder traversal:", tree.inOrder());

// Unbalance the tree by adding several numbers > 100
tree.insert(105);
tree.insert(110);
tree.insert(115);

// Confirm that the tree is unbalanced by calling isBalanced
console.log("Is the tree balanced after adding large numbers?", isBalanced(tree.root).balanced);

// Balance the tree by calling rebalance
rebalance(tree);

// Confirm that the tree is balanced by calling isBalanced
console.log("Is the tree balanced after rebalancing?", isBalanced(tree.root).balanced);

// Print out all elements in level, pre, post, and in order
console.log("Level order traversal after rebalancing:", tree.levelOrder());
console.log("Preorder traversal after rebalancing:", tree.preOrder());
console.log("Postorder traversal after rebalancing:", tree.postOrder());
console.log("Inorder traversal after rebalancing:", tree.inOrder());