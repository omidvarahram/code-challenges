# SameDigitMerge

**Easy**  
**30 min**

Count the number of pairs in which the last digit of the first selected number is the same as the first digit of the second selected number.

---

## Task description

There is an array `numbers` made of N integers. Each number has at least two digits and its first and last digits are different.

You can select a pair of numbers if the last digit of the first selected number is the same as the first digit of the second selected number.  
Calculate the number of ways in which such a pair of numbers can be selected.

Write a function:

``` ts
function solution(numbers);
```

that, given an array `numbers` made of N integers, returns the number of ways to select a pair of numbers as described above.

---

### Examples:

1. Given  
   `numbers = [30, 12, 29, 91]`,  
   the function should return **3**.  
   The pairs are: (12, 29), (29, 91) and (91, 12).

2. Given  
   `numbers = [122, 21, 21, 23]`,  
   the function should return **5**.  
   The pairs are: (122, 21) occurring twice, and (21, 122) occurring twice, (21, 23) once.  
   Note that the same pair of numbers can appear multiple times if the pairs of their indices are different.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of array `numbers` is an integer within the range [10..1,000,000,000];
- the first and last digits in each element of array `numbers` are different;
- the answer does not exceed 1,000,000,000.


# Task 13

## SameDigitMerge

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You are given an array `numbers`.  
You can form a pair `(a, b)` **only if**:
- The **last digit** of `a` is equal to the **first digit** of `b`

Each number has:
- At least **two digits**
- **First and last digits are different**

You are to **count all such valid pairs** in the array.

---

### Step 2: Key Insight

Let’s group numbers by:
- Their **first digit**
- Their **last digit**

Then:
- For each number `a`, we extract its **last digit**
- We count how many numbers in the array have a **first digit equal to `a`'s last digit**

---

### Step 3: Efficient Approach

1. Initialize a map `firstDigitCount` with keys `0`–`9`, all starting at 0.
2. Loop through all numbers:
   - Extract the **first digit** and **last digit**
   - Store count of numbers starting with each first digit
3. Loop again through all numbers:
   - For each number, get its **last digit**
   - Add `firstDigitCount[lastDigit]` to result
   - **Exclude pairing a number with itself** if `firstDigit` of a number == `lastDigit` → not needed, as constraint guarantees they're different

---

### Step 4: TypeScript Code

```ts
function solution(numbers: number[]): number {
  const firstDigitCount: number[] = Array(10).fill(0);
  let count = 0;

  // First pass: count how many numbers start with each digit
  for (const num of numbers) {
    const firstDigit = Number(String(num)[0]);
    firstDigitCount[firstDigit]++;
  }

  // Second pass: for each number, match last digit to first digit counts
  for (const num of numbers) {
    const lastDigit = num % 10;
    count += firstDigitCount[lastDigit];
  }

  return count;
}
```

---

### Step 5: Example

**Input:**  
`[30, 12, 29, 91]`

Digits:
- 30 → first=3, last=0
- 12 → first=1, last=2
- 29 → first=2, last=9
- 91 → first=9, last=1

Pairs:
- 12 → 29 (last=2 → first=2) ✅
- 29 → 91 (last=9 → first=9) ✅
- 91 → 12 (last=1 → first=1) ✅

**Output:** `3`

---

### Step 6: Time & Space Complexity

- **Time:** O(N)
- **Space:** O(1) — fixed-size array for digit counts

Efficient for N up to 100,000
