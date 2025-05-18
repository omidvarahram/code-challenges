# EraseOneLetter

**Easy**  
**20 min**

Remove one letter from a word so that the resulting string will be as small as possible (alphabetically).

---

## Task description

Write a function `solution` that, given a string S consisting of N characters, returns the alphabetically smallest string that can be obtained by removing exactly one letter from S.

---

### Examples:

1. Given S = "acb", by removing one letter, you can obtain "ac", "ab" or "cb".  
   Your function should return **"ab"** (after removing 'c') since it is alphabetically smaller than "ac" and "bc".

2. Given S = "hot", your function should return **"ho"**, which is alphabetically smaller than "ht" and "ot".

3. Given S = "codility", your function should return **"cdility"**, which can be obtained by removing the second letter.

4. Given S = "aaaa", your function should return **"aaa"**. Any occurrence of 'a' can be removed.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [2..100,000];
- string S is made only of lowercase letters (a–z).

# Task 8

## EraseOneLetter

**Step-by-Step Explanation**

### Step 1: Understand the Goal

You're given a string `S` of length `N`.  
You need to:
- Remove **exactly one character**
- Return the **alphabetically smallest** string possible

---

### Step 2: Intuition and Greedy Strategy

To get the **smallest string**:
- Remove the **first character that is greater than the next character**  
  → This will pull the smaller character earlier and make the string lexicographically smaller.

If no such character exists (i.e. string is in non-decreasing order), remove the **last character**.

---

### Step 3: Approach

1. Loop through string from left to right:
   - If `S[i] > S[i + 1]`, remove `S[i]` and return the result.
2. If no such character found, remove the **last character**.

---

### Step 4: TypeScript Code

```ts
function solution(S: string): string {
  for (let i = 0; i < S.length - 1; i++) {
    if (S[i] > S[i + 1]) {
      return S.slice(0, i) + S.slice(i + 1);
    }
  }

  // If no such character found, remove the last one
  return S.slice(0, S.length - 1);
}
```

---

### Step 5: Example

**Input:** `"acb"`

- 'a' < 'c' ✅
- 'c' > 'b' → remove `'c'` → result: `"ab"`  
  `"ab"` is alphabetically smaller than `"ac"` and `"cb"`

---

### Step 6: Time & Space Complexity

- **Time:** O(N)
- **Space:** O(N) — for output string

Efficient for `N` up to 100,000.
