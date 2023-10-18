class Node {
    constructor(value) {
      this.value = value
      this.left = null
      this.right = null
    }
}
  
class BinarySearchTree {
    constructor() {
      this.root = null
    }
    
    isEmpty() {
      return this.root === null
    }
    
    insert(data) {
      let newNode = new Node(data)
      if(this.isEmpty()) {
        this.root = newNode
      }else {
        this.insertNode(this.root, newNode)
      }
    }
    
    insertNode(root, newNode){
        if(newNode.value < root.value) {
            if(root.left===null) {
                root.left = newNode
            } else {
                this.insertNode(root.left, newNode)
            }
        } else {
            if(root.right === null) {
                root.right = newNode
            } else {
                this.insertNode(root.right, newNode)
            }
        }
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

const bst = new BinarySearchTree()

console.log(bst.isEmpty())
bst.insert(10)
bst.insert(5)
bst.insert(15)

prettyPrint(bst.root)