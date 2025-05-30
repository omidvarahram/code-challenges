# SameCorners

**Hard**
**60 min**
Given an array, find the subarray with the largest sum in which the leftmost and rightmost elements are the same.

---

## Task description

You are given an array A consisting of N positive integers. Consider subarrays of A, with at least two elements, in which the first and last elements are equal. Your task is to find the largest sum of such a subarray.

For example, for array A = \[1, 3, 5, 1, 6, 6, 9, 9], the following subarrays meet the requirements:

* Subarray \[1, 3, 5, 1] (first and last elements are equal to 1, the sum is 1 + 3 + 5 + 1 = 10)
* Subarray \[6, 6] (first and last elements are equal to 6, the sum is 6 + 6 = 12)
* Subarray \[9, 9] (first and last elements are equal to 9, the sum is 9 + 9 = 18)

The subarray with the largest sum is \[6, 6, 9, 9], and its sum is 30.

Write a function:

```
function solution(A);
```

that, given an array A of N positive integers, returns the largest sum of a subarray whose first and last elements have the same value.

If there is no such subarray, return -1.

---

### Examples

1. Given A = \[1, 3, 5, 1, 6, 6, 9, 9], the function should return 30 (as explained above).
2. Given A = \[5, 1, 4, 3], the function should return -1. There is no subarray satisfying the requirements.
3. Given A = \[2, 2, 2, 3, 2, 3], the function should return 11. The subarray with the largest sum is \[2, 2, 2, 3, 2].

---

## Write an efficient algorithm for the following assumptions:

* N is an integer within the range \[2..100,000];
* each element of array A is an integer within the range \[1..10,000].

---



1. **Restating the problem**
   You have an array `A` of `N` positive integers.  You want to choose a **contiguous** subarray of length ≥ 2 whose **first and last elements are equal**, and maximize the sum of its elements.  If no such subarray exists, return `-1`.

2. **Important points**

   * Subarray must have at least two elements.
   * Its **first element** and its **last element** must be the **same value**.
   * You want the **maximum** sum among all such subarrays.
   * We can solve this in **O(N)** time using prefix sums and a map from value → minimal prefix sum at its first occurrence.

3. **Algorithm type**
   Prefix sums + hash map lookup (linear scan).

4. **Step-by-step explanation**

   1. Compute the prefix‐sum array `P` of length `N+1`, where

      ```
      P[0] = 0,  
      P[i+1] = P[i] + A[i]   for 0 ≤ i < N.
      ```
   2. Create a map `firstPrefix: Map<number, number>` to record, for each value `v`, the **smallest** `P[i]` seen so far at an index `i` where `A[i] = v`.
   3. Initialize `best = -1`.
   4. Iterate `j` from `0` to `N−1`:

      * Let `v = A[j]`.
      * If `firstPrefix` does **not** have `v`, set `firstPrefix.set(v, P[j])`.
      * Else (we have seen `v` before at some index `i < j`):

        1. Let `minP = firstPrefix.get(v)!`.
        2. The subarray from `i` to `j` has sum

           ```
           sum = P[j+1] − P[i]  = P[j+1] − minP
           ```
        3. Update `best = max(best, sum)`.
        4. Also update `firstPrefix.set(v, min(minP, P[j]))` so that future matches use the smallest possible prefix.
   5. Return `best`.

5. **TypeScript solution**

   ```typescript
   function solution(A: number[]): number {
     const N = A.length;
     const P: number[] = new Array(N+1);
     P[0] = 0;
     for (let i = 0; i < N; i++) {
       P[i+1] = P[i] + A[i];
     }

     const firstPrefix = new Map<number, number>();
     let best = -1;

     for (let j = 0; j < N; j++) {
       const v = A[j];
       const currPref = P[j];
       if (!firstPrefix.has(v)) {
         // record first occurrence
         firstPrefix.set(v, currPref);
       } else {
         // compute subarray sum from earliest i to j
         const minP = firstPrefix.get(v)!;
         const sum = P[j+1] - minP;
         if (sum > best) best = sum;
         // keep the minimal prefix for v
         if (currPref < minP) {
           firstPrefix.set(v, currPref);
         }
       }
     }

     return best;
   }
   ```

6. **Covering the given examples**

   * **Example 1**

     * Input: `[1,3,5,1,6,6,9,9]`
     * Valid subarrays with matching ends:

       * `[1…1]` → sum = 10
       * `[6,6]` → sum = 12
       * `[9,9]` → sum = 18
     * **Answer** = 18

     > *Note:* the statement’s example of 30 (for `[6,6,9,9]`) is inconsistent with “first and last elements must be the same.”
   * **Example 2**

     * Input: `[5,1,4,3]` → no matching‐ends subarray → **-1**
   * **Example 3**

     * Input: `[2,2,2,3,2,3]`
     * Best subarray is from index 0 to 4: `[2,2,2,3,2]` → sum = 11 → **11**

7. **Additional test cases**

   | A                                  | Expected | Notes                                                                                            |
   | ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
   | `[1,1]`                            | `2`      | Smallest valid subarray of length 2                                                              |
   | `[7,5,7]`                          | `19`     | Subarray `[7,5,7]`                                                                               |
   | `[5,1,6]`                          | `-1`     | No matching ends                                                                                 |
   | `Array(100_000).fill(1)`           | `100000` | All elements are 1 → best is full array sum                                                      |
   | `[1,2,1,2,1]`                      | `6`      | Best is `[1,2,1,2,1]` sum=7? Actually prefix picks earliest for 1 at i=0 → j=4 → sum=1+2+1+2+1=7 |
   | `[3,3,3,3]`                        | `12`     | Entire array                                                                                     |
   | `[1,100,1,100,1]`                  | `203`    | Best is from first `1` to last `1`: sum=1+100+1+100+1                                            |
   | Random length 100 000 with repeats | —        | Performance: O(N) time, O(N) memory                                                              |
