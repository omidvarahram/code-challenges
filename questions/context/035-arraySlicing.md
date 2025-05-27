ArraySlicing  
Medium  
50 min  
Given a sequence of distinct integers, split it into the maximum possible number of slices such that sorting the separate slices sorts the full sequence.

Task description  
We are given an array A consisting of N distinct integers. We would like to sort array A into ascending order using a simple algorithm. First, we divide it into one or more slices (a slice is a contiguous subarray). Then we sort each slice. After that, we join the sorted slices in the same order. Write a function ```solution``` that returns the maximum number of slices for which the algorithm will return a correctly sorted array.

Examples:  
1. Given A = [2, 4, 1, 6, 5, 9, 7], the function should return 3. The array can be split into three slices: [2, 4, 1], [6, 5] and [9, 7]. Then, after sorting each slice and joining them together, the whole array will be sorted into ascending order.

2. Given A = [4, 3, 2, 6, 1], the function should return 1. The array cannot be split into smaller slices; it has to be sorted all at once.

3. Given A = [2, 1, 6, 4, 3, 7], the function should return 3.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [1..1,000,000,000];
- the elements of A are all distinct.

## ArraySlicing

**Step-by-Step Explanation**

### 1. Problem Restatement

We have an array `A` of `N` distinct integers. We want to split it into the **maximum** number of contiguous slices so that if we sort each slice individually and then concatenate all the slices in order, the resulting array is completely sorted in ascending order.

### 2. Key Insight

This is equivalent to the “max chunks to make sorted” problem.  Observe that after slicing and sorting each slice, the concatenation is globally sorted exactly when at every slice boundary the **maximum** of all elements seen so far in `A` matches the **maximum** of the first part of the fully sorted array.

Concretely:

1. Let `B` be a sorted copy of `A`.
2. Define:

   * `maxA[i]` = maximum of `A[0..i]`.
   * `maxB[i]` = maximum of `B[0..i]` (which is simply `B[i]`, since `B` is sorted).
3. A valid slice boundary can occur **after** index `i` exactly when

   ```
   maxA[i] === maxB[i]
   ```
4. The **maximum** number of non-overlapping slices is therefore the **count** of indices `i` in `[0..N-1]` where `maxA[i] === B[i]`.

### 3. Example

* **A = \[2, 4, 1, 6, 5, 9, 7]**

  * Sorted B = `[1,2,4,5,6,7,9]`
  * Prefix maxima of A: `[2,4,4,6,6,9,9]`
  * B as maxima:          `[1,2,4,5,6,7,9]`
  * Compare elementwise:

    * i=0: 2≠1 → no slice
    * i=1: 4≠2 → no slice
    * i=2: 4=4 → slice boundary
    * i=3: 6≠5 → no
    * i=4: 6=6 → slice boundary
    * i=5: 9≠7 → no
    * i=6: 9=9 → slice boundary
      → **3** slices.

### 4. TypeScript Solution

```ts
function solution(A: number[]): number {
  const N = A.length;
  // 1) Build sorted copy B
  const B = [...A].sort((a, b) => a - b);

  // 2) Traverse and count matches of prefix maxima
  let count = 0;
  let maxSoFar = -Infinity;

  for (let i = 0; i < N; i++) {
    // update prefix max of A
    if (A[i] > maxSoFar) {
      maxSoFar = A[i];
    }
    // compare to sorted-B prefix max, which is B[i]
    if (maxSoFar === B[i]) {
      count++;
    }
  }

  return count;
}
```

* **Time Complexity:**

  * Sorting: O(N log N)
  * Single pass to count: O(N)
    Overall: O(N log N)

* **Space Complexity:**

  * O(N) extra for the sorted copy

This efficiently handles up to N = 100,000.
