# 7. Leader Finding

## How the Approach Works

A **leader** of an array is a value that occurs in **more than half** of the elements.

In Codility problems, finding the leader is often necessary to:
- Solve dominance-related problems
- Split arrays based on majority elements
- Optimize voting systems

Key approach:
- **Boyer–Moore majority vote algorithm** can find a candidate leader in **O(N)** time.
- After finding a candidate, we **confirm** whether it’s truly a leader by counting its occurrences.

## What Kind of Questions Use Leader Finding

- Dominator of an array (the most frequent element)
- Equi leaders (indexes where leaders match in left and right parts)
- Problems asking for majority or heavy hitters
- Validating frequency constraints in partitions

## Real Examples and Solutions

### Example 1 — Dominator

**Problem:**  
Find the index of any element that is a dominator of array A.

**Solution (Boyer–Moore method):**

```javascript
function solution(A) {
    let size = 0;
    let value;

    for (let i = 0; i < A.length; i++) {
        if (size === 0) {
            size++;
            value = A[i];
        } else {
            size += (value === A[i]) ? 1 : -1;
        }
    }

    let candidate = -1;
    if (size > 0) candidate = value;

    let count = 0;
    let index = -1;
    for (let i = 0; i < A.length; i++) {
        if (A[i] === candidate) {
            count++;
            index = i;
        }
    }

    return count > A.length / 2 ? index : -1;
}
```
> Find candidate first, then validate.

---

### Example 2 — EquiLeader

**Problem:**  
Count the number of equi leaders — split points where leader is the same on both sides.

**Solution:**

```javascript
function solution(A) {
    let size = 0;
    let value;

    for (let i = 0; i < A.length; i++) {
        if (size === 0) {
            size++;
            value = A[i];
        } else {
            size += (value === A[i]) ? 1 : -1;
        }
    }

    let candidate = -1;
    if (size > 0) candidate = value;

    let leaderCount = 0;
    for (let v of A) {
        if (v === candidate) leaderCount++;
    }

    if (leaderCount <= A.length / 2) return 0;

    let equiLeaders = 0;
    let leftCount = 0;

    for (let i = 0; i < A.length; i++) {
        if (A[i] === candidate) leftCount++;
        if (leftCount > (i + 1) / 2 && (leaderCount - leftCount) > (A.length - i - 1) / 2) {
            equiLeaders++;
        }
    }
    return equiLeaders;
}
```
> After finding a global leader, check prefix and suffix parts.

---

### Example 3 — Find Majority Element in Array (Custom)

**Problem:**  
Find the majority element in an array if it exists (appears > N/2 times).

**Solution:**

```javascript
function majorityElement(nums) {
    let count = 0;
    let candidate = null;

    for (let num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    count = 0;
    for (let num of nums) {
        if (num === candidate) count++;
    }

    return count > nums.length / 2 ? candidate : null;
}
```
> Standard majority vote validation.

---

### Example 4 — Split Array into Equal Leader Parts (Custom)

**Problem:**  
Split array into two parts where each part has the same leader.

**Solution:**

```javascript
function solution(A) {
    const n = A.length;
    let size = 0;
    let value;

    for (let i = 0; i < n; i++) {
        if (size === 0) {
            size++;
            value = A[i];
        } else {
            size += (A[i] === value) ? 1 : -1;
        }
    }

    let candidate = -1;
    if (size > 0) candidate = value;

    let totalCount = A.filter(x => x === candidate).length;
    if (totalCount <= n / 2) return 0;

    let leftCount = 0;
    let result = 0;

    for (let i = 0; i < n; i++) {
        if (A[i] === candidate) leftCount++;
        if (leftCount > (i + 1) / 2 && (totalCount - leftCount) > (n - i - 1) / 2) {
            result++;
        }
    }
    return result;
}
```
> Same logic as EquiLeader but generalized for custom splits.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Leader | Element appearing in >50% of array |
| Boyer–Moore algorithm | O(N) find leader candidate |
| Validate | Always count occurrences after finding candidate |
| Application | Dominator problems, equi leaders, heavy hitters |