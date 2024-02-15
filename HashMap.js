#!/usr/bin/env node

import LinkedList from "./LinkedList.js";

export default class HashMap {
    constructor(capacity = 16) {
        this.buckets = [];
        this.capacity = capacity;

        for (let i = 0; i < capacity; i++) {
            this.buckets.push(new LinkedList());
        }
    }

    #hash(key) {
        const primeNumber = 31;
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    // TODO: Expand map capacity when load factor is reached.
    set(key, value) {
        const keyHash = this.#hash(key);
        const bucketIndex = keyHash % this.capacity;

        this.buckets[bucketIndex].insert(key, value);
    }
}
