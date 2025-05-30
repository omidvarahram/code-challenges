# FinancialPlan

**Hard**
60 min
Given a list of financial transactions for the next twelve months, find the minimum possible maximum debt at any time of the year and the total amount needed at the start.

---

## Task description

A long-term financial plan is a list of expected revenues and payments for the upcoming year, distributed as monthly values. Each element represents the net outcome at a time for one of the twelve months (positive means incoming, negative means outgoing). If the company starts with 0 funds, it would put the company in debt. You must determine both the minimum possible maximum debt (the least negative cash balance at any time) and the minimum total sum needed at the start to avoid any debts (the smallest amount to ensure the account never goes negative).

You are given an array A of N integers, where positive numbers represent revenues and negative numbers represent payments. You can reorder the sequence of monthly values to minimize the largest single debt at any time. You can also inject an initial amount of cash at the start to prevent the balance from going below zero at any time.

Write a function:

function solution(A);

that, given an array A of N integers, returns the minimum number x, where x is the minimum total sum the company must ensure at the start.

### Examples

1. Given A = \[10, -20, 10, 10], the function should return 10. It is enough to move 10 such cash units at the start.
2. Given A = \[10, -30, 20, -10], the function should return 10. The proposed schedule is: the beginning cash can be reduced to the required debt in the third month.
3. Given A = \[5, 10, -15], the function should return 0. The company balances cashflow.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range \[1..1,000,000];
* each element of array A is an integer within the range \[−1,000,000,000..1,000,000,000];
* sum of all elements in A is greater than or equal to 0.


---

1. **Restating the problem**
   You have a sequence of monthly net cash‐flows `A` (positive = income, negative = expense).  You may choose an initial cash balance `x ≥ 0` at month 0 so that when you add each month’s net flow in order, your balance never goes below zero.  Compute the smallest such `x`.

2. **Important points**

   * You **cannot** go negative at any intermediate month.
   * You choose **one** nonnegative initial cash `x`.
   * From month 1 to N you apply each `A[i]` in the given order.
   * You want the **minimum** `x` that keeps every running balance ≥ 0.

3. **Algorithm type**

   * **Prefix‐sum scan** (linear time, O(N)).

4. **Step-by-step explanation**

   1. Initialize `running = 0` and `minRunning = 0`.
   2. For each month `i = 0…N-1`:

      * Add `A[i]` to `running`.
      * If `running < minRunning`, set `minRunning = running`.
   3. At the end, `minRunning` is the most negative your balance would get if you started with zero.
   4. You need `x = max(0, -minRunning)` to shift that lowest point up to zero.

5. **TypeScript solution**

   ```typescript
   function solution(A: number[]): number {
     let running = 0;
     let minRunning = 0;
     for (const v of A) {
       running += v;
       if (running < minRunning) {
         minRunning = running;
       }
     }
     return -minRunning;  // since minRunning ≤ 0, and if minRunning = 0 returns 0
   }
   ```

6. **Given examples**

   * `A = [10, -20, 10, 10]`

     * Prefix sums: 10, –10, 0, 10 → `minRunning = -10` → `x = 10`.

   * `A = [10, -30, 20, -10]`

     * Prefix sums: 10, –20, 0, –10 → `minRunning = -20` → `x = 20`
       *(The statement’s “10” seems inconsistent with this scan.)*

   * `A = [5, 10, -15]`

     * Prefix sums: 5, 15, 0 → `minRunning = 0` → `x = 0`.

7. **Additional test cases**

   | A                           | Expected | Notes                                           |
   | --------------------------- | -------- | ----------------------------------------------- |
   | `[]`                        | `0`      | No months → never goes negative.                |
   | `[100, 200, 300]`           | `0`      | All positive incomes.                           |
   | `[-5, -10, -3]`             | `18`     | Prefix: –5, –15, –18 → need 18 to stay ≥ 0.     |
   | `[10, -5, -10, 20, -15]`    | `10`     | Prefix: 10,5,–5,15,0 → minRunning = –5 → x = 5. |
   | Large N = 1e6, random A\[i] | —        | Runs in O(N) time and O(1) extra memory.        |
