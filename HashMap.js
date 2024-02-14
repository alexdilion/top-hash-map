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
}
