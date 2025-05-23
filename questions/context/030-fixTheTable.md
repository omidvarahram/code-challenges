FixTheTable  
Easy  
40 min  
Given the distinct positions of holes, find the shortest length of two identical boards that can cover all the holes.

---

### Task description

There are N holes arranged in a row in the top of an old table. We want to fix the table by covering the holes with two boards. For technical reasons, the boards need to be of the same length.

The position of the K-th hole is A[K]. What is the shortest length of the boards required to cover all the holes? The length of the boards has to be a positive integer. A board of length L, set at position X, covers all the holes located between positions X and X+L (inclusive). The position of every hole is unique.

### Write a function:
```function solution(A);```

that, given an array A of integers of length N, representing the positions of the holes in the table, returns the shortest board length required to cover all the holes.

---

### Examples:
1. Given A = [11, 20, 15], your function should return 4.  
   The first board would cover the holes in positions 11 and 15, and the second board the hole at position 20.

2. Given A = [15, 20, 9, 11], your function should return 5.  
   The first board covers the holes at positions 9 and 11, and the second one the holes in positions 15 and 20.

3. Given A = [0, 44, 32, 30, 42, 18, 34, 16, 35], your function should return 18.  
   The first board would cover the holes in positions between 0 and 18, and the second the positions between 30 and 44.

4. Given A = [9], your function should return 1.

---

### Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [0..1,000,000,000];
- the elements of A are all distinct.


---

## FixTheTable

**Step-by-Step Explanation**

### Step 1: Understand the Problem  
We have \(N\) distinct hole positions \(A[0..N-1]\) on a line. We need two boards of the **same** integer length \(L\) each. A board placed at \(X\) covers holes in \([X, X+L]\). We must cover **all** holes with those two boards. Find the **smallest** positive \(L\).

---

### Step 2: Reformulate as a Split  
1. **Sort** the positions array \(A\) ascending.  
2. Any covering by two intervals corresponds to choosing an index \(K\) so that:
   - Board 1 covers holes \(A[0]\) through \(A[K]\).
   - Board 2 covers holes \(A[K+1]\) through \(A[N-1]\).
3. The **span** needed for board 1 is  
   \[
     \text{span1} = 
       \begin{cases}
         0, & K = -1 \text{ (no holes)}\\
         A[K] - A[0], & K \ge 0
       \end{cases}
   \]
   Similarly for board 2:
   \[
     \text{span2} = 
       \begin{cases}
         0, & K+1 = N \\
         A[N-1] - A[K+1], & K+1 < N
       \end{cases}
   \]
4. To cover both groups with boards of length \(L\), we need  
   \(\displaystyle L \ge \max(\text{span1}, \text{span2})\).  
5. We test every split \(K\in[-1,0,1,\dots,N-1]\) and take  
   \[
     L_{\min} = \min_{K} \bigl(\max(\text{span1},\,\text{span2})\bigr).
   \]
6. Finally, since the board length must be a **positive** integer, return  
   \(\max(1,\,L_{\min})\).

---

### Step 3: Examples

- **Example 1**  
  - Input: `A = [11, 20, 15]`  
  - Sorted: `[11, 15, 20]`  
  - Splits:
    - `K = -1`: spans = (0, 20–11=9) → \(\max=9\)  
    - `K =  0`: spans = (11–11=0, 20–15=5) → \(\max=5\)  
    - `K =  1`: spans = (15–11=4, 20–20=0) → \(\max=4\)  
    - `K =  2`: spans = (20–11=9, 0) → \(\max=9\)  
  - Minimum of \(\{9,5,4,9\}\) is **4**.  
  - Output: `4`

- **Example 2**  
  - Input: `A = [15, 20, 9, 11]`  
  - Sorted: `[9, 11, 15, 20]`  
  - Splits → \(\max\) values \(\{11,9,5,6,11\}\) → minimum = **5**.  
  - Output: `5`

- **Example 3**  
  - Input: `A = [0,44,32,30,42,18,34,16,35]`  
  - Sorted: `[0,16,18,30,32,34,35,42,44]`  
  - Optimal split between `18` and `30` → spans = (18–0=18, 44–30=14) → \(\max=18\).  
  - Output: `18`

- **Example 4**  
  - Input: `A = [9]`  
  - Only one hole → any board length 0 would cover it, but must be ≥1 → **1**.  
  - Output: `1`

---

```ts
function solution(A: number[]): number {
  // 1) Sort positions ascending
  A.sort((a, b) => a - b);
  const N = A.length;

  let best = Infinity;

  // 2) Try every split K from -1 to N-1
  for (let K = -1; K < N; K++) {
    // span for board 1 (covers A[0..K])
    const span1 = (K >= 0) ? (A[K] - A[0]) : 0;
    // span for board 2 (covers A[K+1..N-1])
    const span2 = (K + 1 < N) ? (A[N - 1] - A[K + 1]) : 0;

    // two boards need length ≥ max(span1, span2)
    const L = Math.max(span1, span2);
    if (L < best) best = L;
  }

  // 3) Board length must be at least 1
  return Math.max(1, best);
}
```
