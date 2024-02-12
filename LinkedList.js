#!/usr/bin/env node

export class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(key, value) {
        const existingNode = this.find(key);

        if (existingNode) {
            existingNode.value = value;
        } else {
            const node = new Node(key, value);
            node.next = this.head;
            this.head = node;
        }
    }

    find(key) {
        if (!this.head) return null;

        let node = this.head;
        while (node && node.key !== key) {
            node = node.next;
        }

        return node?.key === key ? node : null;
    }

    prettyPrint() {
        if (!this.head) return;

        let node = this.head;
        let output = "";
        while (node.next) {
            output += `(${node.key}: ${node.value}) -> `;
            node = node.next;
        }

        console.log(`${output}(${node.key}: ${node.value})`);
    }
}
