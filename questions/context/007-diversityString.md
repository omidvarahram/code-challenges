# DiversityString

**Easy**  
**40 min**

Find a string of a given length containing as many different lower-case letters as possible, in which each letter occurs an equal number of times.

---

## Task description

Write a function `solution` that, given an integer N, returns a string of length N containing as many different lower-case letters ('a'–'z') as possible, in which each letter occurs an equal number of times.

---

### Examples:

1. Given N = 3, the function may return "fig", "pea", "nut", etc.  
Each of these strings contains three different letters with the same number of occurrences.

2. Given N = 5, the function may return "mango", "grape", "melon", etc.

3. Given N = 30, the function may return "aabbcc...oo"  
(each letter from 'a' to 'o' occurs twice).  
The string contains 15 different letters.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..200,000]


# Task 7

## DiversityString

**Step-by-Step Explanation**

### Step 1: Understand the Goal

Given an integer `N`, return a string:
- Of length exactly `N`
- Containing **as many different lowercase letters** as possible
- **Each letter must occur the same number of times**

---

### Step 2: Key Insight

Let:
- `k` = number of different letters used
- Each letter must appear `N / k` times
- So `k` must divide `N` (`N % k === 0`)

We want to find the **maximum value of `k`** (up to 26) such that `N % k === 0`

---

### Step 3: Approach

1. Loop from 26 down to 1.
2. For the **first `k` where `N % k === 0`**, compute:
   - Number of repetitions per letter: `count = N / k`
   - Return first `k` letters of the alphabet, each repeated `count` times.

---

### Step 4: TypeScript Code

```ts
function solution(N: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (let k = 26; k >= 1; k--) {
    if (N % k === 0) {
      const count = N / k;
      let result = '';

      for (let i = 0; i < k; i++) {
        result += alphabet[i].repeat(count);
      }

      return result;
    }
  }

  return ''; // fallback, should never happen
}
```

---

### Step 5: Example

**Input:** `N = 30`

- Try `k = 26` → 30 % 26 ≠ 0  
- Try `k = 15` → 30 % 15 = 0 ✅  
- Use first 15 letters of alphabet (`a` to `o`)
- Each repeated 2 times → output is `"aabbccddeeffgghhiijjkkllmmnnoo"`

---

### Step 6: Time & Space Complexity

- **Time:** O(N) — building the result string
- **Space:** O(N) — for output

Efficient for values up to `N = 200,000`.
