"use strict";

document.addEventListener("keyup", (event) => {
	if (event.code === "Space") {
		document.querySelector(".message").style.display = "none";
		setup();
	}
});

function setup() {
	const randomNumber = Math.round(Math.random() * 200 - 100);
	tree.addValue(randomNumber);

	tree.renderTree();
}

let clickedNodeValue = null;

class Tree {
	constructor() {
		this.root = null;
	}

	traverse() {
		this.root.visit();
	}

	addValue(val) {
		let n = new Node(val);

		if (this.root === null) {
			this.root = n;
		} else {
			this.root.addNode(n);
		}
	}

	search(val) {
		let found = this.root.search(val);
		return found;
	}

	renderTree() {
		this.renderNodes(this.root);
	}

	renderNodes(parentNodeObject, modifier = 200) {
		if (!document.querySelector(".root")) {
			const nodeContainer = document.createElement("div");
			nodeContainer.className = "node root";
			nodeContainer.id = parentNodeObject.value;
			nodeContainer.innerHTML = parentNodeObject.value;

			document.body.append(nodeContainer);

			nodeContainer.addEventListener("click", (e) => {
				clickedNodeValue = parentNodeObject.value;

				if (clickedNodeValue == e.target.id) {
					document.getElementById(clickedNodeValue).outerHTML = "";
					tree = new Tree();
					document.querySelector(".message").style.display = "block";
				}
			});

			this.renderNodes(parentNodeObject);
		}

		if (parentNodeObject.left !== null) {
			if (!document.getElementById(parentNodeObject.left.value)) {
				const nodeContainer = document.createElement("div");
				nodeContainer.className = "node leftChild";
				nodeContainer.id = parentNodeObject.left.value;
				nodeContainer.innerHTML = parentNodeObject.left.value;

				document
					.getElementById(parentNodeObject.value)
					.insertAdjacentElement("beforeend", nodeContainer);

				nodeContainer.addEventListener("click", (e) => {
					clickedNodeValue = parentNodeObject.left.value;

					if (clickedNodeValue == e.target.id) {
						document.getElementById(clickedNodeValue).outerHTML = "";
						parentNodeObject.left = null;
					}
				});
			}

			this.renderNodes(parentNodeObject.left, modifier + 10);
		}
		if (parentNodeObject.right !== null) {
			if (!document.getElementById(parentNodeObject.right.value)) {
				const nodeContainer = document.createElement("div");
				nodeContainer.className = "node rightChild";
				nodeContainer.id = parentNodeObject.right.value;
				nodeContainer.innerHTML = parentNodeObject.right.value;

				document
					.getElementById(parentNodeObject.value)
					.insertAdjacentElement("beforeend", nodeContainer);

				nodeContainer.addEventListener("click", (e) => {
					clickedNodeValue = parentNodeObject.right.value;

					if (clickedNodeValue == e.target.id) {
						document.getElementById(clickedNodeValue).outerHTML = "";
						parentNodeObject.right = null;
					}
				});
			}

			this.renderNodes(parentNodeObject.right, modifier + 10);
		}
	}
}

class Node {
	constructor(val) {
		this.value = val;
		this.left = null;
		this.right = null;
	}

	getValue() {
		return this.value;
	}

	search(val) {
		if (this.value == val) {
			return this;
		} else if (val < this.value && this.left != null) {
			return this.left.search(val);
		} else if (val > this.value && this.right != null) {
			return this.right.search(val);
		}
		return null;
	}

	visit() {
		if (this.left != null) {
			this.left.visit();
		}

		if (this.right != null) {
			this.right.visit();
		}
	}

	addNode(n) {
		if (n.value < this.value) {
			if (this.left == null) {
				this.left = n;
			} else {
				this.left.addNode(n);
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
