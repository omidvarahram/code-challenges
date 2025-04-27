# 4. Prefix Sums

## How the Approach Works

Prefix sums are a **preprocessing technique** where you compute the cumulative sum of elements up to each index.

Once the prefix sum array is built, you can answer **range sum queries** (sum from index `P` to `Q`) in **O(1) time** instead of O(N).

Basic idea:
- Build a prefix sum array `prefixSum`
- `prefixSum[i]` = sum of elements from start up to index `i-1`
- Range sum from `P` to `Q` is `prefixSum[Q + 1] - prefixSum[P]`

Prefix sums can also be extended to:
- Prefix minimums
- Prefix maximums
- Prefix XORs
- 2D prefix sums (for matrices)

## What Kind of Questions Use Prefix Sums

- Fast sum over a range of elements
- Finding equilibrium points (where left sum = right sum)
- Checking cumulative constraints
- Solving problems related to subarrays and intervals
- Range query optimizations where naive solutions would time out

## Real Examples and Solutions

### Example 1 — Passing Cars (Using Prefix Sums)

**Problem:**  
Given array A of 0s and 1s, count the number of (0,1) pairs where a 0 comes before a 1.

**Solution:**

```javascript
function solution(A) {
    const n = A.length;
    const prefixSum = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + A[i];
    }

    let count = 0;
    for (let i = 0; i < n; i++) {
        if (A[i] === 0) {
            count += prefixSum[n] - prefixSum[i];
            if (count > 1000000000) return -1;
        }
    }
    return count;
}
```
> Precompute the number of 1s after each position.

---

### Example 2 — Genomic Range Query

**Problem:**  
Given DNA sequence and ranges, find minimal nucleotide impact factor in each range efficiently.

**Solution (Prefix sums per letter):**

```javascript
function solution(S, P, Q) {
    const n = S.length;
    const impact = { A: 1, C: 2, G: 3, T: 4 };
    const prefix = { A: [0], C: [0], G: [0], T: [0] };

    for (let i = 0; i < n; i++) {
        for (let key in prefix) {
            prefix[key][i + 1] = prefix[key][i];
        }
        prefix[S[i]][i + 1]++;
    }

    const result = [];
    for (let i = 0; i < P.length; i++) {
        if (prefix.A[Q[i] + 1] - prefix.A[P[i]] > 0) result.push(1);
        else if (prefix.C[Q[i] + 1] - prefix.C[P[i]] > 0) result.push(2);
        else if (prefix.G[Q[i] + 1] - prefix.G[P[i]] > 0) result.push(3);
        else result.push(4);
    }
    return result;
}
```
> Use 4 prefix arrays to answer range minimums quickly.

---

### Example 3 — Min Avg Two Slice

**Problem:**  
Find the slice (length 2 or 3) with the minimal average.

**Solution:**

```javascript
function solution(A) {
    let minAvg = Infinity;
    let minIndex = 0;

    for (let i = 0; i < A.length - 1; i++) {
        const avg2 = (A[i] + A[i + 1]) / 2;
        if (avg2 < minAvg) {
            minAvg = avg2;
            minIndex = i;
        }
        if (i < A.length - 2) {
            const avg3 = (A[i] + A[i + 1] + A[i + 2]) / 3;
            if (avg3 < minAvg) {
                minAvg = avg3;
                minIndex = i;
            }
        }
    }
    return minIndex;
}
```
> Knowing only slices of length 2 or 3 matter simplifies the prefix work.

---

### Example 4 — Count Divisible Numbers in Range

**Problem:**  
Given integers A, B and K, find number of integers divisible by K in range [A..B].

**Solution (Math shortcut instead of prefix sum array):**

```javascript
function solution(A, B, K) {
    return Math.floor(B / K) - Math.floor((A - 1) / K);
}
```
> You can think of this as prefix sums on counts of multiples of K.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Precompute cumulative sums | For fast range queries |
| Range sum (P, Q) | `prefixSum[Q+1] - prefixSum[P]` |
| Variants | Prefix min, max, XOR |
| Applications | DNA problems, subarrays, equilibrium, fast counting |
