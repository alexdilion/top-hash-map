#!/usr/bin/env node

const Node = (key) => {
    return { key, next: null };
};

export default class SetBucket {
    #head = null;
    #length = 0;

    insert(key) {
        const existingNode = this.find(key);

        if (!existingNode) {
            const node = Node(key);
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

    get length() {
        return this.#length;
    }

    prettyPrint() {
        if (!this.#head) {
            console.log("No keys in this bucket");
            return;
        }

        let node = this.#head;
        let output = "";
        while (node.next) {
            output += `(${node.key}) -> `;
            node = node.next;
        }

        console.log(`${output}(${node.key})`);
    }
}
