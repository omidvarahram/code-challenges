# ForbiddenTriosSwaps

**Easy**  
**20 min**

Given a string S consisting of letters 'a' and 'b', return the minimum number of swaps needed to obtain a string with no instances of three identical consecutive letters.

---

## Task description

You are given a string S consisting of N letters 'a' and/or 'b'.  
In one move, you can swap one letter for the other ('a' for 'b' or 'b' for 'a').

Write a function:

``` ts
function solution(S);
```

that, given such a string S, returns the minimum number of moves required to obtain a string containing no instances of three identical consecutive letters.

---

### Examples:

1. Given S = "baaaaa", the function should return **1**.  
   The string without three identical consecutive letters which can be obtained in one move is "baabaa".

2. Given S = "baaabbaabbba", the function should return **2**.  
   There are four valid strings obtainable in two moves; for example: "bbaabbaabbaa".

3. Given S = "baabab", the function should return **0**.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [0..200,000];
- string S is made only of the characters 'a' and/or 'b'.


# Task 10

## ForbiddenTriosSwaps

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You are given a string `S` made of only `'a'` and `'b'`.  
In one move, you can **swap one character to the other** (e.g., `'a' → 'b'`, `'b' → 'a'`).

Your goal:  
Make the string **contain no three identical consecutive letters**.

You need to return the **minimum number of swaps** required.

---

### Step 2: Key Insight

We only need to **count how many times a group of 3 (or more) identical letters appears**.  
For every such group:
- Every **set of 3 identical letters** needs **1 swap**.
- A group of length `L` (e.g. `aaaaaa`) can form `floor((L - 2) / 2)` non-overlapping "triplets" of same letter.

### Why `(L - 2) / 2`?
- First 3: needs 1 change  
- Every 2 additional same letters beyond that create another "triplet" that needs a change

---

### Step 3: Algorithm

1. Traverse the string
2. Count consecutive same letters
3. For every group of ≥ 3, calculate: `Math.floor((count - 2) / 2)`
4. Sum all changes needed

---

### Step 4: TypeScript Code

```ts
function solution(S: string): number {
  let swaps = 0;
  let i = 0;
  const N = S.length;

  while (i < N) {
    let count = 1;

    // Count consecutive characters
    while (i + 1 < N && S[i] === S[i + 1]) {
      count++;
      i++;
    }

    if (count >= 3) {
      swaps += Math.floor((count - 2) / 2);
    }

    i++;
  }

  return swaps;
}
```

---

### Step 5: Example

**Input:** `"baaaaa"`  
Groups:
- `'aaa'` at index 1 → needs 1 swap  
→ result: **1**

**Input:** `"baaabbaabbba"`

Groups:
- `'aaa'` → 1
- `'bbb'` → 1  
→ result: **2**

---

### Step 6: Time & Space Complexity

- **Time:** O(N)
- **Space:** O(1)

Efficient for input sizes up to 200,000.
