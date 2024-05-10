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
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const root = buildTree(array);
console.log(root);