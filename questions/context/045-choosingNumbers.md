### ChoosingNumbers

**Medium**  
**50 min**  
Choose the maximum number of integers from an array so that, after sorting, the difference between every adjacent pair is equal.

---

### Task description

There is an array A made of N integers. Your task is to choose as many integers from A as possible so that, when they are put in ascending order, all of the differences between all pairs of consecutive integers are equal.

For example, for A = [4, 3, 5, 1, 4, 4], you could choose 1, 3 and 5 (with differences equal to 2) or 4, 4 and 4 (with differences equal to 0).

**What is the maximum number of integers that can be chosen?**

Write a function:

```function solution(A);```

that, given an array A made of N integers, returns the maximum number of integers that can be chosen following the rules described above.

---

### Examples

1. For A = [4, 7, 1, 5, 3], the function should return 4. It is possible to choose four integers (7, 1, 5 and 3). When put in ascending order, the difference between all consecutive integers is 2.

2. For A = [12, 12, 12, 15, 10], the function should return 3. It is optimal to choose all integers with a value of 12.

3. For A = [18, 26, 18, 24, 24, 20, 22], the function should return 5. Five integers (18, 20, 22, 24, 26) can be chosen. Notice that we cannot pick any other integers, even though they occur more than once.

---

### Assume that:

- N is an integer within the range [2..50];
- each element of array A is an integer within the range [1..100].

---

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.

## ChoosingNumbers

**Step-by-Step Explanation**

### 1. Problem Restatement

Given an array `A` of `N` integers, pick as many of them as possible so that, once sorted, they form an arithmetic progression (i.e. the difference between every pair of consecutive elements is the same).

### 2. Key Insight

* If the common difference `d = 0`, then we are simply choosing as many equal integers as possible → that’s the **maximum frequency** of any single value in `A`.
* For `d > 0`, we need to find an arithmetic progression of difference `d` that “hits” as many elements of `A` as possible.
* Since `N ≤ 50` and values are in `[1..100]`, we can **brute-force**:

  1. Count the frequency `freq[v]` of each value `v` in `A`.
  2. Track `best` = `max(freq[v])` (the `d=0` case).
  3. For every possible positive difference `d` from `1` to `99`:

     * For every possible starting value `start` in `[1..100]`:

       * Walk the arithmetic sequence `start, start+d, start+2d, …` up to `100`.
       * Sum up `freq` of those terms.
       * Update `best` if this sum is larger.
  4. Return `best`.

This runs in about **O(V²)** where `V = 100`, which is perfectly fine for `N ≤ 50`.

---

```ts
function solution(A: number[]): number {
  // 1) Build frequency table
  const freq = Array(101).fill(0);
  for (const x of A) {
    freq[x]++;
  }

  // 2) d = 0 case: pick all of the same number
  let best = 0;
  for (let v = 1; v <= 100; v++) {
    if (freq[v] > best) {
      best = freq[v];
    }
  }

  // 3) d > 0 cases
  for (let d = 1; d <= 99; d++) {
    // try starting at each possible value
    for (let start = 1; start <= 100; start++) {
      let count = 0;
      for (let x = start; x <= 100; x += d) {
        count += freq[x];
      }
      if (count > best) {
        best = count;
      }
    }
  }

  return best;
}
```

---

### Examples

1. **A = \[4, 7, 1, 5, 3]**

   * Frequencies: each value once → `best=1` initially.
   * For `d=2`, starting at `1`: hits `1,3,5,7` → count = 4 → `best=4`.

2. **A = \[12, 12, 12, 15, 10]**

   * `d=0` case: `freq[12]=3` → `best=3`.
   * No larger AP exists → answer = 3.

3. **A = \[18, 26, 18, 24, 24, 20, 22]**

   * `d=0` → max freq = 2 (for 18 or 24).
   * `d=2` starting at 18: hits `18,20,22,24,26` → 5 hits → `best=5`.

---

**Complexities**

* Time: O(100×100×(100/1)) ≈ O(10⁶) in worst case, which is fine for `N ≤ 50`.
* Space: O(1) extra (100-element frequency array).
