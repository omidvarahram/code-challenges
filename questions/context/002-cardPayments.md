# CardPayments

**Easy**  
**40 min**

Given a list of transactions within one year, calculate the final balance of an account. Add a fee for each month that did not include at least three card payments for a total sum of at least 100.

---

## Task description

You are given a list of all the transactions on a bank account during the year 2020. The account was empty at the beginning of the year (the balance was 0).

Each transaction specifies the amount and the date it was executed. If the amount is negative (less than 0) then it was a card payment, otherwise it was an incoming transfer (amount at least 0). The date of each transaction is in YYYY-MM-DD format: for example, 2020-05-20 represents 20th May 2020.

Additionally, there is a fee for having a card (omitted in the given transaction list), which is 5 per month. This fee is deducted from the account balance at the end of each month unless there were at least three payments made by card for a total cost of at least 100 within that month.

Your task is to compute the final balance of the account at the end of the year 2020.

Write a function:

``` ts
function solution(A, D);
```

that, given an array A of N integers representing transaction amounts and an array D of N strings representing transaction dates, returns the final balance of the account at the end of the year 2020. Transaction number K (for K within the range [0..N−1]) was executed on the date represented by D[K] for amount A[K].

---

### Examples:

1. Given  
A = [100, 100, 100, -10]  
D = ["2020-12-31", "2020-12-22", "2020-12-03", "2020-12-29"]  
The function should return 230.  
Total income was equal to 100 + 100 + 100 − 10 = 290 and the fee was paid every month, so 290 − (5 * 12) = 230.

2. Given  
A = [180, -50, -25, -25]  
D = ["2020-01-01", "2020-01-01", "2020-01-01", "2020-01-31"]  
The function should return 25.  
The income was equal to 180, the expenditure was equal to 100 and the fee was applied in every month except January: 180 − 100 − (5 * 11) = 25.

3. Given  
A = [1, -1, 0, -105, 1]  
D = ["2020-12-31", "2020-04-04", "2020-04-04", "2020-04-14", "2020-07-12"]  
The function should return −164.  
The fee is paid every month. 1 + 1 + 0 − 105 + 1 = −102 − (5 * 12) = −164.  
Note that in April, even though the total cost of card payments was 106 (more than 100), there were only two payments made by card, so the fee was still applied. A transaction of value 0 is considered a positive, incoming transfer.

4. Given  
A = [100, 100, -10, -20, -30]  
D = ["2020-01-01", "2020-02-01", "2020-02-11", "2020-02-05", "2020-02-08"]  
The function should return 80.

5. Given  
A = [-60, 60, -40, -20]  
D = ["2020-10-01", "2020-02-02", "2020-10-10", "2020-10-30"]  
The function should return −115.

---

### Assume that:

- N is an integer within the range [1..100];
- each element of array A is an integer within the range [−1,000..1,000];
- D contains strings in YYYY–MM–DD format, representing dates in the range 2020–01–01 to 2020–12–31.

---

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.


# Task 2

## CardPayments

**Step-by-Step Explanation**

### Step 1: Understand the Problem
You are given:
- An array `A` of transaction amounts (negative = card payment, positive/zero = incoming).
- An array `D` of transaction dates.

Rules:
- You **start at 0** balance.
- Each **month**, if **fewer than 3 card payments** OR **total card payment < 100**, you incur a **fee of 5**.
- There are **12 months**, each needs to be evaluated.

---

### Step 2: Approach

1. Initialize `balance = 0`.
2. Loop through each transaction:
   - Add `A[i]` to the balance.
   - If it's a **card payment** (`A[i] < 0`), track it per month:
     - Extract month from `D[i]` as `'YYYY-MM'`.
     - Increment count and sum for that month.
3. Loop through all 12 months (`2020-01` to `2020-12`):
   - If that month **did not meet card criteria** (at least 3 payments and sum ≥ 100):
     - Subtract 5 from balance.

---

### Step 3: TypeScript Code

```ts copy
function solution(A: number[], D: string[]): number {
  let balance = 0;

  const cardStatsByMonth: Record<string, { count: number; sum: number }> = {};

  for (let i = 0; i < A.length; i++) {
    const amount = A[i];
    const date = D[i];
    const month = date.slice(0, 7); // "YYYY-MM"

    balance += amount;

    if (amount < 0) {
      if (!cardStatsByMonth[month]) {
        cardStatsByMonth[month] = { count: 0, sum: 0 };
      }
      cardStatsByMonth[month].count++;
      cardStatsByMonth[month].sum += -amount; // Convert to positive for sum
    }
  }

  for (let m = 1; m <= 12; m++) {
    const month = `2020-${m.toString().padStart(2, '0')}`;
    const stats = cardStatsByMonth[month];

    if (!stats || stats.count < 3 || stats.sum < 100) {
      balance -= 5;
    }
  }

  return balance;
}
```

---

### Step 4: Example Walkthrough

**Input:**
- A = [180, -50, -25, -25]
- D = ["2020-01-01", "2020-01-01", "2020-01-01", "2020-01-31"]

**Transactions:**
- Jan has 3 card payments: -50, -25, -25 → sum = 100
- No fee for Jan; fee applies to other 11 months → 11 * 5 = 55

**Final balance:**
- 180 − 100 − 55 = **25**

---

### Step 5: Time & Space Complexity

- **Time:** O(N + 12) = O(N)
- **Space:** O(12) = O(1) constant extra space (at most 12 months)

Correct and efficient for up to 100 transactions.
