**DivideIntoGroups**  
*Medium*  
*50 min*  
Divide people into three groups so that the largest score difference between the people in each group is as small as possible.

---

### Task description

There is an array A consisting of N integers. Divide them into three non-empty groups. In each group we calculate the difference between the largest and smallest integer. Our goal is to make the maximum of these differences as small as possible.

For example, given A = [11, 5, 3, 12, 6, 8, 1, 7, 4], we can divide the elements into three groups:
- [3, 1, 4] — the difference between elements is 3;
- [5, 6, 8, 7] — the difference is also 3;
- [11, 12] — the difference is 1.

The maximum difference equals 3, which is the minimum possible result.

---

### Write a function:
```function solution(A);```

that, given an array A, returns the minimum possible result as explained above.

---

### Examples:

1. For A = [11, 5, 3, 12, 6, 8, 1, 7, 4], the function should return 3, as explained above.

2. For A = [10, 14, 12, 1000, 11, 15, 13, 1], the function should return 5. The elements of A should be divided into three groups as follows:  
   - [1];  
   - [10, 14, 12, 11, 15, 13];  
   - [1000].

3. For A = [4, 5, 7, 10, 12, 12, 12], the function should return 2. The elements of A could be divided into these three groups:
   - [4, 5];  
   - [7];  
   - [10, 10, 12, 12].

4. For A = [5, 10, 10, 5, 5], the function should return 0. The first group may contain all elements with value 5; the second and the third groups may each contain one element with value 10.

---

### Write an efficient algorithm for the following assumptions:
- N is an integer within the range [3..100,000];  
- each element of array A is an integer within the range [0..1,000,000,000].

## DivideIntoGroups

**Step-by-Step Explanation**

### 1. Problem Restatement

We have an array `A` of `N` integers. We want to split them into **three nonempty** groups so that, for each group, the “score difference” (max minus min in that group) is computed, and we take the **maximum** of those three differences. We seek the **minimum possible** value of that maximum difference.

### 2. Key Observation

Because only the values matter (not original positions), and we may choose any grouping, the optimal grouping will always partition the **sorted** array `A` into **three contiguous segments**.
 - Let `B = A.sort((x,y)=>x-y)`.
 - We choose two cut‐points `i, j` with

```
 1 ≤ i < j ≤ N−1
```

that form segments:

* Group 1: `B[0..i−1]`
* Group 2: `B[i..j−1]`
* Group 3: `B[j..N−1]`

The three ranges are:

```
  d1 = B[i−1] − B[0]
  d2 = B[j−1] − B[i]
  d3 = B[N−1] − B[j]
```

We want to minimize `max(d1, d2, d3)` over all valid `(i,j)`.

A direct double‐loop over `i,j` is O(N²) and too large for N=100k.

### 3. Feasibility Check by Binary Search on Answer

Let `R` be a candidate for the minimal maximum difference. We ask: **Can we find cuts `i,j` so that all three differences ≤ `R`?**

* **Group 1 constraint**
  `B[i−1] − B[0] ≤ R`
  ⇒ `i−1 ≤ i_max`, where `i_max` = highest index with `B[i_max] − B[0] ≤ R`.
  Thus valid `i` lie in

  ```
    1 ≤ i ≤ i_max+1.
  ```

* **Group 3 constraint**
  `B[N−1] − B[j] ≤ R`
  ⇒ `B[j] ≥ B[N−1] − R`.
  Let

  ```
    j0 = first index in B with B[j0] ≥ B[N−1]−R.
  ```

  Then valid `j` satisfy

  ```
    j0 ≤ j ≤ N−1.
  ```

* **Group 2 constraint** for a given `i` and `j`:
  `B[j−1] − B[i] ≤ R`
  ⇒ `B[j−1] ≤ B[i] + R`.
  Let

  ```
    k_max(i) = last index k ≥ i with B[k] ≤ B[i] + R.
  ```

  Then `j−1 ≤ k_max(i)` ⇒ `j ≤ k_max(i) + 1`.

Putting it all together:
We need to find **some** `i` and `j` such that

```
  1 ≤ i ≤ i_max+1,
  j0 ≤ j ≤ N−1,
  i+1 ≤ j ≤ k_max(i)+1.
```

Combine the `j`‐constraints into

```
  max(i+1, j0) ≤ j ≤ min(k_max(i)+1, N−1).
```

If for **any** valid `i` this interval is non‐empty, then `R` is feasible.

### 4. Binary Search

1. Sort `A` into `B`.
2. Precompute `B[0]` and `B[N−1]`.
3. Binary‐search `R` in `[0..B[N−1]−B[0]]`. For each `R`:

   * Compute `i_max` with a linear scan or `upper_bound`.
   * Compute `j0` with binary search on `B[N−1]−R`.
   * For `i` from `1` to `i_max+1` (clamped to `<N-1`):

     * Compute `k_max(i)` by binary search for `B[i]+R`.
     * Check if `max(i+1,j0) ≤ min(k_max(i)+1, N−1)`.
     * If true for any `i`, **accept** `R`.
   * If none succeed, **reject** `R`.
4. Return the smallest accepted `R`.

This runs in `O(N log N)` for sort plus `O((N + log N)·log V)` for the binary search over `R` (where `V` is the value‐range). Efficient for `N = 100{,}000`.

---

```ts
function solution(A: number[]): number {
  const N = A.length;
  const B = [...A].sort((x, y) => x - y);
  const minVal = B[0], maxVal = B[N-1];

  // Helper: find first index > x
  function upperBound(arr: number[], x: number): number {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] <= x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  // Helper: find first index >= x
  function lowerBound(arr: number[], x: number): number {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  // Check feasibility for a given R
  function canDo(R: number): boolean {
    // i_max so B[i_max] - minVal <= R
    const i_max = upperBound(B, minVal + R) - 1;
    if (i_max < 0) return false;
    // j0 so B[j0] >= maxVal - R
    const j0 = lowerBound(B, maxVal - R);
    if (j0 > N - 1) return false;

    // Try i from 1 to i_max+1 (but ensure i < N-1)
    const iLimit = Math.min(i_max + 1, N - 2);
    for (let i = 1; i <= iLimit; i++) {
      // k_max(i) so B[k_max] <= B[i] + R
      const k_max = upperBound(B, B[i] + R) - 1;
      // j must satisfy max(i+1, j0) <= j <= min(k_max+1, N-1)
      const lower = Math.max(i + 1, j0);
      const upper = Math.min(k_max + 1, N - 1);
      if (lower <= upper) return true;
    }
    return false;
  }

  // Binary search on R
  let lo = 0, hi = maxVal - minVal;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (canDo(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

* **Time Complexity:**

  * Sorting: $O(N\log N)$
  * Binary‐search over $R$ (up to $\log(\maxVal-\minVal)$ steps), each step $O(\log N + i_{\max})\approx O(N+\log N)$ in worst case → overall $O(N\log N)$.

* **Space Complexity:** $O(N)$

This finds the minimum possible maximum difference for the best three‐group partition.

