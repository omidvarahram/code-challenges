# ValueOccurrences

**Easy**  
**40 min**

Given a sorted array, calculate how many insertion and removal operations are required to make every value X in the array occur exactly X times.

---

## Task description

There is an array A of N integers sorted in non-decreasing order.  
In one move, you can either remove an integer from A or insert an integer before or after any element of A.  
The goal is to achieve an array in which all values X that are present in the array occur exactly X times.

For example, given A = [1, 1, 3, 4, 4, 4, 4],  
- value 1 occurs twice,  
- value 3 occurs once,  
- value 4 occurs three times.

You can remove one occurrence each of both 1 and 3, and insert one occurrence of 4, resulting in the array [1, 4, 4, 4, 4].  
In this array, every element X occurs exactly X times.

**What is the minimum number of moves after which every value X in the array occurs exactly X times?**

Write a function:

``` ts
function solution(A);
```

that, given an array A, returns the **minimum number of moves** after which every value X in the array occurs exactly X times.  
Note that it is permissible to remove some values entirely, if appropriate.

---

### Examples:

1. Given A = [1, 1, 3, 4, 4, 4, 4], your function should return **3**.

2. Given A = [1, 2, 2, 2, 5, 5, 8], your function should return **4**.  
   You can delete the 8 and one occurrence of 2, and insert 5 twice, resulting in [1, 2, 5, 5, 5, 5, 5].  
   Notice that after the removals, there is no occurrence of 8 in the array anymore.

3. Given A = [1, 1, 1, 1, 3, 3, 4, 4, 4, 4, 4], your function should return **5**.

4. Given A = [10, 10, 10], your function should return **3**.  
   You can remove all elements, resulting in an empty array.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [1..100,000,000];
- elements of array A are sorted in non-decreasing order.


# Task 16

## ValueOccurrences

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You're given a **sorted array `A`**.  
You want every number `X` **in the array** to appear **exactly `X` times**.

For each number:
- If it occurs **less than X** → you must **insert** copies
- If it occurs **more than X** → you must **remove** copies
- If it occurs **exactly X** times → no operation needed
- If it occurs **and is impossible to satisfy (e.g., too far off)** → **delete all** instances

---

### Step 2: Strategy

1. **Count occurrences** of each unique number.
2. For each unique number `x` with count `cnt`:
   - If `cnt === x` → 0 moves
   - If `cnt > x` → remove `cnt - x`
   - If `cnt < x` → insert `x - cnt`
3. Sum all moves.

---

### Step 3: Edge Case

If `x` occurs, but `x > 100_000` (not feasible to insert that many), the problem doesn't restrict us — assume it's valid up to the size limit.  
You can **remove all** if `cnt < x` and insertion is worse than deletion.

But here we **always assume we fix `x` by matching the count to `x`**, unless we prefer to remove all if `cnt < x`.

---

### Step 4: TypeScript Code

```ts
function solution(A: number[]): number {
  const freq = new Map<number, number>();

  // Count occurrences
  for (const num of A) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  let moves = 0;

  for (const [value, count] of freq.entries()) {
    if (count === value) {
      continue;
    } else if (count > value) {
      moves += count - value;
    } else {
      moves += value - count;
    }
  }

  return moves;
}
```

---

### Step 5: Example

**Input:**  
A = [1, 1, 3, 4, 4, 4, 4]

- 1 → appears 2 times, needs 1 → remove 1  
- 3 → appears 1 time, needs 3 → insert 2  
- 4 → appears 4 times, needs 4 → ok  
→ Total moves: 1 (remove) + 2 (insert) = **3**

---

### Step 6: Time & Space Complexity

- **Time:** O(N) — one pass to count, one pass to compute moves
- **Space:** O(U) where U = number of unique elements (≤ N)

Efficient for up to 100,000 elements.
