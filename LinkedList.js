#!/usr/bin/env node

export class Node {
    constructor(value = null) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.tail = null;
    }

    insert(node) {
        node.next = this.head;
        this.head = node;
    }

    prettyPrint() {
        let node = this.head;
        let output = "";

        while (node.next) {
            output += `${node.value} -> `;
            node = node.next;
        }

        console.log(`${output}${node.value}`);
    }
}
