#!/usr/bin/env node

const Node = (key, value) => {
    return { key, value, next: null };
};

export default class LinkedList {
    #head = null;
    #length = 0;

    insert(key, value) {
        const existingNode = this.find(key);

        if (existingNode) {
            existingNode.value = value;
        } else {
            const node = Node(key, value);
            node.next = this.#head;
            this.#head = node;
            this.#length += 1;
        }

        return existingNode;
    }

    find(key) {
        if (!this.#head) return null;

        let node = this.#head;
        while (node && node.key !== key) {
            node = node.next;
        }

        return node?.key === key ? node : null;
    }

    remove(key) {
        if (!this.#head) return false;
        if (this.#head.key === key) {
            this.#head = this.#head.next;
            this.#length -= 1;
            return true;
        }

        let node = this.#head;
        while (node.next?.key !== key) {
            node = node.next;
        }

        if (!node.next) return false;

        node.next = node.next.next;
        this.#length -= 1;
        return true;
    }

    clear() {
        this.#head = null;
        this.#length = 0;
    }

    get keys() {
        const keys = [];

        let node = this.#head;
        while (node) {
            keys.push(node.key);
            node = node.next;
        }

        return keys;
    }

    get values() {
        const values = [];

        let node = this.#head;
        while (node) {
            values.push(node.value);
            node = node.next;
        }

        return values;
    }

    get length() {
        return this.#length;
    }

    get entries() {
        const entries = [];

        let node = this.#head;
        while (node) {
            entries.push([node.key, node.value]);
            node = node.next;
        }

        return entries;
    }

    prettyPrint() {
        if (!this.#head) {
            console.log("No entries in list");
            return;
        }

        let node = this.#head;
        let output = "";
        while (node.next) {
            output += `(${node.key}: ${node.value}) -> `;
            node = node.next;
        }

        console.log(`${output}(${node.key}: ${node.value})`);
    }
}
