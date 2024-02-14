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
    hash(key) {
        const PRIME = 131;
        const MOD_NUMBER = 28657;

        let primePower = 1;
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            const charCode = key[i].charCodeAt();
            hashCode = (hashCode + charCode * primePower) % MOD_NUMBER;
            primePower = (primePower * PRIME) % MOD_NUMBER;
        }

        return hashCode % this.capacity;
    }
}
