# 15. Greedy Algorithms

## How the Approach Works

**Greedy algorithms** make the **locally optimal choice** at each step, hoping to find the **global optimum**.

Key characteristics:
- No reconsideration of previous choices.
- Works best when the problem has the **greedy-choice property** and **optimal substructure**.
- Simple, fast, often **O(N log N)** or **O(N)** time solutions.

Common greedy patterns:
- Always pick the next best-looking option.
- Sort elements based on some priority.
- Take as much as possible immediately.

## What Kind of Questions Use Greedy Algorithms

- Interval scheduling, task selection
- Covering points or segments
- Minimizing/maximizing totals
- Problems involving selections with priority
- Problems requiring optimal "partial" decisions without backtracking

## Real Examples and Solutions

### Example 1 — Max Non-Overlapping Segments

**Problem:**  
Given arrays A and B (start and end points), find the maximum number of non-overlapping segments.

**Solution:**

```javascript
function solution(A, B) {
    if (A.length === 0) return 0;

    let count = 1;
    let end = B[0];

    for (let i = 1; i < A.length; i++) {
        if (A[i] > end) {
            count++;
            end = B[i];
        }
    }
    return count;
}
```
> Always pick the segment that ends earliest.

---

### Example 2 — Tie Ropes

**Problem:**  
Tie ropes until each rope length is at least K. Return the maximum number of ropes.

**Solution:**

```javascript
function solution(K, A) {
    let count = 0;
    let length = 0;

    for (let i = 0; i < A.length; i++) {
        length += A[i];
        if (length >= K) {
            count++;
            length = 0;
        }
    }
    return count;
}
```
> Always tie until reaching minimum length, then reset.

---

### Example 3 — Min Number of Arrows to Burst Balloons

**Problem:**  
Find the minimum number of arrows needed to burst all balloons.

**Solution:**

```javascript
function findMinArrowShots(points) {
    if (points.length === 0) return 0;

    points.sort((a, b) => a[1] - b[1]);
    let arrows = 1;
    let end = points[0][1];

    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
    }
    return arrows;
}
```
> Sort by end points and shoot just after current balloon ends.

---

### Example 4 — Jump Game

**Problem:**  
Given array nums, you are at index 0 and want to reach last index with minimal jumps.

**Solution:**

```javascript
function canJump(nums) {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}
```
> Greedily extend reach as far as possible.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Greedy choice property | Locally optimal leads to globally optimal |
| No backtracking | Once a choice is made, not reconsidered |
| Time Complexity | O(N) or O(N log N) for most greedy problems |
| Applications | Intervals, resource selection, optimization |
