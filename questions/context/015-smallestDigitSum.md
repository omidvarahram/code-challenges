# SmallestDigitSum

**Easy**  
**20 min**

Given an integer N, find the smallest integer whose digits sum to N.

---

## Task description

Write a function `solution` that, given integer N, returns the smallest non-negative integer whose individual digits sum to N.

---

### Examples:

1. Given N = 16, the function should return **79**.  
   There are many numbers whose digits sum to 16 (for example: 79, 97, 808, 5551, 22822, etc.).  
   The smallest such number is 79.

2. Given N = 19, the function should return **199** (the sum of digits is 1 + 9 + 9 = 19).

3. Given N = 7, the function should return **7**.

---

### Assume that:

- N is an integer within the range [0..50].

---

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.

# Task 15

## SmallestDigitSum

**Step-by-Step Explanation**

### Step 1: Understand the Goal

You are given an integer `N` (0 ≤ N ≤ 50).  
You must return the **smallest non-negative integer** whose **digits sum to N**.

---

### Step 2: Key Insight

To make the number **as small as possible**, we want:
- **Smaller digits in more significant positions** (leftmost digits)
- So we should **build the number from right to left** using the **largest digits possible** first

Why?
- Placing large digits at the **end (units place)** results in **smaller overall numbers**

---

### Step 3: Strategy

1. Start from the rightmost digit (units place).
2. Subtract as much as possible (up to 9) from `N`.
3. Prepend that digit to the result.
4. Repeat until the remaining sum is 0.
5. Join the digits to form the number.

---

### Step 4: TypeScript Code

```ts
function solution(N: number): number {
  if (N === 0) return 0;

  const digits: number[] = [];

  while (N > 0) {
    const digit = Math.min(9, N);
    digits.unshift(digit);
    N -= digit;
  }

  return Number(digits.join(''));
}
```

---

### Step 5: Example

**Input:** N = 16  
- Take 9 → remaining = 7  
- Take 7 → remaining = 0  
→ Digits = [7, 9] → Result = **79**

**Input:** N = 19  
- 9 → remaining = 10  
- 9 → remaining = 1  
- 1 → remaining = 0  
→ Digits = [1, 9, 9] → Result = **199**

---

### Step 6: Time & Space Complexity

- **Time:** O(1) — max 6 digits (since 50 / 9 ≈ 6)
- **Space:** O(1)

Very efficient and correct for 0 ≤ N ≤ 50
