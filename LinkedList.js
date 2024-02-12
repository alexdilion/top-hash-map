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
        this.length = 0;
    }

    insert(key, value) {
        const existingNode = this.find(key);

        if (existingNode) {
            existingNode.value = value;
        } else {
            const node = new Node(key, value);
            node.next = this.head;
            this.head = node;
            this.length += 1;
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

    delete(key) {
        if (!this.head) return;
        if (this.head.key === key) {
            this.head = this.head.next;
            this.length -= 1;
            return;
        }

        let node = this.head;
        while (node.next?.key !== key) {
            node = node.next;
        }

        if (!node.next) return;

        node.next = node.next.next;
        this.length -= 1;
    }

    prettyPrint() {
        if (!this.head) {
            console.log("No entries in list");
            return;
        }

        let node = this.head;
        let output = "";
        while (node.next) {
            output += `(${node.key}: ${node.value}) -> `;
            node = node.next;
        }

        console.log(`${output}(${node.key}: ${node.value})`);
    }
}
