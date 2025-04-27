# 3. Counting Occurrences

## How the Approach Works

Counting occurrences means **tracking how many times** each item appears in a collection (array, string, etc.).

In Codility, this usually involves:
- Building a **counting array** (if elements are numbers in a known range)
- Using a **hash map** (object or Map) for arbitrary elements
- **Incrementing counts** as you iterate through the array

Key points:
- Ideal when you need **frequency information** fast.
- Counting arrays work best when values are **small and bounded** (e.g., numbers 0 to 100000).
- Hash maps work for **strings, large numbers, or unknown ranges**.

## What Kind of Questions Use Counting Occurrences

- Finding the first unique or duplicated element
- Checking if two arrays are permutations of each other
- Finding missing numbers or elements
- Calculating frequencies for validations or rules
- Tracking the maximum/minimum number of occurrences

## Real Examples and Solutions

### Example 1 — Permutation Check

**Problem:**  
Check if array A is a permutation (contains each number from 1 to N exactly once).

**Solution (using counting array):**

```javascript
function solution(A) {
    const n = A.length;
    const count = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        if (A[i] > n) return 0;
        if (count[A[i]] > 0) return 0;
        count[A[i]]++;
    }
    
    return 1;
}
```
> We ensure each number appears exactly once.

---

### Example 2 — Frog River One

**Problem:**  
Find the earliest time when a frog can jump across a river (needs all positions from 1 to X covered by leaves).

**Solution:**

```javascript
function solution(X, A) {
    const positions = new Set();
    
    for (let i = 0; i < A.length; i++) {
        positions.add(A[i]);
        if (positions.size === X) {
            return i;
        }
    }
    return -1;
}
```
> Set automatically tracks unique positions covered.

---

### Example 3 — Distinct

**Problem:**  
Count the number of distinct elements in array A.

**Solution:**

```javascript
function solution(A) {
    const set = new Set(A);
    return set.size;
}
```
> Using a Set automatically removes duplicates.

---

### Example 4 — Missing Integer

**Problem:**  
Find the smallest positive integer (greater than 0) that does not occur in array A.

**Solution:**

```javascript
function solution(A) {
    const set = new Set(A);
    let i = 1;
    while (true) {
        if (!set.has(i)) {
            return i;
        }
        i++;
    }
}
```
> Build the set of existing numbers, then check from 1 upwards.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Counting array | When numbers are small and dense (1..N) |
| Hash map / Set | When numbers are large, sparse, or strings |
| O(N) traversal | Counting needs only one pass usually |
| Useful for | Permutations, uniqueness checks, missing elements |
