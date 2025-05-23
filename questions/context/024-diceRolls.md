# DiceRolls

**Difficulty:** Easy  
**Time:** 40 min  
**Description:**  
Given a subset of a series of dice roll results, and the arithmetic mean of all results, find the missing results.

---

## Task description

You have just rolled a dice several times. The N roll results that you remember are described by an array `A`. However, there are `F` rolls whose results you have forgotten. The arithmetic mean of all of the roll results (the sum of all the roll results divided by the number of rolls) equals `M`.

**What are the possible results of the missing rolls?**

---

## Write a function:

```python
function solution(A, F, M);
```

that, given an array `A` of length `N`, an integer `F` and an integer `M`, returns an array containing possible results of the missed rolls. The returned array should contain `F` integers from `1` to `6` (valid dice rolls). If such an array does not exist then the function should return `[0]`.

---

## Examples

1. Given `A = [3, 2, 4, 3]`, `F = 2`, `M = 4`, your function should return `[6, 6]`.  
   The arithmetic mean of all the rolls is `(3 + 2 + 4 + 3 + 6 + 6) / 6 = 24 / 6 = 4`.

2. Given `A = [1, 5, 6]`, `F = 4`, `M = 3`, your function may return `[2, 1, 2, 4]` or `[6, 1, 1, 1]` (among others).

3. Given `A = [1, 2, 3, 4]`, `F = 4`, `M = 6`, your function should return `[0]`.  
   It is not possible to obtain such a mean.

4. Given `A = [6, 1]`, `F = 1`, `M = 1`, your function should return `[0]`.  
   It is not possible to obtain such a mean.

---

## Constraints

- `N` and `F` are integers within the range `[1..100,000]`
- Each element of array `A` is an integer within the range `[1..6]`
- `M` is an integer within the range `[1..6]`

> **Note:** All submissions are being checked for plagiarism. Your recruiter will be informed in case suspicious activity is detected.


# DiceRolls

**Step-by-Step Explanation**

### Step 1: Understand the Problem

- You rolled a die \(N\) times and **remember** the results in array \(A\).
- You **forgot** the results of \(F\) additional rolls.
- The **overall average** of all \(N+F\) rolls is \(M\).
- Dice results must be integers \(1\) through \(6\).

You need to **reconstruct** any valid list of the \(F\) missing rolls (or report `[0]` if impossible).

---

### Step 2: Translate to Sums

- Let  
  \[
    \text{sumA} = \sum_{x \in A} x, 
    \quad T = N + F,
    \quad \text{requiredTotal} = M \times T.
  \]
- The **sum** of the missing \(F\) rolls must be  
  \[
    \text{sumMiss} = \text{requiredTotal} - \text{sumA}.
  \]
- Each missing roll is between 1 and 6, so  
  \[
    F \times 1 \;\le\; \text{sumMiss} \;\le\; F \times 6.
  \]

If \(\text{sumMiss}\) falls outside that range, **no solution** exists → return `[0]`.

---

### Step 3: Distribute `sumMiss` Over `F` Rolls

We need any list of \(F\) integers in \([1,6]\) summing to `sumMiss`. A simple method:

1. **Start** by giving each missing roll the **minimum** value \(1\).  
   That uses up \(F \times 1\) points.
2. Let  
   \[
     R = \text{sumMiss} - F.
   \]
   We now need to distribute these \(R\) extra points over the \(F\) slots, each slot can take up to \(5\) more (since \(1+5=6\)).
3. For \(i=0\) to \(F-1\):
   - Give the \(i\)-th roll `add = min(5, R)`.
   - Set `roll[i] = 1 + add`.
   - Subtract `R -= add`.
4. At the end, \(R\) must be \(0\).  
   (If `sumMiss` was in range, this distribution always works.)

---

### Step 4: TypeScript Code

```ts
function solution(A: number[], F: number, M: number): number[] {
  const N = A.length;
  const sumA = A.reduce((acc, x) => acc + x, 0);
  const T = N + F;
  const requiredTotal = M * T;
  const sumMiss = requiredTotal - sumA;

  // Check feasibility
  if (sumMiss < F * 1 || sumMiss > F * 6) {
    return [0];
  }

  // Initialize all missing rolls to 1
  const result: number[] = Array(F).fill(1);
  let R = sumMiss - F; // remaining points to distribute

  // Distribute at most +5 to each roll
  for (let i = 0; i < F && R > 0; i++) {
    const add = Math.min(5, R);
    result[i] += add;
    R -= add;
  }

  return result;
}
```

---

### Step 5: Example Walkthrough

1. **A = [3,2,4,3], F = 2, M = 4**  
   - sumA = 12, T = 6, requiredTotal = 24  
   - sumMiss = 24 − 12 = 12  
   - F⋅1 = 2 ≤ 12 ≤ 12 = F⋅6 → feasible  
   - Start result = `[1,1]`, R = 12 − 2 = 10  
   - i=0: add = min(5,10)=5 → result[0]=6, R=5  
   - i=1: add = min(5,5)=5  → result[1]=6, R=0  
   → returns `[6,6]`.

2. **A = [1,5,6], F = 4, M = 3**  
   - sumA = 12, T = 7, requiredTotal = 21  
   - sumMiss = 21 − 12 = 9  
   - 4⋅1=4 ≤9≤24=4⋅6 → feasible  
   - Start `[1,1,1,1]`, R=9−4=5  
   - i=0: add=5 → `[6,1,1,1]`, R=0  
   → one valid answer: `[6,1,1,1]` (others possible by distributing differently).

3. **A = [1,2,3,4], F = 4, M = 6**  
   - sumA = 10, T = 8, requiredTotal = 48  
   - sumMiss = 38, but 4⋅6=24 < 38 → impossible → `[0]`.

---

**Time Complexity:** O(N + F)  
**Space Complexity:** O(F)  

This solves the problem efficiently even for large \(N,F\).
