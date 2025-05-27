LongestTwoDigitFragment  
Medium  
50 min  
Find the length of the longest fragment in a given array which can be written down using at most two different digits.

Task description  

Write a function:  
```function solution(A);```

that, given an array A of N integers, returns the length of the longest consistent fragment of A in which all elements can be generated using at most two different digits. You must use the same digits for all elements.

Examples:  
1. Given A = [23, 333, 33, 30, 0, 505], the function should return 4. Elements 333, 33, 30 and 0 can be generated using only digits 0 and 3.

2. Given A = [615, 88, 498, 99, 9], the function should return 2. The last two elements can be generated using only digit 9.

3. Given A = [123, 456], the function should return 0.

Assume that:
- N is an integer within the range [1..100];
- each element of array A is an integer within the range [0..1,000,000,000].

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.


## LongestTwoDigitFragment

**Step-by-Step Explanation**

### 1. Problem Restatement

We need the length of the longest **contiguous** subarray (“fragment”) of `A` such that **all** numbers in that fragment can be written using **at most two** given decimal digits (the same two digits for the entire fragment).

* A single-digit choice (e.g. only digit `9`) is allowed.
* If no element qualifies (each uses >2 distinct digits), answer is `0`.

### 2. Key Insight & Approach

1. **Precompute** for each number `A[i]` a **bitmask** of its distinct digits (0–9).
2. **Enumerate** all possible digit‐sets `D` of size 1 or 2.  There are 10 single‐digit sets and C(10,2)=45 two‐digit sets, total **55**.
3. For each chosen digit‐mask `maskD`, **scan** the array `A` from left to right, tracking a running count `currentLen` of a contiguous fragment where each `A[i]` has `digitMask[i] & ~maskD === 0` (i.e. uses only digits in `maskD`).  Reset `currentLen` to `0` when an element doesn’t fit.  Track the **maximum** such length across the scan.
4. The answer is the **maximum** over all digit‐sets `maskD`.

Since `N` ≤ 100, this O(55·N) = O(N) approach is ample.

### 3. Examples

* **A = \[23, 333, 33, 30, 0, 505]**

  * Digit‐masks:

    * 23 → {2,3}
    * 333,33,30,0 → {3,0}
    * 505 → {5,0}
  * The best digit‐set is `{3,0}` covering `[333,33,30,0]` → length **4**.

* **A = \[615, 88, 498, 99, 9]**

  * 615 → {6,1,5} (3 digits)
  * 88 → {8}
  * 498 → {4,9,8}
  * 99,9 → {9}
  * Only the suffix `[99,9]` fits a single‐digit set `{9}` → length **2**.

* **A = \[123, 456]**

  * 123 → {1,2,3}, 456 → {4,5,6}
  * No number uses ≤2 digits → answer **0**.

---

```ts
function solution(A: number[]): number {
  const N = A.length;
  // 1) Precompute digit‐mask for each number
  const digitMasks: number[] = new Array(N);
  for (let i = 0; i < N; i++) {
    let x = A[i];
    let mask = 0;
    if (x === 0) {
      mask = 1 << 0;
    } else {
      while (x > 0) {
        const d = x % 10;
        mask |= 1 << d;
        x = Math.floor(x / 10);
      }
    }
    digitMasks[i] = mask;
  }

  let best = 0;

  // 2) Enumerate all single‐digit and two‐digit sets
  for (let d1 = 0; d1 < 10; d1++) {
    for (let d2 = d1; d2 < 10; d2++) {
      const maskD = (1 << d1) | (1 << d2);

      // 3) Scan for longest contiguous run where digitMask ⊆ maskD
      let currentLen = 0;
      for (let i = 0; i < N; i++) {
        if ((digitMasks[i] & ~maskD) === 0) {
          currentLen++;
          if (currentLen > best) best = currentLen;
        } else {
          currentLen = 0;
        }
      }
    }
  }

  return best;
}
```

**Explanation of Key Steps**

* We turn each integer into a 10‐bit mask of which digits appear.
* For each possible allowed set of 1 or 2 digits, we check in O(N) the longest run of array entries whose digit‐masks fit entirely within that set.
* The overall maximum run length across all digit‐sets is our answer.
