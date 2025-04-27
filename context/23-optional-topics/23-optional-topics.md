# 23. Segment Trees

## How the Approach Works

**Segment Trees** are advanced data structures used to perform:
- **Range queries** (sum, min, max, gcd, etc.)
- **Point updates** efficiently.

Key idea:
- Build a binary tree where each node represents a range.
- Leaf nodes represent individual elements.
- Internal nodes represent merging of their child nodes.

Time complexity:
- Build: **O(N)**
- Query: **O(log N)**
- Update: **O(log N)**

Segment Trees can handle dynamic updates faster than prefix sums.

## What Kind of Questions Use Segment Trees

- Range sum queries with updates
- Range minimum/maximum queries
- Lazy propagation (for range updates)
- Interval problems where array changes over time

## Real Examples and Solutions

### Example 1 — Range Sum Query

**Problem:**  
Support sum queries over a range and updating an element.

**Solution:**

```javascript
class SegmentTree {
    constructor(nums) {
        this.n = nums.length;
        this.tree = new Array(2 * this.n).fill(0);
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = nums[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
        }
    }

    update(index, value) {
        index += this.n;
        this.tree[index] = value;
        while (index > 1) {
            index = Math.floor(index / 2);
            this.tree[index] = this.tree[index * 2] + this.tree[index * 2 + 1];
        }
    }

    query(left, right) {
        left += this.n;
        right += this.n;
        let sum = 0;
        while (left <= right) {
            if (left % 2 === 1) sum += this.tree[left++];
            if (right % 2 === 0) sum += this.tree[right--];
            left = Math.floor(left / 2);
            right = Math.floor(right / 2);
        }
        return sum;
    }
}
```
> Tree is built bottom-up, querying uses two pointers moving toward each other.

---

### Example 2 — Range Minimum Query

**Problem:**  
Find the minimum element in a given range.

**Solution:**

```javascript
class MinSegmentTree {
    constructor(nums) {
        this.n = nums.length;
        this.tree = new Array(2 * this.n).fill(Infinity);
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = nums[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = Math.min(this.tree[i * 2], this.tree[i * 2 + 1]);
        }
    }

    query(left, right) {
        left += this.n;
        right += this.n;
        let minVal = Infinity;
        while (left <= right) {
            if (left % 2 === 1) minVal = Math.min(minVal, this.tree[left++]);
            if (right % 2 === 0) minVal = Math.min(minVal, this.tree[right--]);
            left = Math.floor(left / 2);
            right = Math.floor(right / 2);
        }
        return minVal;
    }
}
```
> Exactly the same structure but different merge operation (min instead of sum).

---

### Example 3 — Range Sum Query with Point Updates

**Problem:**  
Support updating an element and querying sum of any range.

**Solution:**

(Same as Example 1)

---

### Example 4 — Build Segment Tree for Maximum in Range

**Problem:**  
Support queries for maximum value in a range.

**Solution:**

```javascript
class MaxSegmentTree {
    constructor(nums) {
        this.n = nums.length;
        this.tree = new Array(2 * this.n).fill(-Infinity);
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = nums[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = Math.max(this.tree[i * 2], this.tree[i * 2 + 1]);
        }
    }

    query(left, right) {
        left += this.n;
        right += this.n;
        let maxVal = -Infinity;
        while (left <= right) {
            if (left % 2 === 1) maxVal = Math.max(maxVal, this.tree[left++]);
            if (right % 2 === 0) maxVal = Math.max(maxVal, this.tree[right--]);
            left = Math.floor(left / 2);
            right = Math.floor(right / 2);
        }
        return maxVal;
    }
}
```
> Simple change of operation to `Math.max`.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Segment Tree | Divide and conquer for range queries |
| Time Complexity | O(N) build, O(log N) query/update |
| Operations | Sum, Min, Max, GCD, XOR, etc. |
| Applications | Dynamic range queries, online updates |



# 24. Range Minimum Query (RMQ with Sparse Table)

## How the Approach Works

**Sparse Table** is a data structure used to answer range minimum (or maximum) queries in **O(1)** time after **O(N log N)** preprocessing.

Key idea:
- Precompute minimum (or maximum) values for intervals of length 2^k.
- To answer a query for range [L, R], combine two overlapping intervals covering the range.

Works best when:
- The array **does not change** (static array).
- Only **queries** are performed, no updates.

Time complexity:
- Preprocessing: **O(N log N)**
- Query: **O(1)**

## What Kind of Questions Use RMQ Sparse Table

- Static array range queries
- Finding min/max in a segment fast
- GCD queries, OR, AND over ranges
- Problems requiring fast multiple queries without updates

## Real Examples and Solutions

### Example 1 — Build Sparse Table for Minimum Query

