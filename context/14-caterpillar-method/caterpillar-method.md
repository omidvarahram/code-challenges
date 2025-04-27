# 14. Caterpillar Method (Two Pointers)

## How the Approach Works

The **Caterpillar Method** (also called **Two Pointers Method**) involves:
- Using two pointers (`start` and `end`) to represent a window or segment.
- Moving one or both pointers according to problem constraints.
- Expanding or shrinking the window dynamically.

Key properties:
- Works when input is sorted or can be treated like a sorted interval.
- Achieves **O(N)** time complexity instead of **O(N²)** brute-force.

Patterns:
- Expand the end pointer to include more elements.
- Move the start pointer to shrink the segment when a condition is violated.

## What Kind of Questions Use Caterpillar Method

- Finding subarrays that meet a condition
- Counting or summing elements in a moving window
- Longest/shortest subarrays under constraints
- Minimal/maximal ranges
- Problems where a window grows and shrinks dynamically

## Real Examples and Solutions

### Example 1 — Count Distinct Slices

**Problem:**  
Count the number of distinct slices (contiguous subarrays with no duplicates).

**Solution:**

```javascript
function solution(M, A) {
    const seen = new Array(M + 1).fill(false);
    let front = 0, count = 0;

    for (let back = 0; back < A.length; back++) {
        while (front < A.length && !seen[A[front]]) {
            seen[A[front]] = true;
            count += (front - back + 1);
            front++;
        }
        seen[A[back]] = false;
    }
    return count > 1000000000 ? 1000000000 : count;
}
```
> Expand with `front`, contract with `back` while counting slices.

---

### Example 2 — Min Length Subarray Sum ≥ Target

**Problem:**  
Find the minimal length of a subarray whose sum is at least target.

**Solution:**

```javascript
function minSubArrayLen(target, nums) {
    let left = 0, sum = 0, minLen = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen === Infinity ? 0 : minLen;
}
```
> Grow `right` to include enough sum, shrink `left` to minimize window.

---

### Example 3 — Max Number of Fruits (Two Types)

**Problem:**  
Find the longest subarray with at most 2 types of fruits.

**Solution:**

```javascript
function totalFruit(fruits) {
    const basket = new Map();
    let left = 0, maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);

        while (basket.size > 2) {
            basket.set(fruits[left], basket.get(fruits[left]) - 1);
            if (basket.get(fruits[left]) === 0) basket.delete(fruits[left]);
            left++;
        }

        maxFruits = Math.max(maxFruits, right - left + 1);
    }
    return maxFruits;
}
```
> Classic sliding window with a constraint on types.

---

### Example 4 — Longest Substring Without Repeating Characters

**Problem:**  
Find the length of the longest substring without repeating characters.

**Solution:**

```javascript
function lengthOfLongestSubstring(s) {
    const set = new Set();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
```
> Expand with `right`, shrink with `left` when duplicates occur.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Caterpillar Method (Two Pointers) | Dynamic window growing/shrinking |
| Expand and shrink | Maintain constraints dynamically |
| Time Complexity | O(N) for most sliding window problems |
| Applications | Subarrays, substrings, counting problems |