# 8. Maximum Subarray (Kadane's Algorithm)

## How the Approach Works

The **Maximum Subarray Problem** asks for the contiguous subarray with the largest sum.

**Kadane's Algorithm** solves it efficiently in **O(N)** time by:
- Scanning from left to right
- At each element, deciding whether to start a new subarray or continue the previous one
- Keeping track of the maximum subarray sum found so far

Key idea:  
`currentMax = max(A[i], currentMax + A[i])`  
`globalMax = max(globalMax, currentMax)`

## What Kind of Questions Use Maximum Subarray

- Finding the best gain (profit, score, etc.) in an interval
- Finding maximum/minimum subarray sums
- Detecting optimal periods (e.g., stock market, temperature)
- Handling contiguous segment optimizations

## Real Examples and Solutions

### Example 1 — Maximum Subarray Sum (Classic)

**Problem:**  
Find the contiguous subarray within an array that has the largest sum.

**Solution (Kadane’s Algorithm):**

```javascript
function maxSubArray(A) {
    let currentMax = A[0];
    let globalMax = A[0];

    for (let i = 1; i < A.length; i++) {
        currentMax = Math.max(A[i], currentMax + A[i]);
        globalMax = Math.max(globalMax, currentMax);
    }
    return globalMax;
}
```
> Either extend the previous subarray or start fresh.

---

### Example 2 — Max Slice Sum (Codility Lesson)

**Problem:**  
Find the maximal sum of any slice of array A.

**Solution:**

```javascript
function solution(A) {
    let maxEnding = A[0];
    let maxSlice = A[0];

    for (let i = 1; i < A.length; i++) {
        maxEnding = Math.max(A[i], maxEnding + A[i]);
        maxSlice = Math.max(maxSlice, maxEnding);
    }
    return maxSlice;
}
```
> Direct application of Kadane’s algorithm.

---

### Example 3 — Maximum Profit (Buy/Sell Stock)

**Problem:**  
Given an array where each element is a stock price, find the maximum profit you can achieve from one transaction.

**Solution (track min price and max profit):**

```javascript
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }
    }
    return maxProfit;
}
```
> Similar to maximum subarray logic, but tracking minimum and difference.

---

### Example 4 — Min Slice Sum (Variation)

**Problem:**  
Find the contiguous subarray with the minimum sum.

**Solution:**

```javascript
function minSubArray(A) {
    let currentMin = A[0];
    let globalMin = A[0];

    for (let i = 1; i < A.length; i++) {
        currentMin = Math.min(A[i], currentMin + A[i]);
        globalMin = Math.min(globalMin, currentMin);
    }
    return globalMin;
}
```
> Same Kadane's idea but using `Math.min`.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Kadane’s Algorithm | O(N) max subarray sum |
| Track running subarray | Extend or start fresh |
| Applications | Stocks, scores, temperature, profit problems |
| Variants | Max subarray, min subarray, 2D extensions |
