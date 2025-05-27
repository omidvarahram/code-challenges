# Sticks

**Medium**  
**10 min**  
Given two sticks, cut them into four sticks in order to create the largest possible square.

---

## Task description

There are two wooden sticks of lengths **A** and **B** respectively.  
Each of them can be cut into shorter sticks of integer lengths.  
Our goal is to construct the largest possible square.  
In order to do this, we want to cut the sticks in such a way as to achieve four sticks of the same length  
(note that there can be some leftover pieces).  

**What is the longest side of square that we can achieve?**

---

## Write a function:

```ts
function solution(A, B);
```

that, given two integers **A**, **B**, returns the side length of the **largest square** that we can obtain.  
If it is not possible to create any square, the function should return `0`.

---

## Examples:

1. Given `A = 10`, `B = 21`, the function should return `7`.  
   We can split the second stick into three sticks of length 7 and shorten the first stick by 3.

2. Given `A = 13`, `B = 11`, the function should return `5`.  
   We can cut two sticks of length 5 from each of the given sticks.

3. Given `A = 2`, `B = 1`, the function should return `0`.  
   It is not possible to make any square from the given sticks.

4. Given `A = 1`, `B = 8`, the function should return `2`.  
   We can cut stick B into four parts.

---

## Write an efficient algorithm for the following assumptions:

- `A` and `B` are integers within the range [1..1,000,000,000].

## Sticks

**Step-by-Step Explanation**

### 1. Problem Restatement

You have two sticks of integer lengths `A` and `B`. You want to cut them into (possibly many) pieces so that you end up with **at least four** pieces of **equal** integer length `L`, from which you can form the four sides of a square. You may discard leftover bits. Find the **maximum** possible `L`. If you cannot get four pieces of any positive length, return `0`.

### 2. Key Insight

* From stick of length `A`, you can obtain `⌊A / L⌋` pieces of length `L`.
* From stick of length `B`, you can obtain `⌊B / L⌋` pieces of length `L`.
* You need at least `4` total pieces:

  $$
    \lfloor A/L \rfloor \;+\;\lfloor B/L\rfloor \;\ge\; 4.
  $$
* We want the **largest** integer `L` satisfying that.

### 3. Algorithm (Binary Search)

1. **Bounds**: `L` lies in `[1..max(A,B)]`.
2. We binary‐search `L`:

   * Let `mid = ⌊(low + high + 1)/2⌋`.
   * Compute `cnt = ⌊A/mid⌋ + ⌊B/mid⌋`.
   * If `cnt ≥ 4`, `mid` is feasible → move `low = mid`.
   * Else `mid` is too large → move `high = mid − 1`.
3. Continue until `low == high`. That `low` is the maximum feasible length; if `low` ends at `0` or produces fewer than 4 pieces, return `0`.

This runs in `O(log(max(A,B)))` time.

---

## TypeScript Code

```ts
function solution(A: number, B: number): number {
  let low = 0;
  let high = Math.max(A, B);

  while (low < high) {
    // pick upper mid so loop terminates
    const mid = Math.floor((low + high + 1) / 2);
    const cnt = Math.floor(A / mid) + Math.floor(B / mid);
    if (cnt >= 4) {
      // we can make 4 pieces of size mid
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return low;
}
```

* **Time Complexity:** O(log (max(A,B)))
* **Space Complexity:** O(1)
