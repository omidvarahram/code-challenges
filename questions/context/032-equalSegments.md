EqualSegments  
Medium  
50 min  
Find the maximum number of non-intersecting segments of length 2 with equal sums in a given array of integers.

---

### Task description

You are given an array A of integers. Find the maximum number of non-intersecting segments of length 2 (two adjacent elements), such that segments have an equal sum.

For example, given A = [10, 1, 3, 1, 2, 2, 1, 0, 4], there are three non-intersecting segments, each whose sum is equal to 4: (1, 3), (2, 2), (0, 4).  
Another three non-intersecting segments are: (3, 1), (2, 2), (0, 4).

---

### Write a function:
```function solution(A);```

that, given an array A of N integers, returns the maximum number of segments with equal sums.

---

### Examples:

1. Given A = [10, 1, 3, 1, 2, 2, 1, 0, 4], the function should return 3, as explained above.

2. Given A = [5, 3, 1, 3, 2, 3], the function should return 1.  
   Each sum of two adjacent elements is different from the others.

3. Given A = [9, 9, 9, 9, 9], the function should return 2.

4. Given A = [1, 5, 2, 4, 3, 3], the function should return 3.  
   There are three segments: (1, 5), (2, 4), (3, 3) whose sums are equal to 6.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [2..100,000];
- each element of array A is an integer within the range [0..1,000,000,000].

---
## EqualSegments

**Step-by-Step Explanation**

### Step 1: Understand the Problem  
We have an array `A` of length `N`. We want to select as many **non-overlapping** subarrays of length 2 (i.e. adjacent pairs `(A[i], A[i+1])`) as possible, **all** having the **same** sum.

### Step 2: Strategy  
1. **Compute each pair’s sum** for all `i = 0..N-2`.  
2. **Group** the start-indices `i` by their sum `s = A[i] + A[i+1]`.  
3. For each group of indices with the same sum, **greedily** pick as many non-overlapping segments as possible:
   - Keep a variable `lastEnd = -1`.
   - Iterate the sorted list of start-indices `i`.
   - If `i > lastEnd`, select this segment `(i, i+1)`, increment a counter, and set `lastEnd = i+1`.
4. The answer is the **maximum** count among all sums.

This runs in **O(N)** time and space:  
- We make one pass to build the groups,  
- then one pass over all groups to count greedily.

---

```ts
function solution(A: number[]): number {
  const N = A.length;
  if (N < 2) return 0;

  // 1) Group start-indices by the sum of A[i]+A[i+1]
  const groups = new Map<number, number[]>();
  for (let i = 0; i < N - 1; i++) {
    const sum = A[i] + A[i + 1];
    if (!groups.has(sum)) groups.set(sum, []);
    groups.get(sum)!.push(i);
  }

  // 2) For each sum-group, greedily count non-overlapping segments
  let best = 0;
  for (const indices of groups.values()) {
    let count = 0;
    let lastEnd = -1;
    // indices are in ascending order by construction
    for (const start of indices) {
      if (start > lastEnd) {
        count++;
        lastEnd = start + 1;  // segment covers [start, start+1]
      }
    }
    best = Math.max(best, count);
  }

  return best;
}
```
