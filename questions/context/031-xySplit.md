XYSplit  
Easy  
40 min  
Given a string, return the number of ways to split it into two parts, such that at least one of the parts has an equal number of 'x's and 'y's.

---

### Task description

You are given a string S consisting of N lowercase English letters. In how many ways can we split S into two non-empty parts, such that in at least one part the letter 'x' and the letter 'y' occur the same number of times?

### Write a function:
```function solution(S);```

that, given a string S of length N, returns the number of splits S satisfying the condition above.

---

### Examples:

1. Given S = "ayxbx", the function should return 3.  
   There are four possible splits of S: "a/yxbx", "ay/xbx", "ayx/bx" and "ayxb/x".  
   Only "ay/xbx" does not fulfill the condition, so the answer is 3.  
   Note that in "a/yxbx" the left part has 0 occurrences of 'x' and 'y', so it counts as a correct split.

2. Given S = "xzzzy", the function should return 0.

3. Given S = "toyxmy", the function should return 5.

4. Given S = "apple", the function should return 4.

---

### Write an efficient algorithm for the following assumptions:
- N is an integer within the range [2..200,000];
- string S is made only of lowercase letters (a–z).

---
## XYSplit

**Step-by-Step Explanation**

### Step 1: Understand the Problem  
We have a string `S` of length `N`. We want to split it into two non-empty parts at any position between characters (there are `N-1` possible splits). A split is **valid** if **at least one** of the two parts has **equal numbers** of `'x'` and `'y'`.

### Step 2: Key Insight  
Instead of re-counting for every split, we can:
1. Precompute **prefix** counts of `'x'` and `'y'`.
2. Precompute **suffix** counts by subtracting prefix from the total counts.

For a split at position `i` (between `S[i-1]` and `S[i]`):
- Left part = `S[0..i-1]`
- Right part = `S[i..N-1]`

We check:
- `prefixX[i] === prefixY[i]`  → left has equal x/y  
  **OR**  
- `(totalX - prefixX[i]) === (totalY - prefixY[i])` → right has equal x/y

Count how many `i` from `1` to `N-1` satisfy either.

---

### Step 3: TypeScript Code

```ts
function solution(S: string): number {
  const N = S.length;
  // 1) Compute total counts
  let totalX = 0, totalY = 0;
  for (const ch of S) {
    if (ch === 'x') totalX++;
    else if (ch === 'y') totalY++;
  }

  // 2) Compute prefix counts
  let prefixX = 0, prefixY = 0;
  let ways = 0;

  // 3) Try splits at i=1..N-1
  for (let i = 1; i < N; i++) {
    const ch = S[i-1];
    if (ch === 'x') prefixX++;
    else if (ch === 'y') prefixY++;

    // left equal?
    if (prefixX === prefixY) {
      ways++;
      continue;
    }
    // right equal?
    const rightX = totalX - prefixX;
    const rightY = totalY - prefixY;
    if (rightX === rightY) {
      ways++;
    }
  }

  return ways;
}
```

---

### Step 4: Examples

- **Example 1**  
  - Input: `S = "ayxbx"`  
  - Splits:
    1. `a / yxbx` → left (0x,0y) ✅  
    2. `ay / xbx` → right (2x,1y) ❌, left (0x,1y) ❌  
    3. `ayx / bx` → left (1x,1y) ✅  
    4. `ayxb / x` → right (1x,0y) ❌, left (2x,1y) ❌  
  - Valid splits = 3

- **Example 2**  
  - Input: `S = "xzzzy"`  
  - No split yields equal `'x'` and `'y'` in either side → `0`

- **Example 3**  
  - Input: `S = "toyxmy"`  
  - All splits except one or two yield a valid side → `5`

- **Example 4**  
  - Input: `S = "apple"`  
  - No `'x'` or `'y'` at all → every split has left (0x,0y) → `N-1 = 4`

----
