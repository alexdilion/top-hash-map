#!/usr/bin/env node

import LinkedList from "./LinkedList.js";

export default class HashMap {
    #buckets = [];
    #capacity = 16;
    #maxLoadFactor = 0.7;
    #length = 0;

    constructor(capacity = 16) {
        this.#capacity = capacity;

        for (let i = 0; i < capacity; i++) {
            this.#buckets.push(new LinkedList());
        }
    }

    // Polynomial rolling hash function
    // https://cp-algorithms.com/string/string-hashing.html
    #hash(key) {
        const PRIME = 131;
        const MOD_NUMBER = 28657;

        let primePower = 1;
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            const charCode = key[i].charCodeAt();
            hashCode = (hashCode + charCode * primePower) % MOD_NUMBER;
            primePower = (primePower * PRIME) % MOD_NUMBER;
        }

        return hashCode;
    }

    #getBucketIndex(key) {
        return this.#hash(key) % this.#capacity;
    }

    // TODO: Expand map capacity when load factor is reached.
    set(key, value) {
        const bucketIndex = this.#getBucketIndex(key);
        const keyExists = this.#buckets[bucketIndex].insert(key, value);

        if (!keyExists) {
            this.#length += 1;
        }
    }

    get(key) {
        const bucketIndex = this.#getBucketIndex(key);
        const node = this.#buckets[bucketIndex].find(key);

        return node?.value ?? null;
    }

    has(key) {
        const bucketIndex = this.#getBucketIndex(key);
        const node = this.#buckets[bucketIndex].find(key);

        return node !== null;
    }

    remove(key) {
        const bucketIndex = this.#getBucketIndex(key);
        const entryRemoved = this.#buckets[bucketIndex].remove(key);

        if (entryRemoved) {
            this.#length -= 1;
        }

        return entryRemoved;
    }

    clear() {
        this.#buckets.forEach((bucket) => bucket.clear());
        this.#length = 0;
    }

    get length() {
        return this.#length;
    }

    get keys() {
        const keys = [];
        this.#buckets.map((bucket) => keys.push(...bucket.keys));

        return keys;
    }

    get values() {
        const values = [];
        this.#buckets.map((bucket) => values.push(...bucket.values));

        return values;
    }

    get buckets() {
        return this.#buckets;
    }

    get entries() {
        const entries = [];
        this.#buckets.map((bucket) => entries.push(...bucket.entries));

        return entries;
    }
}