**Problem:**  
Build a Sparse Table for finding minimum of any range.

**Solution:**

```javascript
class SparseTable {
    constructor(arr) {
        this.n = arr.length;
        this.k = Math.floor(Math.log2(this.n)) + 1;
        this.st = Array.from({ length: this.n }, () => new Array(this.k).fill(Infinity));

        for (let i = 0; i < this.n; i++) {
            this.st[i][0] = arr[i];
        }

        for (let j = 1; (1 << j) <= this.n; j++) {
            for (let i = 0; i + (1 << j) <= this.n; i++) {
                this.st[i][j] = Math.min(this.st[i][j - 1], this.st[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    query(l, r) {
        const j = Math.floor(Math.log2(r - l + 1));
        return Math.min(this.st[l][j], this.st[r - (1 << j) + 1][j]);
    }
}
```
> Precompute minimums for ranges of size 2^k.

---

### Example 2 — Range Maximum Query (Same Idea)

**Problem:**  
Find the maximum in a range using Sparse Table.

**Solution:**

```javascript
class SparseTableMax {
    constructor(arr) {
        this.n = arr.length;
        this.k = Math.floor(Math.log2(this.n)) + 1;
        this.st = Array.from({ length: this.n }, () => new Array(this.k).fill(-Infinity));

        for (let i = 0; i < this.n; i++) {
            this.st[i][0] = arr[i];
        }

        for (let j = 1; (1 << j) <= this.n; j++) {
            for (let i = 0; i + (1 << j) <= this.n; i++) {
                this.st[i][j] = Math.max(this.st[i][j - 1], this.st[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    query(l, r) {
        const j = Math.floor(Math.log2(r - l + 1));
        return Math.max(this.st[l][j], this.st[r - (1 << j) + 1][j]);
    }
}
```
> Change `Math.min` to `Math.max`.

---

### Example 3 — GCD Query over Range

**Problem:**  
Precompute GCD over any segment fast.

**Solution:**

```javascript
class GcdSparseTable {
    constructor(arr) {
        this.n = arr.length;
        this.k = Math.floor(Math.log2(this.n)) + 1;
        this.st = Array.from({ length: this.n }, () => new Array(this.k).fill(0));

        for (let i = 0; i < this.n; i++) {
            this.st[i][0] = arr[i];
        }

        function gcd(a, b) {
            if (b === 0) return a;
            return gcd(b, a % b);
        }

        for (let j = 1; (1 << j) <= this.n; j++) {
            for (let i = 0; i + (1 << j) <= this.n; i++) {
                this.st[i][j] = gcd(this.st[i][j - 1], this.st[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    query(l, r) {
        const j = Math.floor(Math.log2(r - l + 1));
        return this.gcd(this.st[l][j], this.st[r - (1 << j) + 1][j]);
    }

    gcd(a, b) {
        if (b === 0) return a;
        return this.gcd(b, a % b);
    }
}
```
> Same precomputation logic, different merging function.

---

### Example 4 — Fast Range Minimum for Static Array

**Problem:**  
Support multiple fast minimum queries after preprocessing.

**Solution:**

(Same as Example 1)

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Sparse Table | Precompute answers for powers of two ranges |
| Time Complexity | O(N log N) build, O(1) query |
| Applications | RMQ (min/max), GCD queries, static array queries |
| Note | No dynamic updates allowed |



# 25. Monotonic Stack and Monotonic Queue

## How the Approach Works

**Monotonic Stack** and **Monotonic Queue** maintain elements in strictly increasing or decreasing order.

Key ideas:
- **Monotonic Stack**: 
  - Stack maintains increasing or decreasing values.
  - Useful for "next greater element" or "largest/smallest" problems.
- **Monotonic Queue**:
  - Queue maintains increasing or decreasing window for sliding window problems.
  - Used to find min/max over a moving window efficiently.

Time complexity: **O(N)** — each element is pushed and popped at most once.

## What Kind of Questions Use Monotonic Stack and Queue

- Next Greater Element problems
- Sliding window maximum/minimum
- Histogram area problems
- Range queries where current element depends on previous ones
- Maintaining optimal values dynamically in sequences

## Real Examples and Solutions

### Example 1 — Next Greater Element

**Problem:**  
Find the next greater element for each element in an array.

**Solution (Monotonic decreasing stack):**

```javascript
function nextGreaterElements(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];

    for (let i = 0; i < 2 * n; i++) {
        const num = nums[i % n];
        while (stack.length && nums[stack[stack.length - 1]] < num) {
            result[stack.pop()] = num;
        }
        if (i < n) stack.push(i);
    }
    return result;
}
```
> Stack stores indices, looking for the next greater to the right.

---

### Example 2 — Largest Rectangle in Histogram

