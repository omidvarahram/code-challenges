# ShortestUniqueSubstring

**Easy**  
**20 min**

Given a string, count the length of the shortest word which occurs in it exactly once.

---

## Task description

Write a function `solution` that, given a string S of length N, returns the length of the shortest **unique** substring of S, that is, the length of the shortest word which occurs in S exactly once.

---

### Examples:

1. Given S = "ababaab", the function should return **2**.  
   The shortest unique substring of S is "aa".

2. Given S = "zyzyzyz", the function should return **5**.  
   The shortest unique substring of S is "yzyzy".  
   Note that there are shorter words, like "yzy", occurrences of which overlap, but they still count as multiple occurrences.

3. Given S = "aabbbabaaa", the function should return **3**.  
   All substrings of size 2 occur in S at least twice.

---

### Assume that:

- N is an integer within the range [1..200];
- string S is made only of lowercase letters (a–z).

---

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.


# Task 14

## ShortestUniqueSubstring

**Step-by-Step Explanation**

### Step 1: Understand the Goal

You are given a string `S`.  
You need to find the **length** of the **shortest substring** that appears **exactly once** in the string.

### Important:
- Substrings can **overlap**.
- Even overlapping duplicates count as multiple occurrences.

---

### Step 2: Strategy

Try **all substrings** of length 1 up to N.  
For each length `L`:
1. Slide a window of size `L` across the string.
2. Count how many times each substring of size `L` appears.
3. If **any** substring of length `L` appears **exactly once**, return `L`.

As soon as we find a valid length, we return it — since we go from smallest to largest.

---

### Step 3: TypeScript Code

```ts
function solution(S: string): number {
  const N = S.length;

  for (let L = 1; L <= N; L++) {
    const seen = new Map<string, number>();

    for (let i = 0; i <= N - L; i++) {
      const sub = S.slice(i, i + L);
      seen.set(sub, (seen.get(sub) || 0) + 1);
    }

    for (const [, count] of seen) {
      if (count === 1) {
        return L; // First unique substring of length L found
      }
    }
  }

  return -1; // No unique substring found
}
```

---

### Step 4: Example

**Input:** `"ababaab"`  
- Length 1 substrings → all repeated  
- Length 2 → "aa" appears once  
→ **Output:** 2

**Input:** `"zyzyzyz"`  
- All substrings of length 1–4 are repeated  
- "yzyzy" (length 5) appears once  
→ **Output:** 5

---

### Step 5: Time & Space Complexity

- **Time:** O(N²) — due to nested loop over substring lengths and sliding window
- **Space:** O(N) per length — for storing seen substrings

Acceptable for N ≤ 200
