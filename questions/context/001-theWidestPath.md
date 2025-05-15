# Task 1

## TheWidestPath

**Elementary**  
**30 min**

Given a forest containing N trees, find the width of the widest vertical path that can be built without cutting any tree.

---

## Task description

There are N trees (numbered from 0 to N−1) in a forest. The K-th tree is located at coordinates (X[K], Y[K]).

We want to build the widest possible vertical path, such that there is no tree on it. The path must be built somewhere between a leftmost and a rightmost tree, which means that the width of the path cannot be infinite.

**What is the width of the widest possible path that can be built?**

Write a function:

``` ts
function solution(X, Y);
```

that, given two arrays X and Y consisting of N integers each, denoting the positions of trees, returns the width of the widest possible path that can be built.

---

### Examples:

1. Given X = [1, 8, 7, 3, 4, 1, 8], Y = [6, 4, 1, 8, 5, 1, 7], the function should return 3.

2. Given X = [5, 5, 5, 7, 7, 7], Y = [3, 4, 5, 1, 3, 7], the function should return 2.

3. Given X = [6, 10, 1, 4, 3], Y = [2, 5, 3, 1, 6], the function should return 4.

4. Given X = [4, 1, 5, 4], Y = [4, 5, 1, 3], the function should return 3.

---

## Write an efficient algorithm for the following assumptions:

- N is an integer within the range [2..100,000];
- each element of arrays X and Y is an integer within the range [0..1,000,000,000];
- there are no two trees with the same coordinates;
- a path of width at least 1 can always be built.


# Task 1

## TheWidestPath

**Step-by-Step Explanation**

### Step 1: Understand the Problem
You're given coordinates of trees in a 2D forest. You want to build the widest vertical path **between** trees, such that:
- No tree is cut (i.e., the path cannot intersect any tree).
- The path must be located **between** the leftmost and rightmost trees.

Only the **X coordinates** matter for a **vertical** path. The widest space is the **largest gap between sorted unique X coordinates**.

---

### Step 2: Approach

1. Extract all unique X coordinates.
2. Sort them in ascending order.
3. Calculate the gap between each consecutive pair.
4. Return the **maximum gap**.

---

### Step 3: TypeScript Code

```ts
function solution(X: number[], Y: number[]): number {
  // Step 1: Remove duplicate Xs
  const uniqueX = Array.from(new Set(X));

  // Step 2: Sort the unique Xs
  uniqueX.sort((a, b) => a - b);

  // Step 3: Find max gap between consecutive Xs
  let maxGap = 0;
  for (let i = 1; i < uniqueX.length; i++) {
    const gap = uniqueX[i] - uniqueX[i - 1];
    if (gap > maxGap) {
      maxGap = gap;
    }
  }

  return maxGap;
}
```

---

### Step 4: Example Walkthrough

**Example Input:**
- X = [1, 8, 7, 3, 4, 1, 8]
- Unique sorted X: [1, 3, 4, 7, 8]
- Gaps: 2, 1, 3, 1 → Max = **3**

**Final Output:**  
`3`

---

### Step 5: Time & Space Complexity

- **Time:** O(N log N) for sorting
- **Space:** O(N) for storing unique X values

Efficient and suitable for up to 100,000 trees as required.


