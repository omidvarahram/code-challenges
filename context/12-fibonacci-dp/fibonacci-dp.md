# 12. Fibonacci Dynamic Programming

## How the Approach Works

The **Fibonacci sequence** is a series where each number is the sum of the two preceding ones:
- `F(0) = 0`, `F(1) = 1`
- `F(n) = F(n-1) + F(n-2)`

Using **dynamic programming (DP)**, we can avoid recalculating the same values multiple times:
- Store previous results in a table (array or variables).
- Build up from base cases (`F(0)`, `F(1)`) to `F(n)`.

Dynamic programming reduces time complexity from **O(2^n)** (recursive) to **O(n)** (bottom-up).

Space optimization:
- Since only last two numbers are needed, we can keep just two variables (O(1) space).

## What Kind of Questions Use Fibonacci Dynamic Programming

- Calculating Fibonacci numbers
- Counting ways to climb stairs (jumping 1 or 2 steps)
- Solving problems based on combinations (e.g., ladder problems)
- Dynamic recurrence relations
- Optimizing basic recursive formulas

## Real Examples and Solutions

### Example 1 — Fibonacci Number (DP Array)

**Problem:**  
Compute the N-th Fibonacci number using dynamic programming.

**Solution:**

```javascript
function fibonacci(N) {
    if (N <= 1) return N;

    const dp = new Array(N + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= N; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[N];
}
```
> Build up the solution from bottom to top.

---

### Example 2 — Fibonacci Number (Space Optimized)

**Problem:**  
Compute the N-th Fibonacci number using O(1) space.

**Solution:**

```javascript
function fibonacci(N) {
    if (N <= 1) return N;

    let a = 0, b = 1;
    for (let i = 2; i <= N; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
```
> Only two variables are needed at any time.

---

### Example 3 — Frog Jump (Codility Lesson)

**Problem:**  
A frog can jump 1 or 2 units forward. How many ways can it reach a given step?

**Solution:**

```javascript
function waysToJump(N) {
    if (N === 0 || N === 1) return 1;

    let a = 1, b = 1;
    for (let i = 2; i <= N; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
```
> Same structure as Fibonacci because of 1-step and 2-step jumps.

---

### Example 4 — Fib Ladder (Codility Lesson)

**Problem:**  
Given ladders of different heights, calculate number of ways to climb each ladder modulo powers of 2.

**Solution:**

```javascript
function solution(A, B) {
    const L = A.length;
    const maxA = Math.max(...A);
    const fib = new Array(maxA + 2).fill(0);
    fib[1] = 1;

    for (let i = 2; i <= maxA + 1; i++) {
        fib[i] = (fib[i - 1] + fib[i - 2]) % (1 << 30);
    }

    const result = new Array(L);
    for (let i = 0; i < L; i++) {
        result[i] = fib[A[i] + 1] % (1 << B[i]);
    }
    return result;
}
```
> Precompute large Fibonacci numbers once, then use modulus for each query.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Fibonacci sequence | Dynamic programming build-up |
| Time Complexity | O(N) |
| Space Complexity | O(N) or O(1) optimized |
| Applications | Stair climbing, ladder problems, recurrence relations |
