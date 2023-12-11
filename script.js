class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    arr.sort((a, b) => a - b);
    this.root = this.buildTree(arr);
  }
  buildTree = arr => {
    let i = 0,
      n = arr.length,
      j = n - 1;
    return this.buildTreeHelper(arr, i, j);
  };
  buildTreeHelper = (arr, i, j) => {
    //bc
    if (i > j) {
      return null;
    }
    const mid = i + Math.floor((j - i) / 2);
    const node = new Node(arr[mid]);
    node.left = this.buildTreeHelper(arr, i, mid - 1);
    node.right = this.buildTreeHelper(arr, mid + 1, j);
    return node;
  };
  prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
    if (node === undefined || node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };
  insert = value => {
    let curNode = this.root;
    while (true) {
      if (curNode.value > value) {
        if (curNode.left === null) {
          curNode.left = new Node(value);
          break;
        }
        curNode = curNode.left;
      } else {
        if (curNode.right === null) {
          curNode.right = new Node(value);
          break;
        }
        curNode = curNode.right;
      }
    }
  };
}

let arr = [1, 2, 3];
let tree = new Tree(arr);
tree.prettyPrint();
arr = [57, 8, 33, 55, 29, 7, 72, 9, 71, 20];
tree = new Tree(arr);
tree.prettyPrint();

tree.insert(30);
tree.prettyPrint();
tree.insert(1);
tree.prettyPrint();
tree.insert(23);
tree.prettyPrint();

// arr = [
//   27, 53, 98, 69, 40, 62, 55, 85, 70, 44, 97, 15, 32, 65, 73, 39, 43, 36, 30,
//   68, 33
// ];
// tree = new Tree(arr);
// tree.prettyPrint();
