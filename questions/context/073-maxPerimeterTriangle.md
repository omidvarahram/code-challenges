# MaxPerimeterTriangle

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

An array `A` consisting of `N` integers is given.  
A triplet of indices `(P, Q, R)` is called a **triangle** if `0 ≤ P < Q < R < N` and:

- `A[P] + A[Q] > A[R]`  
- `A[Q] + A[R] > A[P]`  
- `A[R] + A[P] > A[Q]`  

The **perimeter** of such a triangle equals `A[P] + A[Q] + A[R]`.

---

## Function signature

```
function solution(A: number[]): number;
```

Given an array `A` of `N` integers, return the **maximum perimeter** of any triangle in this array.  
Return `-1` if no triangle can be formed.

---

## Examples

### Example 1:

```
A = [10, 2, 5, 1, 8, 20]

Triplet (2, 4, 5) → values [5, 8, 20]
Perimeter: 5 + 8 + 10 = 23

Output: 23
```

### Example 2:

```
A = [10, 20, 30]

Output: -1  
Explanation: Cannot form a valid triangle since triangle inequality is not satisfied
```

### Example 3:

```
A = [8, 8, 8, 8, 5]

Triplet (1, 3, 4) → values [8, 8, 9]  
Perimeter: 8 + 8 + 9 = 25

Output: 25
```

---

## Constraints

- `N` is an integer within the range `[1..100,000]`
- Each element of array `A` is an integer within the range `[1..1,000,000,000]`

---

Write an **efficient algorithm** for the constraints above. Prioritize **correctness**.


1. **Restate the question in clear language**
   Given an array of integers, find the **largest perimeter** of any three numbers that can form the sides of a triangle. A valid triangle satisfies the triangle inequality for all three pairs. Return `-1` if no such triangle exists.

2. **Important points**

   * The triangle inequality for sorted sides `a ≤ b ≤ c`: `a + b > c`.
   * To maximize perimeter, pick the largest possible sides.

3. **Algorithm type**

   * Greedy + sort.

4. **Step-by-step solution**

   1. Sort `A` in non-increasing order (largest first).
   2. For every triplet of consecutive numbers, check if they form a valid triangle.
   3. Return the perimeter of the first (largest) valid triangle found.
   4. If none found, return `-1`.

5. **TypeScript solution**

   ```typescript
   function solution(A: number[]): number {
     A.sort((a, b) => b - a);
     for (let i = 0; i < A.length - 2; i++) {
       if (A[i] < A[i + 1] + A[i + 2]) {
         return A[i] + A[i + 1] + A[i + 2];
       }
     }
     return -1;
   }
   ```

6. **Examples from the question**

   * `[10, 2, 5, 1, 8, 20]` → sorted: \[20, 10, 8, 5, 2, 1]

     * 20, 10, 8 → 10+8=18 > 20? No
     * 10, 8, 5 → 8+5=13 > 10? Yes → perimeter = 10+8+5=23
     * Output: **23**
   * `[10, 20, 30]` → sorted: \[30, 20, 10]

     * 30, 20, 10 → 20+10=30, not greater than 30 → no triangle
     * Output: **-1**
   * `[8, 8, 8, 8, 5]` → sorted: \[8, 8, 8, 8, 5]

     * 8,8,8 → 8+8=16 > 8? Yes → perimeter=24
     * Output: **24**

7. **Additional test cases**

   | A                                     | Output     | Notes                |
   | ------------------------------------- | ---------- | -------------------- |
   | \[3, 4, 5]                            | 12         | Forms 3-4-5 triangle |
   | \[1, 1, 1, 2]                         | 3          | Use 1,1,1            |
   | \[1, 2, 3]                            | -1         | Not a valid triangle |
   | \[10, 50, 5, 1]                       | -1         | No valid triangle    |
   | \[1000000000, 1000000000, 1000000000] | 3000000000 | Large input          |
   | \[2, 2, 2, 2, 2]                      | 6          | Any triple 2s        |
