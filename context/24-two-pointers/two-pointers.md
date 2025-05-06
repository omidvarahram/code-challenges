'''
# 27. Two Pointers

## How the Approach Works

**Two Pointers** is a technique where you use two indices to scan or manipulate data from both ends or at different speeds.

Common patterns:
- Start and end of an array (e.g., shrinking window).
- Fast/slow pointer for detecting conditions or collisions.
- Matching pairs, substrings, or removing duplicates.

Time complexity: Usually **O(N)** — both pointers move at most once across the array.

## What Kind of Questions Use Two Pointers

- Finding pairs with a target sum
- Removing duplicates
- Partitioning problems (e.g., segregate odds and evens)
- Validating palindromes or patterns in strings
- Merging sorted arrays

## Real Examples and Solutions

### Example 1 — Remove Duplicates from Sorted Array

**Problem:**  
Remove duplicates in-place from a sorted array.

**Solution:**

```javascript
function removeDuplicates(nums) {
    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[i] !== nums[j]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}
```
> Slow pointer marks place to overwrite; fast pointer scans.

---

### Example 2 — Two Sum (Sorted Array)

**Problem:**  
Return indices of two numbers that add up to a target (sorted array).

**Solution:**

```javascript
function twoSum(numbers, target) {
    let left = 0, right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1];
        else if (sum < target) left++;
        else right--;
    }
}
```
> Shrink window based on comparison.

---

### Example 3 — Valid Palindrome

**Problem:**  
Check if a string is a palindrome ignoring non-alphanumeric chars.

**Solution:**

```javascript
function isPalindrome(s) {
    s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    let left = 0, right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}
```
> Pointers from both ends moving inward.

---

### Example 4 — Container With Most Water

**Problem:**  
Find two lines that hold the most water.

**Solution:**

```javascript
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let max = 0;

    while (left < right) {
        const h = Math.min(height[left], height[right]);
        max = Math.max(max, h * (right - left));
        height[left] < height[right] ? left++ : right--;
    }
    return max;
}
```
> Strategy: greedily move the shorter pointer inward.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Two pointers | Efficient linear traversal from ends or middle |
| Common tasks | Pair sums, duplicates, palindromes, merge patterns |
| Time complexity | O(N) in most cases |
'''
