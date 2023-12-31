class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  insert(data) {
    let newNode = new Node(data);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      root.value = this.min(root.right);
      root.right = this.deleteNode(root.right, root.value);
    }
    return root;
  }


  search(root, value) {
    if (!root) {
      return "Not Found";
    } else {
      if (root.value === value) {
        return root;
      } else if (root.value < value) {
        return this.search(root.right, value);
      } else {
        return this.search(root.left, value);
      }
    }
  }
  preOrder(root) {
    const result = [];
    
    function traverse(node) {
        if (node) {
            result.push(node.value);
            traverse(node.left);
            traverse(node.right);
        }
    }
    
    traverse(root);
    
    return result;
}
  inOrder(root) {
    const result = [];
    
    function traverse(node) {
        if (node) {
            traverse(node.left);
            result.push(node.value);
            traverse(node.right);
        }
    }
    
    traverse(root);
    
    return result;
  }
  postOrder(root) {
    const result = [];
    
    function traverse(node) {
        if (node) {
            traverse(node.left);
            traverse(node.right);
            result.push(node.value);
        }
    }
    
    traverse(root);
    
    return result;
  }

  levelOrder() {
    const queue = []
    let values = []
    queue.push(this.root)
    while(queue.length) {
      let current = queue.shift()
      values.push(current.value)
      if (current.left) {
        queue.push(current.left)
      }
      if (current.right) {
        queue.push(current.right)
      }
    }
    return values
  }

  min(root) {
    if(!root.left) {
      return root.value
    }
    return this.min(root.left)
  }

  max(root) {
    if(!root.right) {
      return root.value
    }
    return this.max(root.right)
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const bst = new BinarySearchTree();

console.log(bst.isEmpty()); //true
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(6);
bst.insert(12);
bst.insert(3);
bst.insert(20);

prettyPrint(bst.root);
//  │       ┌── 20
//  │   ┌── 15
//  │   │   └── 12
//  └── 10
//      │   ┌── 6
//      └── 5
//          └── 3
console.log(bst.search(bst.root, 6)) // Node { value: 6, left: null, right: null }
console.log(bst.search(bst.root,11)) // Not Found
console.log(bst.preOrder(bst.root)) // [10,  5,  3, 6, 15, 12, 20]
console.log(bst.inOrder(bst.root)) // [3,  5,  6, 10, 12, 15, 20]
console.log(bst.postOrder(bst.root)) // [3,  6,  5, 12, 20, 15, 10]
console.log(bst.levelOrder()) // [ 10,  5, 15, 3, 6, 12, 20]
console.log(bst.min(bst.root)) // 3
console.log(bst.max(bst.root)) // 20
bst.delete(10);
prettyPrint(bst.root);
// │       ┌── 20
// │   ┌── 15
// └── 12
//     │   ┌── 6
//     └── 5
//         └── 3
