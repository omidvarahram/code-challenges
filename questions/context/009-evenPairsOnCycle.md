# EvenPairsOnCycle

**Easy**  
**40 min**

Given numbers on a circle, find the maximum number of neighbouring pairs with an even sum.

---

## Task description

You are given N numbers on a circle, described by an array A.  
Find the maximum number of neighbouring pairs whose sums are even.  
One element can belong to only one pair.

Write a function:

``` ts
function solution(A);
```

that, given an array A consisting of N integers, returns the maximum number of neighbouring pairs whose sums are even.

---

### Examples:

1. Given A = [4, 2, 5, 8, 7, 3, 7], the function should return **2**.  
   We can create two pairs with even sums: (A[0], A[1]) and (A[4], A[5]).  
   Another way to choose two pairs is: (A[0], A[1]) and (A[5], A[6]).

2. Given A = [14, 21, 16, 35, 22], the function should return **1**.  
   There is only one qualifying pair: (A[0], A[4]).

3. Given A = [5, 5, 5, 5, 5, 5], the function should return **3**.  
   We can create three pairs: (A[0], A[5]), (A[1], A[2]), and (A[3], A[4]).

---

## Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [0..1,000,000,000].

# Task 9

## EvenPairsOnCycle

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You are given an array `A` representing values arranged **in a circle**.  
Your task is to:
- Form **non-overlapping neighbouring pairs**
- Such that the **sum of each pair is even**
- Return the **maximum number of such pairs**

"Neighbouring" means:
- (A[i], A[i+1]) for i from 0 to N−2
- And (A[N−1], A[0]) because it's a **circle**

Each element can be used in **only one pair**.

---

### Step 2: Key Insight

A pair has an **even sum** if:
- both numbers are even OR
- both numbers are odd

This leads to the logic:
- Traverse the array and **greedily pair** any **even-even** or **odd-odd** neighbours.
- Once paired, **skip** the next element (since it's used).

You must **handle the circular pair** (last + first) separately if needed.

---

### Step 3: Approach

1. Track visited/used elements to avoid overlap.
2. Traverse the array in a loop:
   - Check current and next (considering wrap-around).
   - If their sum is even and both are unused → pair them.
   - Mark both as used.

---

### Step 4: TypeScript Code

```ts
function solution(A: number[]): number {
  const N = A.length;
  const used = new Array(N).fill(false);
  let count = 0;

  for (let i = 0; i < N; i++) {
    const next = (i + 1) % N;

    if (!used[i] && !used[next]) {
      const sum = A[i] + A[next];
      if (sum % 2 === 0) {
        used[i] = true;
        used[next] = true;
        count++;
      }
    }
  }

  return count;
}
```

---

### Step 5: Example Walkthrough

**Input:** `[4, 2, 5, 8, 7, 3, 7]`

- (4,2) → 6 ✅ → mark used
- (5,8) → 13 ❌
- (8,7) → 15 ❌
- (7,3) → 10 ✅ → mark used
- (3,7) → already used
- (7,4) → wrap-around already used

**Result:** 2 pairs

---

### Step 6: Time & Space Complexity

- **Time:** O(N)
- **Space:** O(N) for `used` array

Efficient and valid for N up to 100,000.
