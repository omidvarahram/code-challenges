# ABString

**Easy**  
**5 min**

Check whether in a given string all letters 'a' occur before all letters 'b'.

---

## Task description

Write a function `solution` that, given a string S consisting of N letters 'a' and/or 'b', returns `true` when all occurrences of letter 'a' are before all occurrences of letter 'b' and returns `false` otherwise.

---

### Examples:

1. Given S = "aabbb", the function should return **true**.

2. Given S = "ba", the function should return **false**.

3. Given S = "aaa", the function should return **true**.  
   Note that 'b' does not need to occur in S.

4. Given S = "b", the function should return **true**.  
   Note that 'a' does not need to occur in S.

5. Given S = "abba", the function should return **false**.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..300,000];
- string S is made only of the characters 'a' and/or 'b'.


# Task 18

## ABString

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You are given a string `S` made up of only `'a'` and `'b'`.  
You must return:
- `true` if **all `'a'` letters appear before any `'b'`**
- `false` if **any `'a'` appears after a `'b'`**

---

### Step 2: Strategy

Use a **simple linear scan**:
- Once we encounter a `'b'`, **we must not see any `'a'` after that**
- If we do → return `false`

Otherwise, return `true`.

---

### Step 3: TypeScript Code

```ts
function solution(S: string): boolean {
  let seenB = false;

  for (const char of S) {
    if (char === 'b') {
      seenB = true;
    } else if (char === 'a' && seenB) {
      return false; // 'a' after 'b'
    }
  }

  return true;
}
```

---

### Step 4: Example

**Input:** `"abba"`  
- 'a' → ok  
- 'b' → seenB = true  
- 'b' → ok  
- 'a' → ❌ 'a' after 'b' → return `false`

**Input:** `"aabbb"`  
- 'a', 'a' → ok  
- 'b', 'b', 'b' → ok  
→ return `true`

---

### Step 5: Time & Space Complexity

- **Time:** O(N)
- **Space:** O(1)

Perfectly efficient for up to 300,000 characters.
