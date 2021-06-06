"use strict"

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        setup()
    }
})

function setup() {
    tree.addValue(Math.round(Math.random() * 200 - 100));
    console.log(tree);
}

class Tree {
    constructor() {
        this.root = null;
    }

    traverse() {
        this.root.visit();
    }

    addValue(val) {
        let n = new Node(val);
        if (this.root == null) {
            this.root = n;
        } else {
            this.root.addNode(n)
        }
    }

    search(val) {
        let found = this.root.search(val);
        return found;
    }
}

class Node {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }

    search(val) {
        if (this.value == val) {
            return this;
        } else if (val < this.value && this.left != null){
            return this.left.search(val);
        } else if (val > this.value && this.right != null){
            return this.right.search(val);
        }
        return null;
    }

    visit() {
        if (this.left != null) {
            this.left.visit();
        }
        console.log(this.value);
        if (this.right != null) {
            this.right.visit();
        }
    }

    addNode(n) {
        if (n.value < this.value) {
            if (this.left == null) {
                this.left = n;
            } else {
                this.left.addNode(n)
            }
        } else if (n.value > this.value) {
            if (this.right == null) {
                this.right = n;
            } else {
                this.right.addNode(n);
            }
        }
    }
}

let tree = new Tree();