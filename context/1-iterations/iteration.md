# 1. Iterations

## How the Approach Works

Iteration means **repeating** a set of instructions until a condition is met or a collection is fully traversed.

In Codility, iteration typically involves:
- **For loops** (`for`, `for..of`, `for..in`)
- **While loops**
- **Do-while loops**

When to use iterations:
- To scan **every element** of an array or string
- To **count**, **sum**, or **transform** elements
- To **search** for a specific element or condition
- To **perform repeated actions** until a target is found

In Codility, iterations often appear when:
- You need to **inspect** or **modify** every item
- A problem doesn’t specify constraints that require a more complex algorithm
- **Simple cumulative operations** are required (e.g., sum of digits, maximum value, minimum value)

## What Kind of Questions Use Iterations

- Finding maximum or minimum values
- Counting occurrences
- Reversing a string or array
- Summing values
- Checking conditions across a collection
- Early stopping when a condition is met (e.g., find first occurrence)

If the expected time complexity is **O(N)** and there's no obvious optimization, simple iteration is often enough.

## Real Examples and Solutions

### Example 1 — Binary Gap

**Problem:**  
Find the longest sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of a number.

**Solution:**

```javascript
function solution(N) {
    const binary = N.toString(2);
    let maxGap = 0;
    let currentGap = 0;

    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '0') {
            currentGap++;
        } else {
            if (currentGap > maxGap) {
                maxGap = currentGap;
            }
            currentGap = 0;
        }
    }
    return maxGap;
}
```

---

### Example 2 — Count Divisible

**Problem:**  
Count how many numbers between `A` and `B` (inclusive) are divisible by `K`.

**Solution:**

```javascript
function solution(A, B, K) {
    let count = 0;
    for (let i = A; i <= B; i++) {
        if (i % K === 0) {
            count++;
        }
    }
    return count;
}
```
> Note: This can be optimized using math, but simple iteration is acceptable for small ranges.

---

### Example 3 — Passing Cars

**Problem:**  
Given array `A` of 0s and 1s. 0 means a car traveling east, 1 means a car traveling west. Count the number of passing car pairs (0 before 1).

**Solution:**

```javascript
function solution(A) {
    let eastCars = 0;
    let passingPairs = 0;

    for (let i = 0; i < A.length; i++) {
        if (A[i] === 0) {
            eastCars++;
        } else {
            passingPairs += eastCars;
            if (passingPairs > 1000000000) {
                return -1;
            }
        }
    }
    return passingPairs;
}
```
---

### Example 4 — Max Counters

**Problem:**  
You have N counters. Perform two types of operations:
- Increase(X) — increase counter X by 1
- Max counter — set all counters to the current maximum value

**Solution (Naive iteration, not optimized yet):**

```javascript
function solution(N, A) {
    const counters = new Array(N).fill(0);
    let maxCounter = 0;

    for (let i = 0; i < A.length; i++) {
        if (A[i] >= 1 && A[i] <= N) {
            counters[A[i] - 1]++;
            if (counters[A[i] - 1] > maxCounter) {
                maxCounter = counters[A[i] - 1];
            }
        } else if (A[i] === N + 1) {
            for (let j = 0; j < counters.length; j++) {
                counters[j] = maxCounter;
            }
        }
    }
    return counters;
}
```
> Note: This naive version can time out on large inputs. Optimized methods are introduced in later lessons.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Simple for/while loops | Core of iteration |
| Cumulative tracking (sum, count, max) | Common in array problems |
| Early exit when condition met | Improve efficiency |
| Useful for O(N) problems | Traversal or simple aggregation tasks |
