# 16. Dynamic Programming

## How the Approach Works

**Dynamic Programming (DP)** is a method for solving problems by **breaking them into subproblems**, **solving each subproblem once**, and **storing their results**.

Key characteristics:
- **Optimal substructure:** The solution to a problem can be composed of solutions to subproblems.
- **Overlapping subproblems:** The same subproblems are solved multiple times.

Common approaches:
- **Top-down (memoization):** Recursive + cache
- **Bottom-up (tabulation):** Iterative DP table

Time and space complexity often improved from exponential to **O(N)**, **O(N²)**, etc.

## What Kind of Questions Use Dynamic Programming

- Counting number of ways
- Optimizing (maximum/minimum) scores, sums, profits
- Partitioning problems
- Subsequence/subarray problems
- Problems with "choice at each step" + overlapping states

## Real Examples and Solutions

### Example 1 — Fibonacci Numbers (Bottom-Up)

**Problem:**  
Compute the N-th Fibonacci number.

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
> Basic example of bottom-up dynamic programming.

---

### Example 2 — Climbing Stairs (Ways to Top)

**Problem:**  
You can climb 1 or 2 steps. How many ways to reach the top?

**Solution:**

```javascript
function climbStairs(n) {
    if (n <= 2) return n;

    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
```
> Same structure as Fibonacci, space optimized.

---

### Example 3 — Maximal Rectangle Area (DP on Histograms)

**Problem:**  
Find the largest rectangle in a histogram.

**Solution:**

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    heights.push(0);
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}
```
> Combination of dynamic programming and monotonic stack.

---

### Example 4 — Min Path Sum in Grid

**Problem:**  
Find the minimum sum path from top-left to bottom-right in a 2D grid.

**Solution:**

```javascript
function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            else if (i === 0) grid[i][j] += grid[i][j - 1];
            else if (j === 0) grid[i][j] += grid[i - 1][j];
            else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    return grid[m - 1][n - 1];
}
```
> Each cell depends only on the cell above and to the left.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Dynamic programming | Solve subproblems once, store results |
| Top-down | Memoization (recursive with cache) |
| Bottom-up | Tabulation (iterative) |
| Applications | Optimization, counting, subsequence problems |
