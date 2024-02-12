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
}
