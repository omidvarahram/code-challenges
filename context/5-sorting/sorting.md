# 5. Sorting

## How the Approach Works

Sorting arranges elements in a particular order (ascending or descending).

In Codility problems, sorting is often used to:
- Group identical elements together
- Prepare for efficient scanning (e.g., two pointers, binary search)
- Simplify problems (sorted data often reveals patterns easily)
- Preprocess data to allow O(N) solutions afterward

Common sorting methods:
- Built-in sort functions (e.g., `Array.sort()` in JavaScript)
- Custom comparator functions for numbers
- Sorting tuples/pairs (e.g., `[value, index]`)

Key point:  
Sorting typically costs **O(N log N)** time.

## What Kind of Questions Use Sorting

- Finding pairs or triplets with certain properties
- Grouping or merging intervals
- Finding smallest or largest values efficiently
- Detecting duplicates faster
- Two-pointer techniques often require sorted arrays

## Real Examples and Solutions

### Example 1 — Triangle Triplet

**Problem:**  
Given array A, determine whether any triplet (P, Q, R) can form a triangle.

**Solution:**

```javascript
function solution(A) {
    A.sort((a, b) => a - b);

    for (let i = 0; i < A.length - 2; i++) {
        if (A[i] + A[i + 1] > A[i + 2]) {
            return 1;
        }
    }
    return 0;
}
```
> After sorting, just check consecutive triplets.

---

### Example 2 — Distinct

**Problem:**  
Count the number of distinct elements in an array.

**Solution (using sort + scan):**

```javascript
function solution(A) {
    A.sort((a, b) => a - b);
    let count = 0;

    for (let i = 0; i < A.length; i++) {
        if (i === 0 || A[i] !== A[i - 1]) {
            count++;
        }
    }
    return count;
}
```
> Sorting groups identical elements together for easy counting.

---

### Example 3 — Max Product of Three

**Problem:**  
Given array A, find the maximal product of any triplet.

**Solution:**

```javascript
function solution(A) {
    A.sort((a, b) => a - b);
    const n = A.length;
    return Math.max(
        A[n - 1] * A[n - 2] * A[n - 3],
        A[0] * A[1] * A[n - 1]
    );
}
```
> Consider both largest positives and two large negatives + one positive.

---

### Example 4 — Number of Disc Intersections

**Problem:**  
Count intersecting pairs of discs (each disc centered at (i, 0) with radius A[i]).

**Solution:**

```javascript
function solution(A) {
    const n = A.length;
    const start = [];
    const end = [];

    for (let i = 0; i < n; i++) {
        start.push(i - A[i]);
        end.push(i + A[i]);
    }

    start.sort((a, b) => a - b);
    end.sort((a, b) => a - b);

    let intersections = 0;
    let activeDiscs = 0;
    let j = 0;

    for (let i = 0; i < n; i++) {
        while (j < n && start[j] <= end[i]) {
            intersections += activeDiscs;
            activeDiscs++;
            j++;
        }
        activeDiscs--;
    }

    if (intersections > 10000000) return -1;
    return intersections;
}
```
> Sorting the starting and ending points separately simplifies counting overlaps.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Sort then scan | Find patterns (triplets, gaps, overlaps) |
| Group identical elements | Distinct counts, duplicates detection |
| Two pointers | Easier on sorted arrays |
| Time complexity | O(N log N) for sorting, O(N) for scanning |
