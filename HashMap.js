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
        return this.#hash(key) % this.capacity;
    }

    // TODO: Expand map capacity when load factor is reached.
    set(key, value) {
        const bucketIndex = this.#getBucketIndex(key);
        this.buckets[bucketIndex].insert(key, value);
    }

    get(key) {
        const bucketIndex = this.#getBucketIndex(key);
        const node = this.buckets[bucketIndex].find(key);

        return node?.value ?? null;
    }

    has(key) {
        const bucketIndex = this.#getBucketIndex(key);
        const node = this.buckets[bucketIndex].find(key);

        return node !== null;
    }

    remove(key) {
        const bucketIndex = this.#getBucketIndex(key);

        return this.buckets[bucketIndex].remove(key); // true if key found and removed
    }

    length() {
        return this.buckets.reduce((total, bucket) => total + bucket.length, 0);
    }

    clear() {
        this.buckets.forEach((bucket) => {
            bucket.clear();
        });
    }
}
