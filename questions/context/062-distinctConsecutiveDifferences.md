# DistinctConsecutiveDifferences

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

There is an array `A` consisting of `N` integers. How many distinct values can be obtained by calculating the absolute difference between two **consecutive elements**?

For example:
- Given A = [4, 12, 7, 4], pairs of consecutive elements are:
  - 4 and 12 (difference 8)
  - 12 and 7 (difference 5)
  - 7 and 4 (difference 3)  
  There are **three** distinct absolute differences between elements: **8, 5, and 3**.

Write a function:

```
function solution(A: number[]): number;
```

that, given an array `A`, returns the number of distinct values that can be obtained by calculating the absolute difference between consecutive elements of `A`.

### Examples

1. Given `A = [4, 12, 7, 4]`, the function should return `3`. Differences are 8, 5, 3.
2. Given `A = [2, 4, 10]`, the function should return `2`. Differences are 2, 6.
3. Given `A = [5, 5]`, the function should return `1`. The only difference is 0.

---

### Assumptions

- `N` is an integer within the range `[2..100,000]`
- Each element of array `A` is an integer within the range `[-1,000,000,000..1,000,000,000]`

---

In your solution, focus on **correctness**. The performance of your solution will not be the focus of the assessment.


1. **Restate the question in clear language**
   Given an array `A` of integers, compute the absolute difference between every pair of consecutive elements. Return the count of **distinct** such differences.

2. **Important points**

   * Use `Math.abs(A[i] - A[i-1])` for each consecutive pair.
   * Return the count of distinct differences.

3. **Algorithm type**

   * Set to track distinct values, loop over the array.

4. **Step-by-step solution**

   1. Create an empty Set to store differences.
   2. For each index from 1 to `A.length-1`:

      * Compute `diff = Math.abs(A[i] - A[i-1])`
      * Add `diff` to the Set.
   3. Return the size of the Set.

5. **TypeScript solution**

   ```ts copy
   function solution(A: number[]): number {
     const diffs = new Set<number>();
     for (let i = 1; i < A.length; i++) {
       diffs.add(Math.abs(A[i] - A[i - 1]));
     }
     return diffs.size;
   }
   ```

6. **Covering the examples in the question**

   * `A = [4, 12, 7, 4]` → differences: 8, 5, 3 → **3**
   * `A = [2, 4, 10]` → differences: 2, 6 → **2**
   * `A = [5, 5]` → difference: 0 → **1**

7. **Additional test cases**

   | A                           | Expected | Reason                 |
   | --------------------------- | -------- | ---------------------- |
   | `[1, 2, 3, 4]`              | 1        | all differences 1      |
   | `[1, -1, 1, -1]`            | 1        | all differences 2      |
   | `[10, 5, 10, 5, 10]`        | 1        | all differences 5      |
   | `[0, 100, -100, 0]`         | 1        | all differences 100    |
   | `[1, 3, 6, 10, 15]`         | 4        | differences: 2,3,4,5   |
   | `[42, 42]`                  | 1        | difference: 0          |
   | `[-1000000000, 1000000000]` | 1        | difference: 2000000000 |
   | `[0, 0, 0, 0]`              | 1        | all differences 0      |
