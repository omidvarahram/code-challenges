# 19. Sliding Window

## How the Approach Works

The **Sliding Window** technique is used to reduce nested loops into a single loop, by maintaining a moving range (window) over the data.

Key idea:
- Maintain a **subarray, substring, or subsegment** that satisfies certain conditions.
- Expand the window (move the right pointer).
- Shrink the window (move the left pointer) to maintain the condition or optimize.

Two types:
- **Fixed-size window:** Window has a constant width (e.g., always 3 elements).
- **Variable-size window:** Window grows or shrinks based on conditions.

Time complexity: **O(N)** for most problems.

## What Kind of Questions Use Sliding Window

- Finding maximum/minimum sum subarrays
- Substrings without repeating characters
- Smallest/largest subarray meeting a condition
- Problems involving contiguous blocks of elements

## Real Examples and Solutions

### Example 1 — Maximum Sum Subarray of Size K

**Problem:**  
Find the maximum sum of a subarray of size K.

**Solution:**

```javascript
function maxSumSubarray(arr, k) {
    let windowSum = 0;
    let maxSum = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];
        }
    }
    return maxSum;
}
```
> Add new element, remove old element to slide window.

---

### Example 2 — Longest Substring Without Repeating Characters

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
> Expand right, contract left when a repeat occurs.

---

### Example 3 — Minimum Size Subarray Sum

**Problem:**  
Find the minimal length of a contiguous subarray with sum ≥ target.

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
> Shrink window as much as possible while keeping sum ≥ target.

---

### Example 4 — Maximum Number of Vowels in Substring of Size K

**Problem:**  
Find the maximum number of vowels in any substring of size K.

**Solution:**

```javascript
function maxVowels(s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let count = 0, maxCount = 0;

    for (let i = 0; i < s.length; i++) {
        if (vowels.has(s[i])) count++;
        if (i >= k) {
            if (vowels.has(s[i - k])) count--;
        }
        maxCount = Math.max(maxCount, count);
    }
    return maxCount;
}
```
> Window size is fixed at k.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Sliding window | Efficient subarray/subsegment problems |
| Fixed window size | Max/min sum or counts over fixed intervals |
| Variable window size | Expand/shrink based on dynamic conditions |
| Time Complexity | O(N) for most sliding window problems |
