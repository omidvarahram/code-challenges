# 22. Bit Manipulation

## How the Approach Works

**Bit manipulation** involves using **bitwise operations** (AND, OR, XOR, NOT, shifts) to efficiently solve problems by operating directly on the binary representations of numbers.

Common bitwise operations:
- `AND (&)` → 1 if both bits are 1
- `OR (|)` → 1 if either bit is 1
- `XOR (^)` → 1 if bits are different
- `NOT (~)` → flips bits
- `LEFT SHIFT (<<)` → multiply by 2
- `RIGHT SHIFT (>>)` → divide by 2

Key properties:
- Extremely fast (hardware level).
- Useful for optimization, uniqueness detection, subsets, and low-level tricks.

## What Kind of Questions Use Bit Manipulation

- Checking if a number is even or odd
- Finding a missing or unique number
- Counting bits (Hamming weight)
- Generating subsets
- Optimizing space/time in tight loops

## Real Examples and Solutions

### Example 1 — Find Single Number

**Problem:**  
Every element appears twice except for one. Find that one.

**Solution (XOR trick):**

```javascript
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}
```
> XOR of a number with itself is 0, so only the unique number survives.

---

### Example 2 — Counting 1 Bits (Hamming Weight)

**Problem:**  
Count the number of 1's in the binary representation of a number.

**Solution:**

```javascript
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
}
```
> Check last bit and shift right.

---

### Example 3 — Subsets of a Set

**Problem:**  
Generate all subsets of a set.

**Solution:**

```javascript
function subsets(nums) {
    const result = [];
    const n = nums.length;

    for (let i = 0; i < (1 << n); i++) {
        const subset = [];
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) !== 0) {
                subset.push(nums[j]);
            }
        }
        result.push(subset);
    }
    return result;
}
```
> Each subset corresponds to a bitmask.

---

### Example 4 — Check if Power of Two

**Problem:**  
Check if a given integer is a power of two.

**Solution:**

```javascript
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
```
> Powers of two have exactly one bit set.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| XOR | Cancel duplicates, find unique |
| AND, OR, shifts | Optimize checks, subsets, multiplication/division |
| Powers of two | `(n & (n-1)) === 0` check |
| Applications | Unique elements, bit counting, subset generation, compression |
