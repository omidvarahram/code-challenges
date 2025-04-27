# 17. Hash Tables and Sets

## How the Approach Works

**Hash tables** (also known as hash maps or dictionaries) store key-value pairs for **constant-time lookup**, **insertion**, and **deletion** on average.

**Sets** store unique elements with **fast membership checks**.

Key characteristics:
- **Hash table:** Maps keys to values (e.g., `{key: value}`)
- **Set:** Stores only unique values (e.g., `{value}`)

Time complexity for operations (average case):
- Insert: **O(1)**
- Search: **O(1)**
- Delete: **O(1)**

## What Kind of Questions Use Hash Tables and Sets

- Counting occurrences of elements
- Detecting duplicates
- Storing and looking up seen values quickly
- Grouping or classifying data
- Problems where fast access or existence checks are critical

## Real Examples and Solutions

### Example 1 — Two Sum

**Problem:**  
Given an array, return indices of two numbers that add up to a target.

**Solution:**

```javascript
function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}
```
> Store previously seen numbers in a hash map for quick lookup.

---

### Example 2 — Contains Duplicate

**Problem:**  
Check if the array contains any duplicates.

**Solution:**

```javascript
function containsDuplicate(nums) {
    const set = new Set();

    for (let num of nums) {
        if (set.has(num)) return true;
        set.add(num);
    }
    return false;
}
```
> Use a set to track seen numbers.

---

### Example 3 — Longest Consecutive Sequence

**Problem:**  
Find the length of the longest consecutive elements sequence.

**Solution:**

```javascript
function longestConsecutive(nums) {
    const set = new Set(nums);
    let maxLen = 0;

    for (let num of set) {
        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (set.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }
            maxLen = Math.max(maxLen, currentStreak);
        }
    }
    return maxLen;
}
```
> Only start building streaks from the beginning of a sequence.

---

### Example 4 — Group Anagrams

**Problem:**  
Group strings that are anagrams of each other.

**Solution:**

```javascript
function groupAnagrams(strs) {
    const map = new Map();

    for (let str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    return Array.from(map.values());
}
```
> Use sorted string as the hash map key.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Hash Table | Fast key-value storage and lookup |
| Set | Fast uniqueness checking |
| Time Complexity | O(1) for average insert/search/delete |
| Applications | Counting, grouping, duplicate detection, fast lookup |