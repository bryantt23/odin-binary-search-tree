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
  delete = value => {
    let curNode = this.root;
    let parentNode = null;
    while (curNode.value !== value) {
      parentNode = curNode;
      if (curNode.value > value) {
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
    }

    //doesn't exist
    if (curNode === null) {
      return;
    }

    //leaf
    if (curNode.left === null && curNode.right === null) {
      if (value < parentNode.value) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }
    //2 children
    else if (curNode.left !== null && curNode.right !== null) {
      this.deleteNodeWith2Children(curNode);
    }
    //1 child
    else {
      if (curNode.left !== null) {
        curNode.value = curNode.left.value;
        curNode.left = null;
      } else {
        curNode.value = curNode.right.value;
        curNode.right = null;
      }
    }
  };
  deleteNodeWith2Children = nodeToDelete => {
    const value = nodeToDelete.value;
    let curNode = this.root,
      inorderSuccessorNode = null,
      parentOfInorderSuccessorNode = null;
    while (curNode !== null) {
      if (curNode.value > value) {
        parentOfInorderSuccessorNode = inorderSuccessorNode;
        inorderSuccessorNode = curNode;
        curNode = curNode.left;
      } else {
        curNode = curNode.right;
      }
    }

    nodeToDelete.value = inorderSuccessorNode.value;
    if (inorderSuccessorNode.value < parentOfInorderSuccessorNode.value) {
      parentOfInorderSuccessorNode.left = null;
    } else {
      parentOfInorderSuccessorNode.right = null;
    }
  };
  find = value => {
    let curNode = this.root;
    while (curNode !== null) {
      if (curNode.value > value) {
        curNode = curNode.left;
      } else if (curNode.value < value) {
        curNode = curNode.right;
      } else {
        return curNode;
      }
    }
    return null;
  };
  levelOrderIterative = cb => {
    const q = [];
    q.push(this.root);
    const res = [];
    while (q.length > 0) {
      const size = q.length;
      for (let i = 0; i < size; i++) {
        const curNode = q.shift();
        if (curNode.left !== null) {
          q.push(curNode.left);
        }
        if (curNode.right !== null) {
          q.push(curNode.right);
        }
        if (cb) {
          cb(curNode);
        } else {
          res.push(curNode.value);
        }
      }
    }
    if (!cb) {
      return res;
    }
  };
  levelOrderRecursive = cb => {
    const map = new Map();
    this.levelOrderRecursiveHelper(this.root, 1, map);
    let level = 1;
    const res = [];
    while (map.has(level)) {
      const arr = map.get(level++);
      for (const node of arr) {
        if (cb) {
          cb(node);
        } else {
          res.push(node.value);
        }
      }
    }
    if (!cb) {
      return res;
    }
  };
  levelOrderRecursiveHelper = (cur, level, map) => {
    if (!map.has(level)) {
      map.set(level, []);
    }
    map.get(level).push(cur);
    if (cur.left !== null) {
      this.levelOrderRecursiveHelper(cur.left, level + 1, map);
    }
    if (cur.right !== null) {
      this.levelOrderRecursiveHelper(cur.right, level + 1, map);
    }
  };
  inorder = (cb, curNode = this.root) => {
    //bc
    if (curNode === null) {
      return [];
    }

    const res = this.inorder(cb, curNode.left);
    if (cb) {
      cb(curNode);
    } else {
      res.push(curNode.value);
    }

    res.push(...this.inorder(cb, curNode.right));
    return res;
  };
  preorder = (cb, curNode = this.root) => {
    //bc
    if (curNode === null) {
      return [];
    }
    const res = [];
    if (cb) {
      cb(curNode);
    } else {
      res.push(curNode.value);
    }

    res.push(...this.preorder(cb, curNode.left));
    res.push(...this.preorder(cb, curNode.right));
    return res;
  };
  postorder = (cb, curNode = this.root) => {
    //bc
    if (curNode === null) {
      return [];
    }
    const res = this.postorder(cb, curNode.left);
    res.push(...this.postorder(cb, curNode.right));
    if (cb) {
      cb(curNode);
    } else {
      res.push(curNode.value);
    }

    return res;
  };
  height = (cur = this.root) => {
    //bc
    if (cur === null) {
      return 0;
    }
    return Math.max(this.height(cur.left), this.height(cur.right)) + 1;
  };
  isBalanced = () => {
    const res = this.isBalancedHelper();
    return res === -1 ? false : true;
  };
  isBalancedHelper = (cur = this.root) => {
    //bc
    if (cur === null) {
      return 0;
    }
    const left = this.isBalancedHelper(cur.left),
      right = this.isBalancedHelper(cur.right);
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
      return -1;
    } else {
      return Math.max(this.height(cur.left), this.height(cur.right)) + 1;
    }
  };
  rebalance = () => {
    const arr = this.inorder();
    const balancedTree = this.buildTree(arr);
    this.root = balancedTree;
  };
}

let arr = [1, 2, 3];
let tree = new Tree(arr);
tree.prettyPrint();
console.log(tree.isBalanced());
arr = [57, 8, 33, 55, 29, 7, 72, 9, 71, 20];
tree = new Tree(arr);
tree.prettyPrint();

tree.insert(30);
tree.prettyPrint();
tree.insert(1);
tree.prettyPrint();
tree.insert(23);
tree.prettyPrint();
tree.delete(55);
tree.prettyPrint();
tree.delete(33);
tree.prettyPrint();
tree.delete(29);
tree.prettyPrint();
console.log(tree.find(7));
console.log(tree.find(73));
console.log(tree.levelOrderIterative());
tree.levelOrderIterative(({ value }) => {
  console.log(`value: ${value}`);
});
console.log(tree.levelOrderRecursive());
tree.levelOrderRecursive(({ value }) => {
  console.log(`value: ${value}`);
});
console.log(tree.inorder());
tree.inorder(({ value }) => {
  console.log(`value: ${value}`);
});
console.log(tree.preorder());
tree.preorder(({ value }) => {
  console.log(`value: ${value}`);
});
console.log(tree.postorder());
tree.postorder(({ value }) => {
  console.log(`value: ${value}`);
});
console.log(tree.height());
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());
// arr = [
//   27, 53, 98, 69, 40, 62, 55, 85, 70, 44, 97, 15, 32, 65, 73, 39, 43, 36, 30,
//   68, 33
// ];
// tree = new Tree(arr);
// tree.prettyPrint();
