LongestEvenCount  
Medium  
50 min  
Given a string, return the longest substring in which every letter occurs an even number of times.

Task description  

Write a function:  
```function solution(S);```

that, given a string S consisting of N lowercase English letters, returns the length of the longest substring in which every letter occurs an even number of times. A substring is defined as a contiguous segment of a string. If no such substring exists, return 0.

Examples:  
1. Given S = "bdaaadadb", the function should return 6. Substrings in which every letter occurs an even number of times are "aa", "adad", "daaad" and "aaadad". The length of the longest of them is 6.

2. Given S = "habcb", the function should return 0. There is no non-empty substring in which every letter occurs an even number of times.

3. Given S = "zthtzh", the function should return 6. Every letter in the whole string occurs an even number of times.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- string S consists only of lowercase letters ('a'–'z').


## LongestEvenCount

**Step-by-Step Explanation**

### 1. Problem Restatement

We want the length of the longest contiguous substring of `S` in which **every** letter appears an **even** number of times.

### 2. Key Insight: Parity Mask + Prefix

* There are only 26 lowercase letters.
* Track a 26-bit bitmask `mask` where bit `k` (0 ≤ k < 26) is `1` if the count of letter `('a'+k)` seen so far is odd, and `0` if even.
* As we scan the string, toggling the bit for each character updates the parity-mask for the prefix ending at each position.
* A substring `S[i..j]` has all letters even iff the prefix masks at `j` and at `i-1` are **equal**.
* Thus, for each mask value, if we record the **earliest** index where it appeared, then whenever it appears again at a later index `j`, the substring from `(earliest_index+1)` to `j` has even counts for all letters.

### 3. Algorithm

1. Initialize `mask = 0`, and a map `firstIndex` from mask → index, with `firstIndex.set(0, -1)` (mask 0 at “before start”).
2. `maxLen = 0`.
3. Loop `i` from `0` to `N−1`:

   * Compute `bit = 1 << (S[i].charCodeAt(0) - 'a'.charCodeAt(0))`
   * Toggle `mask ^= bit`.
   * If `firstIndex` has `mask`, let `j = firstIndex.get(mask)`, update `maxLen = max(maxLen, i - j)`.
   * Otherwise, set `firstIndex.set(mask, i)`.
4. Return `maxLen`.

This runs in **O(N)** time and **O(min(N, 2^26))** space.

---

### 4. TypeScript Implementation

```ts
function solution(S: string): number {
  const N = S.length;
  let mask = 0;
  const firstIndex = new Map<number, number>();
  firstIndex.set(0, -1);

  let maxLen = 0;
  for (let i = 0; i < N; i++) {
    const bit = 1 << (S.charCodeAt(i) - 97);
    mask ^= bit;
    if (firstIndex.has(mask)) {
      const j = firstIndex.get(mask)!;
      maxLen = Math.max(maxLen, i - j);
    } else {
      firstIndex.set(mask, i);
    }
  }

  return maxLen;
}
```

### 5. Examples

* **S = "bdaaadadb"**
  The algorithm finds maximum-length substring `"aaadad"` (or `"adad"`, etc.) of length **6**.

* **S = "habcb"**
  No substring has every letter even → **0**.

* **S = "zthtzh"**
  Whole string mask returns to 0 at the end → substring length **6**.
