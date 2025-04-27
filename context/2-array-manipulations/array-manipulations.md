'''
# 2. Array Manipulations

## How the Approach Works

Array manipulation refers to **accessing**, **updating**, **modifying**, or **restructuring** array elements efficiently.

In Codility problems, this commonly involves:
- **Reading** and **updating** elements in-place
- **Shifting**, **rotating**, or **reversing** arrays
- **Building auxiliary arrays** (prefix sums, frequency counters)
- **Flattening** nested structures
- **Combining array elements** under certain rules

Key points:
- Arrays provide **O(1) access** to elements by index
- Array operations are typically **O(N)** unless nested loops are used
- Preprocessing an array is very powerful for range queries, finding patterns, etc.

## What Kind of Questions Use Array Manipulations

- Rotating arrays
- Finding missing elements
- Tracking or counting values (e.g., counting elements, frequency arrays)
- Reversing, merging, slicing arrays
- Applying transformations (e.g., double, halve, map)
- Rebuilding arrays based on conditions

Most problems requiring **one pass** or **two passes** over the array use these basic manipulations.

## Real Examples and Solutions

### Example 1 — Cyclic Rotation

**Problem:**  
Rotate array A to the right by K steps.

**Solution:**

```javascript
function solution(A, K) {
    const n = A.length;
    if (n === 0) return A;
    const rotations = K % n;
    return A.slice(-rotations).concat(A.slice(0, n - rotations));
}
```

---

### Example 2 — Odd Occurrences In Array

**Problem:**  
Find the element that occurs an odd number of times in the array.

**Solution (using XOR):**

```javascript
function solution(A) {
    let result = 0;
    for (let i = 0; i < A.length; i++) {
        result ^= A[i];
    }
    return result;
}
```
> XOR cancels out elements appearing twice, leaving only the odd one.

---

### Example 3 — Missing Element (Permutation Missing Element)

**Problem:**  
Given an array A containing N distinct numbers in [1..N+1], find the missing element.

**Solution:**

```javascript
function solution(A) {
    const n = A.length + 1;
    const totalSum = (n * (n + 1)) / 2;
    const arraySum = A.reduce((acc, val) => acc + val, 0);
    return totalSum - arraySum;
}
```
> Uses the formula for the sum of an arithmetic series.

---

### Example 4 — Tape Equilibrium

**Problem:**  
Given an array A of N integers, find the minimal difference between the sum of the first part and the second part after splitting at any point.

**Solution:**

```javascript
function solution(A) {
    const totalSum = A.reduce((acc, val) => acc + val, 0);
    let minDiff = Infinity;
    let leftSum = 0;
    
    for (let i = 0; i < A.length - 1; i++) {
        leftSum += A[i];
        const rightSum = totalSum - leftSum;
        const diff = Math.abs(leftSum - rightSum);
        if (diff < minDiff) {
            minDiff = diff;
        }
    }
    return minDiff;
}
```
> Classic example of using prefix sums without explicitly building an array.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Rotate, reverse, split arrays | Common transformations |
| Cumulative sums | Enable range queries |
| XOR operations | Useful for finding unique elements |
| Slicing and concatenation | Used to rearrange arrays |
| One-pass linear traversals | Achieve O(N) solutions |
'''
