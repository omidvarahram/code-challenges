# 20. Binary Search on Answer

## How the Approach Works

**Binary Search on Answer** is a powerful pattern used when:
- The answer lies within a numeric range (e.g., between 1 and N).
- You cannot search the array directly but can **test** whether a given value is valid.
- You perform binary search on the **solution space** instead of on actual elements.

Key steps:
- Define the range of possible answers (min, max).
- At each step, check if the mid-point is a feasible solution.
- Adjust the search bounds based on feasibility.

Time complexity: **O(log(max-min)) × O(checking cost)**

## What Kind of Questions Use Binary Search on Answer

- Finding minimum or maximum possible values (optimization)
- Partitioning problems
- Resource allocation
- Scheduling problems
- Questions involving "minimize the maximum" or "maximize the minimum"

## Real Examples and Solutions

### Example 1 — Minimize Maximum Distance to Gas Station

**Problem:**  
Add K gas stations to minimize the maximum distance between any two stations.

**Solution:**

```javascript
function minmaxGasDist(stations, K) {
    let left = 0, right = stations[stations.length - 1] - stations[0];

    function canPlace(d) {
        let count = 0;
        for (let i = 1; i < stations.length; i++) {
            count += Math.floor((stations[i] - stations[i - 1]) / d);
        }
        return count <= K;
    }

    for (let iter = 0; iter < 100; iter++) {
        const mid = (left + right) / 2;
        if (canPlace(mid)) {
            right = mid;
        } else {
            left = mid;
        }
    }
    return left;
}
```
> Binary search over possible maximum distances.

---

### Example 2 — Capacity to Ship Packages Within D Days

**Problem:**  
Find the minimal ship capacity to deliver packages within D days.

**Solution:**

```javascript
function shipWithinDays(weights, D) {
    let left = Math.max(...weights);
    let right = weights.reduce((a, b) => a + b, 0);

    function canShip(capacity) {
        let days = 1, load = 0;
        for (let w of weights) {
            if (load + w > capacity) {
                days++;
                load = 0;
            }
            load += w;
        }
        return days <= D;
    }

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canShip(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```
> Binary search over capacity values.

---

### Example 3 — Split Array Largest Sum

**Problem:**  
Split array into m subarrays minimizing the largest sum among them.

**Solution:**

```javascript
function splitArray(nums, m) {
    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);

    function canSplit(maxSum) {
        let splits = 1, sum = 0;
        for (let num of nums) {
            if (sum + num > maxSum) {
                splits++;
                sum = 0;
            }
            sum += num;
        }
        return splits <= m;
    }

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canSplit(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```
> Minimize the maximum subarray sum via binary search.

---

### Example 4 — Kth Smallest Number in Multiplication Table

**Problem:**  
Find the kth smallest number in an m × n multiplication table.

**Solution:**

```javascript
function findKthNumber(m, n, k) {
    let left = 1, right = m * n;

    function countLessEqual(x) {
        let count = 0;
        for (let i = 1; i <= m; i++) {
            count += Math.min(Math.floor(x / i), n);
        }
        return count;
    }

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (countLessEqual(mid) < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}
```
> Binary search on the number value space.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Binary search on answer | Search on numeric solution space |
| Feasibility check | At each step, validate if mid satisfies conditions |
| Applications | Minimize/maximize values, partitioning, optimization |
| Time complexity | O(log(range)) × O(checking cost) |