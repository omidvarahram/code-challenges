MinDistinct  
Medium  
50 min  
Given an array of N numbers within the range [1..N], find the minimum number of increments and decrements of a single element required to make the array a permutation.

Task description

You are given an array A consisting of N integers within the range [1..N]. In one move, you can increase or decrease the value of any element by 1. After each move, all numbers should remain within the range [1..N].

Your task is to find the smallest required number of moves to make all elements in the array pairwise distinct (in other words, no value can appear in the array more than once).

Write a function:

```function solution(A);```

that, given an array A consisting of N integers, returns the smallest number of moves required to make all elements in the array pairwise distinct. If the result is greater than 1,000,000,000, the function should return −1.

Examples:

1. Given A = [1, 2, 1], the function should return 2, because you can increase A[2] twice: [1, 2, 1] → [1, 2, 2] → [1, 2, 3]. In this example, you could also change the array to the following values in two moves: [3, 2, 1], [1, 3, 2], [2, 3, 1].

2. Given A = [1, 2, 1, 4], the function should return 1, as it is sufficient to decrease A[2] or A[3] by 1, resulting in [2, 1, 3, 4] or [2, 1, 4, 3].

3. Given A = [6, 2, 3, 5, 6, 3], the function should return 4, because you can achieve the following array in four moves: [6, 2, 1, 5, 4, 3].

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..200,000];
- each element of array A is an integer within the range [1..N].


## MinDistinct

**Step-by-Step Explanation**

### 1. Problem Restatement

We have an array `A` of length `N`, values in `[1..N]`. In one move you can increment or decrement any element by 1 (staying within `[1..N]`). We want all values to become **pairwise distinct** (i.e. form a permutation of `1..N`) with the **minimum** total moves. If the required moves exceed 10⁹, return `-1`.

### 2. Key Insight

* Once completed, the array must be a permutation of `1..N`.
* Equivalently, every value missing from `A` must be created by moving a duplicate value to that missing slot.
* The cost to change a number `v` into a target `t` is `|v − t|`, since each ±1 counts as one move.
* Therefore, collect:

  1. **Surplus list** `S`: each value `v` with frequency `freq[v] > 1` contributes `freq[v]−1` copies of `v`.
  2. **Missing list** `M`: all integers `t` in `1..N` with `freq[t] == 0`.
* Both lists have equal length `K = N − (number of distinct values)`.
* Sort `S` ascending and `M` ascending, then match them one-to-one: the minimal total cost is

  $$
    \sum_{i=0}^{K-1} \bigl|\,S[i] - M[i]\bigr|.
  $$

### 3. Algorithm Outline

1. Build a frequency array/map `freq[1..N]`.
2. Populate `S` with duplicates, and `M` with missing numbers.
3. Sort `S` and `M`.
4. If `S.length != M.length`, something is wrong (but by construction they match).
5. Compute `moves = Σ |S[i] − M[i]|`.
6. If `moves > 1e9`, return `-1`; otherwise return `moves`.

This runs in **O(N log N)** time and **O(N)** space.

### 4. Examples

* **A = \[1, 2, 1]**

  * `freq = {1:2, 2:1, 3:0}`, `N=3`
  * `S = [1]` (one extra `1`), `M = [3]` (missing `3`)
  * Cost = `|1−3| = 2`

* **A = \[1, 2, 1, 4]**

  * `freq = {1:2,2:1,3:0,4:1}`
  * `S = [1]`, `M = [3]`
  * Cost = `|1−3| = 2`
  * But we could also decrement the extra `1` down to `0`? No, lower bound is 1. Alternatively change a `4` to `3` costs `1`, which matches our algorithm if we had taken `4` as the duplicate instead of `1`. Our greedy picks smallest duplicate matched to smallest missing → cost `|1−3|=2`. However decrementing `4` to `3` gives cost `1`, which is better.
    **Adjustment**: we must choose **any** duplicates, not necessarily the smallest dup values. To minimize cost, we should take the **sorted list of all duplicates** (which includes the duplicate from `4`? No, `4` only occurs once.) Actually in this example, only duplicate is `1`. But we could choose to change the unique `4` instead of the duplicate `1`. That’s allowed: you can move any tree, not only duplicates.
    So better approach: we need to end with a permutation, and we can adjust any elements, not only duplicates.
    **Correct Approach**: sort `A` ascending into `B`. The target permutation is `[1,2,3,4]`. The minimal cost to convert each `B[i]` to `i+1` is `Σ|B[i]−(i+1)|`.
    This assigns each sorted element to each position in the permutation.

* **Revised Insight**

  1. Sort `A` to `B`.
  2. The only valid final permutations are some permutation of `1..N`, but matching sorted `A` to the identity `[1,2,…,N]` in order minimizes sum of absolute differences by the rearrangement inequality.
  3. Thus answer =

     $$
       \sum_{i=0}^{N-1} \bigl| B[i] - (i+1)\bigr|.
     $$
  4. Check ≤10⁹.

This is O(N log N).

### 5. Final TypeScript Code

```ts
function solution(A: number[]): number {
  const N = A.length;
  const B = [...A].sort((a, b) => a - b);
  let moves = 0;
  for (let i = 0; i < N; i++) {
    moves += Math.abs(B[i] - (i + 1));
    if (moves > 1e9) return -1;
  }
  return moves;
}
```

* **Time Complexity:** O(N log N)
* **Space Complexity:** O(N)

This handles up to $N = 200{,}000$ efficiently.