**Problem:**  
Find area of largest rectangle in histogram.

**Solution (Monotonic increasing stack):**

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    heights.push(0); // sentinel
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}
```
> Maintain increasing stack to determine widths efficiently.

---

### Example 3 — Sliding Window Maximum

**Problem:**  
Find the maximum in every window of size k.

**Solution (Monotonic decreasing queue):**

```javascript
function maxSlidingWindow(nums, k) {
    const deque = [];
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);

        if (deque[0] === i - k) {
            deque.shift();
        }

        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}
```
> The deque always maintains the current window's max at the front.

---

### Example 4 — Sliding Window Minimum

**Problem:**  
Find the minimum in every window of size k.

**Solution (Monotonic increasing queue):**

```javascript
function minSlidingWindow(nums, k) {
    const deque = [];
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        while (deque.length && nums[deque[deque.length - 1]] > nums[i]) {
            deque.pop();
        }
        deque.push(i);

        if (deque[0] === i - k) {
            deque.shift();
        }

        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}
```
> The deque always maintains the current window's min at the front.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Monotonic Stack | Next greater/smaller element, histogram problems |
| Monotonic Queue | Sliding window maximum/minimum |
| Time Complexity | O(N) for full traversal |
| Applications | Dynamic sequence optimization, efficient range tracking |



# 26. Greedy + Binary Search Hybrid

## How the Approach Works

Some problems require **both Greedy logic and Binary Search** together:
- **Binary search** is used to guess an answer (over a range).
- **Greedy checking** is used to verify if that guessed answer is feasible.

Key idea:
- For a candidate solution `mid`, check feasibility **greedily**.
- If feasible, binary search narrows toward better (smaller/larger) answers.

Time complexity:
- Binary search: **O(log(range))**
- Each greedy check: **O(N)**  
Total: **O(N log(range))**

## What Kind of Questions Use Greedy + Binary Search Hybrid

- Partitioning problems (split into minimum largest sum)
- Allocating resources optimally
- Scheduling tasks with minimum/maximum limits
- Finding optimal thresholds while satisfying greedy constraints

## Real Examples and Solutions

### Example 1 — Split Array Largest Sum

**Problem:**  
Split an array into m subarrays to minimize the largest sum among them.

**Solution:**

```javascript
function splitArray(nums, m) {
    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);

    function canSplit(maxSum) {
        let parts = 1;
        let currentSum = 0;

        for (let num of nums) {
            if (currentSum + num > maxSum) {
                parts++;
                currentSum = 0;
            }
            currentSum += num;
        }
        return parts <= m;
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
> Binary search over maximum sum, greedy check by partitioning.

---

### Example 2 — Minimum Number of Days to Make Bouquets

**Problem:**  
Given bloom days of flowers, find minimum days needed to make m bouquets with k flowers each.

**Solution:**

```javascript
function minDays(bloomDay, m, k) {
    if (bloomDay.length < m * k) return -1;
    let left = Math.min(...bloomDay);
    let right = Math.max(...bloomDay);

    function canMake(mid) {
        let bouquets = 0, flowers = 0;
        for (let day of bloomDay) {
            if (day <= mid) {
                flowers++;
                if (flowers === k) {
                    bouquets++;
                    flowers = 0;
                }
            } else {
                flowers = 0;
            }
        }
        return bouquets >= m;
    }

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canMake(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```
> Greedy count bouquets for a given day threshold.

---

### Example 3 — Aggressive Cows Problem

**Problem:**  
Place cows in stalls to maximize the minimum distance between cows.

**Solution:**

```javascript
function aggressiveCows(positions, cows) {
    positions.sort((a, b) => a - b);

    let left = 0, right = positions[positions.length - 1] - positions[0];

    function canPlace(dist) {
        let count = 1, last = positions[0];
        for (let i = 1; i < positions.length; i++) {
            if (positions[i] - last >= dist) {
                count++;
                last = positions[i];
            }
        }
        return count >= cows;
    }

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canPlace(mid)) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right;
}
```
> Binary search distance, greedy placement of cows.

---

### Example 4 — Koko Eating Bananas

**Problem:**  
Find minimum eating speed Koko needs to finish bananas within H hours.

**Solution:**

```javascript
function minEatingSpeed(piles, H) {
    let left = 1, right = Math.max(...piles);

    function canEat(speed) {
        let hours = 0;
        for (let pile of piles) {
            hours += Math.ceil(pile / speed);
        }
        return hours <= H;
    }

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canEat(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```
> Binary search on eating speed, greedy check by time spent.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Greedy check | Quickly validate a candidate answer |
| Binary search | Search on numeric answer range |
| Time Complexity | O(N log(range)) |
| Applications | Partitioning, resource allocation, scheduling |



