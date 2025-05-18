# CreatePalindrome

**Easy**  
**20 min**

Replace all question marks in a given string to obtain a palindrome.

---

## Task description

Write a function `solution` that, given a string S of length N, returns any palindrome which can be obtained by replacing all of the question marks in S by lowercase letters ('a'–'z'). If no palindrome can be obtained, the function should return the string **"NO"**.

A palindrome is a string that reads the same both forwards and backwards. Some examples of palindromes are: **"kayak"**, **"radar"**, **"mom"**.

---

### Examples:

1. Given S = "?ab??a", the function should return **"aabbaa"**.

2. Given S = "bab??a", the function should return **"NO"**.

3. Given S = "?a?", the function may return **"aaa"**. It may also return **"zaz"**, among other possible answers.

---

### Assume that:

- N is an integer within the range [1..1,000];
- string S consists only of lowercase letters ('a'–'z') or '?'.

---

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.

# Task 6

## CreatePalindrome

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You're given a string `S` with lowercase letters and `?` characters.  
You must **replace all `?`** with any lowercase letters to form a **palindrome**.

- If it's **not possible**, return `"NO"`.
- If possible, return **any valid palindrome**.

---

### Step 2: Palindrome Property

For a string to be a palindrome:
- The character at position `i` must equal the character at position `N - 1 - i`.

With `?`, you have flexibility:
- If both sides are `?` → choose any letter (e.g., 'a')
- If one side is `?`, copy the other side
- If both are letters and **not equal**, return `"NO"`

---

### Step 3: Approach

1. Convert the string to an array (strings are immutable in JS).
2. Loop from `0` to `Math.floor(N / 2)`:
   - Compare `S[i]` and `S[N - 1 - i]`
   - Apply the rules above.
3. Join the array and return result.

---

### Step 4: TypeScript Code

```ts
function solution(S: string): string {
  const arr = S.split('');
  const N = arr.length;

  for (let i = 0; i < Math.floor(N / 2); i++) {
    const j = N - 1 - i;
    const left = arr[i];
    const right = arr[j];

    if (left === '?' && right === '?') {
      arr[i] = arr[j] = 'a'; // choose any letter
    } else if (left === '?') {
      arr[i] = right;
    } else if (right === '?') {
      arr[j] = left;
    } else if (left !== right) {
      return "NO";
    }
  }

  // Handle middle character if odd length and it's '?'
  if (N % 2 === 1 && arr[Math.floor(N / 2)] === '?') {
    arr[Math.floor(N / 2)] = 'a';
  }

  return arr.join('');
}
```

---

### Step 5: Example Walkthrough

**Input:** `"?ab??a"`  
- Indices: 0 vs 5 → `?` and `a` → set both to `a`
- Indices: 1 vs 4 → `a` and `?` → set both to `a`
- Indices: 2 vs 3 → `b` and `?` → set both to `b`  
→ Result: `"aabbaa"`

**Input:** `"bab??a"`  
- Indices: 0 vs 5 → `b` and `a` → conflict → return `"NO"`

---

### Step 6: Time & Space Complexity

- **Time:** O(N)
- **Space:** O(N) — due to character array copy

This is efficient for N up to 1000.
