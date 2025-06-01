# TwiceDigitSum

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

Write a function:

```
function solution(N: number): number;
```

that, given an integer `N`, returns the **smallest integer greater than N** such that the **sum of its digits is twice as big** as the sum of digits of `N`.

---

## Examples

1. Given `N = 14`, the function should return `19`.  
   - sum of digits of 14 = 1 + 4 = 5  
   - sum of digits of 19 = 1 + 9 = 10 → which is twice as big as 5

2. Given `N = 10`, the function should return `11`.

3. Given `N = 99`, the function should return `108`.

---

## Assumptions

- `N` is an integer within the range `[1..1,000,000]`

---

In your solution, focus on **correctness**. The performance of your solution will not be the focus of the assessment.



```ts copy
function digitSum(x: number): number {
  let sum = 0;
  while (x > 0) {
    sum += x % 10;
    x = Math.floor(x / 10);
  }
  return sum;
}

function solution(N: number): number {
  const sumN = digitSum(N);
  const targetSum = 2 * sumN;
  let candidate = N + 1;
  
  const maxTries = 100 * N + 1000;

  for (let tries = 0; tries < maxTries; tries++, candidate++) {
    if (digitSum(candidate) === targetSum) {
      return candidate;
    }
  }
  // Should never reach here due to problem constraints.
  throw new Error("No solution found within reasonable range.");
}
```

This uses a `for` loop with a safe upper bound instead of `while(true)`. For all reasonable cases, this will always return the correct answer.
