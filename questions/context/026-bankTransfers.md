BankTransfers  
Easy  
40 min  
Given a list of transfers between two banks, determine the minimum initial account balance of each bank required for the given transfers to be carried out.

## Task description

You are given a list of N transfers (numbered from 0 to N−1) between two banks: bank A and bank B. The K-th transfer is described by two values:

- R[K] (either "a" or "b") representing the recipient (the bank the transfer is sent to);
- V[K] denoting the value sent via the transfer.

All transfers are completed in the order they appear on the list. The banks do not want to go into debt (in other words, their account balance may not drop below 0). What minimum initial account balance in each bank is necessary in order to complete the transfers?

### Write a function:

```function solution(R, V);```

that, given a string R and an array of integers V, both of length N, returns an array of two integers. The integers should represent the minimum initial account balances for banks A and B in the following order: [bank A, bank B].

Result array should be returned as an array of integers.

### Examples:

1. Given R = "baaba" and V = [2, 4, 1, 1, 2], the function should return [2, 4]. The bank accounts’ balances after each transfer are shown in the following table:

| Transfer | From | To | Value | A | B                              |
| -------- | ---- | -- | ----- | - | ------------------------------ |
| 0        | B    | A  | 2     | 2 | 0                              |
| 1        | B    | A  | 4     | 6 | -4 (need at least 4 initially) |
| 2        | B    | A  | 1     | 7 | -5                             |
| 3        | A    | B  | 1     | 6 | -4                             |
| 4        | B    | A  | 2     | 8 | -6                             |



2. Given R = "abab" and V = [10, 5, 10, 15], the function should return [10, 15].

3. Given R = "b" and V = [100], the function should return [100, 0].

### Write an efficient algorithm for the following assumptions:

- string R and array V are both of length N;
- N is an integer within the range [1..100,000];
- each element of array V is an integer within the range [1..10,000];
- string R is made only of the characters 'a' and/or 'b'.

---
# BankTransfers

**Step-by-Step Explanation**

### Step 1: Understand the Problem
We have two banks, A and B, each with some unknown initial balance.  
There is a sequence of transfers; for each transfer:
- If `R[k] === 'a'`, bank B sends `V[k]` to bank A.
- If `R[k] === 'b'`, bank A sends `V[k]` to bank B.

Neither bank’s balance may ever go below zero. We need the **minimum** starting balances `[initA, initB]` that make all transfers possible in order.

---

### Step 2: Key Insight
Simulate the transfers starting with zero balances, tracking the **running balances** of A and B. Whenever a balance would go negative, record how far below zero it went; that deficit is how much initial balance is needed. Specifically:

- Let `balA = 0`, `balB = 0`.
- Let `needA = 0`, `needB = 0`.
- For each transfer `k`:
  - If `R[k] === 'a'`:
    - `balB -= V[k]`
    - `balA += V[k]`
    - If `balB < 0`, then `needB = max(needB, -balB)`.
  - Else (`'b'`):
    - `balA -= V[k]`
    - `balB += V[k]`
    - If `balA < 0`, then `needA = max(needA, -balA)`.
- After processing all transfers, `needA` and `needB` are the minimum initial balances.

---

### Step 3: TypeScript Code

```ts
function solution(R: string, V: number[]): [number, number] {
  let balA = 0, balB = 0;
  let needA = 0, needB = 0;

  for (let k = 0; k < R.length; k++) {
    const v = V[k];
    if (R[k] === 'a') {
      // B → A
      balB -= v;
      balA += v;
      if (balB < 0) {
        needB = Math.max(needB, -balB);
      }
    } else {
      // 'b': A → B
      balA -= v;
      balB += v;
      if (balA < 0) {
        needA = Math.max(needA, -balA);
      }
    }
  }

  return [needA, needB];
}
```

---

### Step 4: Example Walkthrough

**Example 1**  

R = "baaba", V = \[2,4,1,1,2]


- Start: balA=0, balB=0, needA=needB=0
- k=0 ('b',2): A→B  
  balA=-2 → needA=2; balB=+2
- k=1 ('a',4): B→A  
  balB=-2 → needB=2; balA=+2
- k=2 ('a',1): B→A  
  balB=-1 → needB=2; balA=+3
- k=3 ('b',1): A→B  
  balA=+2; balB=0
- k=4 ('a',2): B→A  
  balB=-2 → needB=2; balA=+4

Result: `[needA, needB] = [2, 2]`.  
But because B dipped to -2 at multiple points, needB = 2. The sample expected `[2,4]`—they considered the worst dip was -4. Indeed, in step 1 after k=0: balB=2, balA=-2; needA=2. After k=1: balB=-2 (2−4), needB=2; after k=2: balB=-3, needB=3; after k=4: balB=-5, needB=5. So the sample return `[2,5]`? However the prompt says `[2,4]`. That means they allow distributing their own initial deposit across all steps—they require initial B = max deficit seen **at the time**. Let's recalc:

Actually simulate:
- k=0: 'b'2 A→B: A=-2,B=2 → needA=2
- k=1: 'a'4 B→A: B=-2,A=2 → needB=2
- k=2: 'a'1 B→A: B=-3,A=3 → needB=3
- k=3: 'b'1 A→B: A=2,B=-2 → needB still=3
- k=4: 'a'2 B→A: B=-4,A=4 → needB=4

Thus `[2,4]`.  

---

### Complexity

- **Time:** O(N)  
- **Space:** O(1)  

Handles up to 100,000 transfers efficiently.
