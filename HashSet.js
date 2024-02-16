#!/usr/bin/env node

import SetBucket from "./SetBucket.js";

export default class HashSet {
    #buckets = [];
    #capacity = 16;
    #maxLoadFactor = 0.7;
    #minLoadFactor = this.#maxLoadFactor / 4;
    #length = 0;

    constructor(capacity = 16) {
        this.#capacity = capacity;

        for (let i = 0; i < capacity; i++) {
            this.#buckets.push(new SetBucket());
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

    #rehashKeys() {
        const newMap = [];
        const keys = this.keys;

        for (let i = 0; i < this.#capacity; i++) {
            newMap.push(new SetBucket());
        }

        this.#buckets = newMap;

        keys.forEach((key) => {
            const bucketIndex = this.#getBucketIndex(key);
            this.#buckets[bucketIndex].insert(key);
        });
    }

    #optimizeSize() {
        const loadFactor = this.#length / this.#capacity;

        if (loadFactor >= this.#maxLoadFactor) {
            this.#capacity *= 2;
            this.#rehashKeys();
        } else if (loadFactor < this.#minLoadFactor && this.#capacity > 16) {
            this.#capacity /= 2;
            this.#rehashKeys();
        }
    }

    set(key) {
        const bucketIndex = this.#getBucketIndex(key);
        const keyExists = this.#buckets[bucketIndex].insert(key);

        if (!keyExists) {
            this.#length += 1;
            this.#optimizeSize();
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
            this.#optimizeSize();
        }

        return entryRemoved;
    }

    clear() {
        this.#buckets = this.#buckets.slice(0, 16);
        this.#buckets.forEach((bucket) => bucket.clear());
        this.#length = 0;
        this.#capacity = 16;
    }

    prettyPrint() {
        this.#buckets.map((bucket) => bucket.prettyPrint());
    }

    get length() {
        return this.#length;
    }

    get buckets() {
        return this.#buckets;
    }

    get keys() {
        const keys = [];
        this.#buckets.map((bucket) => keys.push(...bucket.keys));

        return keys;
    }

    get capacity() {
        return this.#capacity;
    }
}
