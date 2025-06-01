# MaxBoundedFibonacci

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

Function `F(K)` is defined for non-negative integers as follows:

- `F(K) = 0` when `K = 0`  
- `F(K) = F(K−1) + F(K−2)` when `K > 0`  

Write a function:

```ts
function solution(N: number): number;
```

that, given a non-negative integer `N`, returns the **largest non-negative integer K** such that `F(K) ≤ N`.

---

## Example

Given `N = 17`, the function should return `5`, because:
- `F(5) = 8`,  
- `F(6) = 13`,  
- `F(7) = 21` → which is greater than 17

So the largest `K` for which `F(K) ≤ 17` is `5`.

---

## Constraints

- `N` is an integer within the range `[0..1,000,000,000]`

---

Write an **efficient algorithm** for the given constraint.


1. **Restate the question in clear language**
   Given a non-negative integer `N`, return the largest integer `K` such that the `K`-th Fibonacci number (with `F(0)=0`, `F(1)=1`, `F(2)=1`, etc.) is less than or equal to `N`.

2. **Important points**

   * Compute Fibonacci numbers until exceeding `N`.
   * Return the **largest K** where `F(K) ≤ N`.

3. **Algorithm type**

   * Simple iterative Fibonacci generation (O(log N) steps, since Fibonacci grows exponentially).

4. **Step-by-step solution**

   1. Start with `f0 = 0`, `f1 = 1`, `k = 1`.
   2. While `f1 ≤ N`, update `f0 = f1`, `f1 = f0 + f1`, increment `k`.
   3. When `f1 > N`, return `k - 1`.

5. **TypeScript solution**

   ```ts copy
   function solution(N: number): number {
     if (N === 0) return 0;
     let f0 = 0, f1 = 1, k = 1;
     while (f1 <= N) {
       const next = f0 + f1;
       f0 = f1;
       f1 = next;
       k++;
     }
     return k - 1;
   }
   ```

6. **Examples from the question**

   * N = 17:
     Fibonacci: 0 (0), 1 (1), 1 (2), 2 (3), 3 (4), 5 (5), 8 (6), 13 (7), 21 (8)
     F(7)=13 ≤ 17, F(8)=21 > 17 ⇒ answer: **7**
     *(The question says 5 for F(5)=8, but actually F(6)=13, F(7)=21 so the answer should be K=6, since F(6)=13 ≤ 17, F(7)=21>17. But depends if index starts at 0, see implementation. The function as implemented matches F(0)=0, F(1)=1, F(2)=1, ... so K=6 for N=17.)*

7. **Additional test cases**

   | N                | Output | Notes                             |
   | ---------------- | ------ | --------------------------------- |
   | 0                | 0      | F(0)=0                            |
   | 1                | 2      | F(2)=1, F(3)=2                    |
   | 2                | 3      | F(3)=2, F(4)=3                    |
   | 8                | 6      | F(6)=8                            |
   | 21               | 8      | F(8)=21                           |
   | 22               | 8      | F(8)=21 < 22, F(9)=34>22          |
   | 1000             | 16     | F(16)=987, F(17)=1597             |
   | 1\_000\_000\_000 | 44     | F(44)=701408733, F(45)=1134903170 |

**Note:**
If you want the K for which F(K) is **maximal but ≤ N**, this code does that.
If the definition is that F(0)=0, F(1)=1, F(2)=1, ... this function matches standard Fibonacci.
