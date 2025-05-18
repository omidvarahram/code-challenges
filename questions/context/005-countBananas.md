# CountBananas

**Easy**  
**20 min**

Calculate how many times you can print the word "BANANA" using the letters given in string S.

---

## Task description

A string S made of uppercase English letters is given. In one move, six letters forming the word **"BANANA"** (one 'B', three 'A's and two 'N's) can be deleted from S. What is the maximum number times such a move can be applied to S?

Write a function:

``` ts
function solution(S);
```

that, given a string S of length N, returns the maximum number of moves that can be applied.

---

### Examples:

1. Given S = "NAABXXAN", the function should return 1.

2. Given S = "NAANAAXNABABYNNBZ", the function should return 2.

3. Given S = "QABAAAWOBL", the function should return 0.

---

## Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- string S is made only of uppercase letters (A–Z).

# Task 5

## CountBananas

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You are given a string `S` containing uppercase letters.  
Each time you form the word **"BANANA"**, you remove:
- 1 `'B'`
- 3 `'A'`
- 2 `'N'`

You are to compute the **maximum number of times** this operation can be performed.

---

### Step 2: Approach

1. Count occurrences of letters `'B'`, `'A'`, and `'N'` in the string.
2. Divide each by the required count:
   - `'B'` count ÷ 1
   - `'A'` count ÷ 3
   - `'N'` count ÷ 2
3. The **minimum** of these three values is the answer.

---

### Step 3: TypeScript Code

```ts
function solution(S: string): number {
  const counts = { A: 0, B: 0, N: 0 };

  for (const char of S) {
    if (char in counts) {
      counts[char]++;
    }
  }

  const aCount = Math.floor(counts.A / 3);
  const bCount = counts.B;
  const nCount = Math.floor(counts.N / 2);

  return Math.min(aCount, bCount, nCount);
}
```

---

### Step 4: Example Walkthrough

**Input:**
`"NAANAAXNABABYNNBZ"`

- A: 6 → `6 / 3 = 2`
- B: 2 → `2 / 1 = 2`
- N: 5 → `5 / 2 = 2`

**Result:**
`min(2, 2, 2) = 2`

---

### Step 5: Time & Space Complexity

- **Time Complexity:** O(N) — one pass through the string
- **Space Complexity:** O(1) — only fixed counters used
