# PriceFluctuation

**Medium**  
**40 min**  
For a historical record of assets values, calculate the maximum income you could have made.

---

## Task description

You are given a record of the historical prices of an investment asset from the last N days.  
Analyze the record in order to calculate what could have been your maximum income.  
Assume you started with one asset of this type and could hold at most one at a time.  
You could choose to sell the asset whenever you held one.  
If you did not hold an asset at some moment, you could always afford to buy an asset (assume you had infinite money available).

**What is the maximum income you could make?**

---

## Write a function:

```ts
function solution(A);
```

that, given an array A of length N representing a record of prices over the last N days,  
returns the maximum income you could make.  
As the result may be large, return its last nine digits without leading zeros (i.e. return the result modulo 1,000,000,000).

---

## Examples:

1. Given `A = [4, 1, 2, 3]`, the function should return `6`.  
   You could sell the product on the first day (for 4), buy it on the second (for 1) and sell it again on the last day (for 3).  
   The income would be equal to 4 - 1 + 3 = **6**.

2. Given `A = [1, 2, 3, 3, 2, 1, 5]`, the function should return `7`.  
   You could sell the product when its value was 3, buy it when it changed to 1, and sell it again when it was worth 5.  
   Total income: 3 - 1 + 5 = **7**.

3. Given `A = [1000000000, 1, 2, 2, 1000000000, 1, 1000000000]`, the function should return `999999998`.  
   The maximum possible income is 2999999998, whose last 9 digits are **999999998**.

---

## Write an efficient algorithm for the following assumptions:

- `N` is an integer within the range [1..200,000];
- each element of array `A` is an integer within the range [0..1,000,000,000].


## PriceFluctuation

**Step-by-Step Explanation**

### 1. Problem Restatement

You start with **one** unit of the asset at day 0 and can hold at most one unit at a time. You may sell your holding on any day (gaining the day’s price) and, when you hold none, buy at any later day (spending the day’s price). You have infinite cash to buy, and you begin with one unit. Compute the **maximum total income** (sum of all sells minus sum of all buys), then return its last nine digits (i.e. modulo 1,000,000,000).

### 2. Key Insight

* On day 0 you hold one unit, so you can **sell** immediately at price A\[0], earning `A[0]`.
* After that, every time the price **rises** from `A[i−1]` to `A[i]`, you could have bought at `A[i−1]` and sold at `A[i]`, earning `A[i]−A[i−1]`.
* Whenever it falls or stays flat, you refrain from trading.
* Summing these realizable gains gives the maximum income:

  $$
    \text{income}
    = A[0] \;+\; \sum_{i=1}^{N-1} \max\bigl(0,\,A[i] - A[i-1]\bigr).
  $$

### 3. Modular Arithmetic

Since the result may be large, we take all additions modulo $10^9$. (No need to mod individual prices, only the running sum.)

---

```ts
function solution(A: number[]): number {
  const MOD = 1_000_000_000;
  const N = A.length;
  let income = A[0] % MOD;

  for (let i = 1; i < N; i++) {
    const diff = A[i] - A[i - 1];
    if (diff > 0) {
      income = (income + diff) % MOD;
    }
  }

  return income;
}
```

**Explanation of Code**

1. Initialize `income` with the sale on day 0 (`A[0]`).
2. Loop days 1 through $N-1$, and whenever price `A[i]` exceeds `A[i-1]`, add the difference to `income`.
3. After each addition, reduce `income` modulo $10^9$.
4. Return the final `income`.
