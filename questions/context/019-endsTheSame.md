
# EndsTheSame

**Medium**  
**20 min**

Count how many times the first and last letters of a string are the same during a sequence of operations.

---

## Task description

Initially, string S of length N is given.  
Then N−1 operations are applied to it: move the first letter of S to the end.  
How many times is the first letter of S the same as the last letter?

For example, given S = "abbaa", the obtained sequence of strings is:

abbaa → bbaaa → baaab → aaabb → aabba

Three of them have the same first and last letter.

Write a function:

``` ts
function solution(S);
```

that, given a string S of length N, consisting of letters 'a' and/or 'b',  
returns the number of times the first letter is the same as the last in the obtained sequence of strings.

---

### Examples:

1. Given S = "abbaa", the function should return **3**.

2. Given S = "aaaa", the function should return **4**.  
   The first and last letters are always the same.

3. Given S = "abab", the function should return **0**.  
   The first and last letters are always different.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [2..200,000];
- string S is made only of the characters 'a' and/or 'b'.


# Task 19

## EndsTheSame

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You are given a string `S`.  
You apply `N - 1` rotations to it:
- In each step, move the first character to the end.
- For each rotation (including the **original string**), count how many times:
  - `S[0] === S[S.length - 1]` (first char equals last char)

---

### Step 2: Brute Force vs Optimized

- **Brute Force**: Perform all N rotations and compare first and last → O(N²) → too slow
- **Optimized**: Notice that each rotation is equivalent to checking:
  - Is `S[i] === S[(i + N - 1) % N]` for each rotation index `i`?

Why?
- For rotation `i`, the string becomes:  
  `S[i] S[i+1] ... S[N-1] S[0] ... S[i-1]`
- So first character = `S[i]`, last character = `S[(i + N - 1) % N]`

---

### Step 3: Efficient Approach

1. Loop `i` from 0 to N-1:
   - Compare `S[i] === S[(i + N - 1) % N]`
2. Count how many times this is true

---

### Step 4: TypeScript Code

```ts
function solution(S: string): number {
  const N = S.length;
  let count = 0;

  for (let i = 0; i < N; i++) {
    const first = S[i];
    const last = S[(i + N - 1) % N];

    if (first === last) {
      count++;
    }
  }

  return count;
}
```

---

### Step 5: Example

**Input:** `"abbaa"`

Rotations:
- "abbaa" → a == a ✅
- "bbaaa" → b == a ❌
- "baaab" → b == b ✅
- "aaabb" → a == b ❌
- "aabba" → a == a ✅

→ Output: **3**

---

### Step 6: Time & Space Complexity

- **Time:** O(N)
- **Space:** O(1)

Efficient and scalable for up to 200,000 characters.
