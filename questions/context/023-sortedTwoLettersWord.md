# SortedTwoLettersWord

**Easy**  
**20 min**

Given a string, count the minimum number of letters that need to be deleted in order to obtain a string in the format "A...AB...B".

---

## Task description

We are given a string **S** of length **N** consisting only of letters 'A' and/or 'B'.  
Our goal is to obtain a string in the format **"A...AB...B"**  
(all letters 'A' occur before all letters 'B') by deleting some letters from S.  

In particular, strings consisting only of letters 'A' or only of letters 'B' fit this format.

---

### Write a function:

``` ts
function solution(S);
```

that, given a string S, returns the minimum number of letters that need to be deleted from S  
in order to obtain a string in the above format.

---

### Examples

1. Given  
   S = `"BAAAABAB"`,  
   the function should return **2**.  
   We can obtain "AAABBB" by deleting the first occurrence of 'B' and the last occurrence of 'A'.

2. Given  
   S = `"BBABAA"`,  
   the function should return **3**.  
   We can delete all occurrences of 'A' or all occurrences of 'B'.

3. Given  
   S = `"AABBBB"`,  
   the function should return **0**.  
   We do not have to delete any letters because the given string is already in the expected format.

---

### Assumptions

- N is an integer within the range [1..100,000];
- string S is made only of the characters 'A' and/or 'B'.

---

In your solution, focus on correctness.  
The performance of your solution will not be the focus of the assessment.


# SortedTwoLettersWord

**Step-by-Step Explanation**

### Step 1: Understand the Problem  
We need to delete the fewest characters so that the remaining string is of the form `"A...AB...B"`—i.e., all `'A'`s come before all `'B'`s.  

- You may delete any letters (not necessarily consecutive).
- The resulting string is a subsequence of the original.

### Step 2: Key Insight  
Equivalently, we want to **keep** the longest subsequence that is a bunch of `'A'`s followed by a bunch of `'B'`s.  
If we let:
- `prefixA[i]` = number of `'A'`s in `S[0..i-1]`
- `suffixB[i]` = number of `'B'`s in `S[i..N-1]`

then choosing a split index `i` (0 ≤ i ≤ N), we can keep `prefixA[i] + suffixB[i]` characters.  
We maximize that, and the answer is:

deletions = N − max\_{0≤i≤N} (prefixA\[i] + suffixB\[i])

### Step 3: Compute Prefix and Suffix Counts
1. Build `prefixA` on the fly as we scan from left to right.
2. Build `suffixB` once by counting all `'B'`s and then decrementing as we move the split.

### Step 4: TypeScript Code

```ts
function solution(S: string): number {
  const N = S.length;
  // Count total B's for initial suffixB at split=0
  let totalB = 0;
  for (const ch of S) if (ch === 'B') totalB++;

  let maxKeep = 0;
  let countA = 0;
  let suffixB = totalB;

  // Consider split at i from 0 to N:
  // before processing S[i], prefixA=countA, suffixB=current
  // keep = countA + suffixB
  for (let i = 0; i <= N; i++) {
    maxKeep = Math.max(maxKeep, countA + suffixB);
    if (i < N) {
      if (S[i] === 'A') {
        countA++;
      } else { // 'B'
        suffixB--;
      }
    }
  }

  return N - maxKeep;
}
```  

---

### Step 5: Example

- **S = "BAAAABAB"**, N=8  
  - Total B = 3  
  - Iterate splits:
    - i=0 → keep = 0 + 3 = 3  
    - i=1 (B) → countA=0, suffixB=2 → keep=2  
    - i=2 (A) → countA=1, suffixB=2 → keep=3  
    - i=3 (A) → countA=2, suffixB=2 → keep=4  
    - i=4 (A) → countA=3, suffixB=2 → keep=5  
    - i=5 (A) → countA=4, suffixB=2 → keep=6  
    - i=6 (B) → countA=4, suffixB=1 → keep=5  
    - i=7 (A) → countA=5, suffixB=1 → keep=6  
    - i=8 → countA=5, suffixB=1 → keep=6  
  - `maxKeep = 6`, so deletions = 8 − 6 = **2**

---

### Complexity

- **Time:** O(N) — single pass to count B’s + one pass to evaluate splits  
- **Space:** O(1) — only counters

This solves up to N = 100,000 efficiently.
