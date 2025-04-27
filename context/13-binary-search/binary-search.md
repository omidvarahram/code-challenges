# 13. Binary Search

## How the Approach Works

**Binary search** is an efficient algorithm for finding a target value within a **sorted array**.

How it works:
- Start with two pointers (`left`, `right`) at the ends of the array.
- Repeatedly check the middle element:
  - If it's the target, return it.
  - If the target is smaller, search the left half.
  - If the target is larger, search the right half.
- Continue until the search space is empty.

Time complexity is **O(log N)**.

Variants:
- **Find exact value** (standard)
- **Find lower/upper bound** (first/last occurrence)
- **Search on answer** (optimize parameter like minimal/maximal value)

## What Kind of Questions Use Binary Search

- Searching in sorted arrays
- Finding first/last occurrence of an element
- Problems asking for minimum or maximum feasible value
- Optimizing search over ranges (parametric search)
- Speeding up decision problems

## Real Examples and Solutions

### Example 1 — Standard Binary Search

**Problem:**  
Find index of target in a sorted array, or return -1 if not found.

**Solution:**

```javascript
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
```
> Search halves the array at each step.

---

### Example 2 — Find First Occurrence (Lower Bound)

**Problem:**  
Find the first index where value ≥ target.

**Solution:**

```javascript
function lowerBound(arr, target) {
    let left = 0, right = arr.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}
```
> Modified binary search for lower bound.

---

### Example 3 — Minimize Max Distance (Parametric Search)

**Problem:**  
Place cows in stalls minimizing the largest minimum distance between any two cows.

**Solution:**

```javascript
function canPlace(stalls, cows, dist) {
    let count = 1;
    let last = stalls[0];

    for (let i = 1; i < stalls.length; i++) {
        if (stalls[i] - last >= dist) {
            count++;
            last = stalls[i];
        }
    }
    return count >= cows;
}

function solution(stalls, cows) {
    stalls.sort((a, b) => a - b);
    let left = 0, right = stalls[stalls.length - 1] - stalls[0];
    let result = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canPlace(stalls, cows, mid)) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}
```
> Search for the largest minimum distance.

---

### Example 4 — Peak Element (Binary Search Variation)

**Problem:**  
Find a peak element in array (greater than neighbors).

**Solution:**

```javascript
function findPeak(arr) {
    let left = 0, right = arr.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] > arr[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```
> Find peak without checking all elements.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Binary search | Find value in O(log N) |
| Lower/upper bounds | First/last occurrence |
| Parametric search | Search over possible answers |
| Applications | Search, optimization, feasibility problems |
