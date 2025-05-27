# SquareTiles

**Medium**  
50 min  
Given M tiles of size 1×1 and N tiles of size 2×2, calculate the size of the largest square you can create out of these tiles.

---

## Task description

You have M square tiles of size 1×1 and N square tiles of size 2×2. Your task is to create the largest possible square using these tiles. Tiles may not overlap, and the resulting square should be filled (it should not contain empty spaces).

Write a function:

    function solution(M, N);

that, given two integers M and N, returns the length of the side of the largest square you can create. If no square can be created, your function should return 0.

---

### Examples:

1. Given M = 8 and N = 0, your function should return 2. You can use four out of eight tiles to arrange them into 2×2 square. There are not enough tiles to create 3×3 square.

2. Given M = 4 and N = 3, your function should return 4. You can obtain a 4×4 square by arranging four 1×1 tiles into a 2×2 square, and surrounding it by 2×2 tiles:

    [Diagram]

3. Given M = 0 and N = 18, your function should return 8. You need to use sixteen 2×2 tiles to create the square. Note that not all the tiles are used.

4. Given M = 13 and N = 3, your function should return 5. One of the possible arrangements is shown in the following image:

    [Diagram]

---

Write an efficient algorithm for the following assumptions:

- M and N are integers within the range [0..1,000,000,000].

## SquareTiles

**Step-by-Step Explanation**

### 1. Problem Restatement

We have:

* `M` tiles of size 1×1
* `N` tiles of size 2×2

We want to assemble a perfectly filled square of side `S` (integer), using these tiles without overlap and without leaving any empty cell.  We can discard unused tiles.  Return the maximum possible `S`, or 0 if none.

---

### 2. Key Observation

A 2×2 tile covers area 4, a 1×1 tile covers area 1.  To fill an S×S square we need total area `S²`.  Since 2×2 tiles are strictly more “area-efficient,” we should use as many of them as possible—up to filling all possible 2×2 sub-squares in the big square.

* In an S×S grid we can place at most `K = ⌊S/2⌋` tiles along each dimension → `K×K` positions for 2×2 tiles.
* Let `use2 = min(N, K*K)`.  They cover area `4·use2`.
* The remaining area to cover with 1×1 tiles is

  ```
    need1 = S*S − 4·use2.
  ```
* We check feasibility by `M ≥ need1`.

---

### 3. Searching for the Maximum `S`

* **Monotonicity:**  if an `S` is feasible, any smaller `S′ < S` is also feasible (because you need ≤ area).
* We can **binary-search** on `S` in the range `[0..maxSide]`, where

  ```
  maxSide = floor( sqrt(M + 4·N) )
  ```

  (since at best all tiles’ area `M+4N` goes into the square).

Algorithm:

1. Compute `maxSide = floor(sqrt(M + 4·N))`.
2. Initialize `lo = 0`, `hi = maxSide`.
3. While `lo < hi`:

   * Let `mid = floor((lo + hi + 1)/2)`.
   * Compute

     ```
       K = floor(mid/2),
       use2 = min(N, K*K),
       need1 = mid*mid − 4*use2.
     ```
   * If `need1 ≤ M`, `mid` is feasible → `lo = mid`.
   * Else `hi = mid − 1`.
4. Return `lo`.

This runs in `O(log(maxSide))` time, which is tiny since `maxSide ≲ 10^5`.

---

```ts
function solution(M: number, N: number): number {
  // Upper bound for side length
  const maxSide = Math.floor(Math.sqrt(M + 4 * N));

  let lo = 0, hi = maxSide;
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    const K = Math.floor(mid / 2);
    const use2 = Math.min(N, K * K);
    const need1 = mid * mid - 4 * use2;

    if (need1 <= M) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }

  return lo;
}
```

**Explanation of Key Steps**

* **maxSide**: You cannot build a square larger than what the total tile area allows.
* **Binary search**: We test mid, using as many 2×2 tiles as possible (up to `K²`) and check if the remaining cells fit into the available 1×1 tiles.
* The feasibility check `need1 ≤ M` is monotonic in `mid`, so binary search applies.

This runs in **O(log (maxSide))** time and **O(1)** extra space, easily handling `M,N` up to 10⁹.
