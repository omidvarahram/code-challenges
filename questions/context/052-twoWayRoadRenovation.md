# TwoWayRoadRenovation

**Medium**  
50 min  
Given a representation of a two-lane road, select at most two stretches (one in each lane) that cover the maximum number of potholes in total and that allow the road to remain open to traffic.

## Task description

You are given a description of a two-lane road in which two strings, L1 and L2, respectively represent the first and the second lane, each lane consisting of N segments of equal length.

The K-th segment of the first lane is represented by L1[K] and the K-th segment of the second lane is represented by L2[K], where '.' denotes a smooth segment of road and 'x' denotes a segment containing potholes.

Cars can drive over segments with potholes, but it is rather uncomfortable. Therefore, a project to repair as many potholes as possible was submitted. At most one contiguous stretch of each lane may be repaired at a time. For the time of reparation those stretches will be closed to traffic.

How many road segments with potholes can be repaired given that the road must be kept open (in other words, stretches of roadworks must not prevent travel from one end of the road to the other)?

Write a function:

```function solution(L1, L2);```

that, given two strings L1 and L2 of length N, returns the maximum number of segments with potholes that can be repaired.

## Examples:

1. Given L1 = "..x.x." and L2 = "x..x..", your function should return 4. It is possible to repair three potholes in the first lane and the first pothole in the second lane without closing the road to traffic.

2. Given L1 = "xxx...x" and L2 = ".x.xxxx", your function should return 6.

3. Given L1 = "xxxxx" and L2 = "..x.x", your function should return 5.

4. Given L1 = "x..x" and L2 = "..x.", your function should return 2.

## Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..200,000];
- strings L1 and L2 consist only of the characters "." and/or "x".

## TwoWayRoadRenovation

**Step-by-Step Explanation**

### 1. Problem Restatement

We have two lanes, each of length `N`, described by strings `L1` and `L2` of `'.'` (smooth) and `'x'` (pothole). We wish to choose at most one contiguous interval in each lane (possibly none in a lane), to “repair” (cover) all potholes in that interval. These intervals close those segments to traffic, so to keep the road open end-to-end, the two closed intervals **must not overlap in position**. We want to maximize the total number of `'x'` covered by these one or two intervals.

### 2. Key Observation

* **Non-overlap constraint** translates to: if we repair `[l1..r1]` in lane 1 and `[l2..r2]` in lane 2, we require either `r1 < l2` or `r2 < l1`.
* Equivalently, choose a “split point” `k` between segments `k` and `k+1` (including before 0 or after N−1), and repair in lane 1 only in the prefix `0..k`, and in lane 2 only in the suffix `k+1..N−1` (or vice versa).
* We also must consider doing repairs in only one lane.

Thus, we reduce to – for each lane separately – finding, for every prefix, the maximum number of potholes coverable by a single interval within that prefix, and for every suffix, likewise the maximum within that suffix. Then we combine prefix-of-lane1 + suffix-of-lane2, and prefix-of-lane2 + suffix-of-lane1, taking the maximum over all split points, also comparing with the best single-lane repair.

### 3. Precompute “Max Subarray Sum” Prefix/Suffix

Treat `x` as 1, `.` as 0. Then we are seeking the maximum‐sum subarray (interval) in a binary array.

* For lane1, let `v1[i] = (L1[i]==='x'?1:0)`.
* Compute `bestEnd1[i]` = max subarray sum ending exactly at `i`:

  ```
    bestEnd1[i] = max(bestEnd1[i-1] + v1[i], v1[i]);
  ```
* Then `leftMax1[i]` = max subarray sum anywhere in `0..i`:

  ```
    leftMax1[i] = max(leftMax1[i-1], bestEnd1[i]).
  ```
* Similarly, compute suffix arrays `bestStart1[i]` (max subarray sum starting at `i`) and `rightMax1[i]` = max over `i..N−1`.

Repeat for lane2 to get `leftMax2` and `rightMax2`.

### 4. Combine for the Answer

1. **Single‐lane best**:

   ```
     best1 = leftMax1[N-1],   best2 = leftMax2[N-1].
   ```

2. **Two‐lane splits**: for each split `k` from `0..N−2`:

   * Repair lane1 in prefix `0..k`, lane2 in suffix `k+1..N−1`:
     `cand1 = leftMax1[k] + rightMax2[k+1]`
   * Repair lane2 in prefix, lane1 in suffix:
     `cand2 = leftMax2[k] + rightMax1[k+1]`
   * Track the maximum over all `k`.

3. The answer is

   ```
     max(best1, best2, max_k(cand1,cand2)).
   ```

This runs in **O(N)** time and **O(N)** space.

---

```ts
function solution(L1: string, L2: string): number {
  const N = L1.length;
  const v1 = Array(N), v2 = Array(N);
  for (let i = 0; i < N; i++) {
    v1[i] = (L1[i] === 'x') ? 1 : 0;
    v2[i] = (L2[i] === 'x') ? 1 : 0;
  }

  // Helper to build prefix/suffix max‐subarray for a binary array v
  function build(v: number[]) {
    const n = v.length;
    const bestEnd = Array(n);
    const bestStart = Array(n);
    const leftMax = Array(n);
    const rightMax = Array(n);

    // prefix
    bestEnd[0] = v[0];
    leftMax[0] = v[0];
    for (let i = 1; i < n; i++) {
      bestEnd[i] = Math.max(bestEnd[i - 1] + v[i], v[i]);
      leftMax[i] = Math.max(leftMax[i - 1], bestEnd[i]);
    }

    // suffix
    bestStart[n - 1] = v[n - 1];
    rightMax[n - 1] = v[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      bestStart[i] = Math.max(bestStart[i + 1] + v[i], v[i]);
      rightMax[i] = Math.max(rightMax[i + 1], bestStart[i]);
    }

    return { leftMax, rightMax };
  }

  const { leftMax: L1_left, rightMax: L1_right } = build(v1);
  const { leftMax: L2_left, rightMax: L2_right } = build(v2);

  // single‐lane
  let answer = Math.max(L1_left[N - 1], L2_left[N - 1]);

  // two‐lane splits
  for (let k = 0; k < N - 1; k++) {
    const candA = L1_left[k] + L2_right[k + 1];
    const candB = L2_left[k] + L1_right[k + 1];
    if (candA > answer) answer = candA;
    if (candB > answer) answer = candB;
  }

  return answer;
}
```

**Complexities**

* **Time:** O(N)
* **Space:** O(N)

This finds the optimal choice of up to one repair interval per lane without blocking traffic.
