# FinancialPlan

**Hard**  
**60 min**  
How many expenses must be rescheduled to the end of the year so that the company doesn’t fall into debt?

---

## Task description

A company has a list of expected revenues and payments for the upcoming year in chronological order. The problem is that at some moments in time the sum of previous payments can be larger than the total previous revenue. This would put the company in debt. To avoid this problem the company takes a very simple approach. It reschedules some expenses to the end of the year.

You are given an array of integers, where positive numbers represent revenues and negative numbers represent expenses, all in chronological order. In one move you can relocate any negative number (an expense) to the end of the array. What is the minimum number of such relocations to make sure that the company never falls into debt? In other words, you need to make sure that there is no consecutive sequence of elements starting from the beginning of the array, that sums up to a negative number.

You can assume that the sum of all elements in A is nonnegative.

Write a function:

```typescript
function solution(A);
```

that, given an array A of N integers, returns the minimum number of relocations so that the company never falls into debt.

### Examples

1. Given A = [10, -10, -1, 10], the function should return 1. It is enough to move -10 to the end of the array.

2. Given A = [-1, -1, 1, 1, 1, 1], the function should return 2. The negative elements at the beginning must be moved to the end to avoid debt at the start of the year.

3. Given A = [5, -2, 3, -1], the function should return 0. The company balance is always nonnegative.

---

Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- Each element of array A is an integer within the range [-1,000,000,000..1,000,000,000];
- Sum of all elements in A is greater than or equal to 0.


1. **Restating the problem**
   You have an array of revenues and expenses (`A`). At any time, the sum of the array from the start up to that point (prefix sum) must never go below zero. You may “reschedule” (move to the end) any negative number (expense) to avoid going negative. What’s the **minimum number** of moves needed to guarantee you never go into debt at any point?

2. **Important points**

   * Only **negative numbers** can be moved, and each move places the element at the very end (order among moved elements doesn’t matter).
   * You want to minimize the number of such moves.
   * All prefix sums must be ≥ 0 after the moves.
   * The sum of all values is guaranteed to be nonnegative, so there’s always a solution.

3. **Algorithm type**
   Greedy + min-heap (priority queue).

4. **Step-by-step solution**

   * Iterate through the array, maintaining a running `prefixSum`.
   * Each time you encounter a negative value, push it (as a positive value for max-heap or as is for min-heap) onto a heap of negative numbers included so far.
   * If at any point `prefixSum` drops below zero, pop the **most negative** expense encountered so far and “remove” it from the prefix sum (simulating moving it to the end). Increment the relocation counter.
   * Repeat until the prefix sum is nonnegative at every step.

5. **TypeScript solution**

   ```ts copy
   // Min-heap for negative expenses
   class MinHeap {
     private data: number[] = [];
     push(x: number) {
       this.data.push(x);
       let i = this.data.length - 1;
       while (i > 0) {
         const p = (i - 1) >> 1;
         if (this.data[p] <= this.data[i]) break;
         [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
         i = p;
       }
     }
     pop(): number {
       const ret = this.data[0];
       const last = this.data.pop()!;
       if (this.data.length > 0) {
         this.data[0] = last;
         let i = 0, n = this.data.length;
         while (true) {
           let left = 2 * i + 1, right = 2 * i + 2, smallest = i;
           if (left < n && this.data[left] < this.data[smallest]) smallest = left;
           if (right < n && this.data[right] < this.data[smallest]) smallest = right;
           if (smallest === i) break;
           [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
           i = smallest;
         }
       }
       return ret;
     }
     size() { return this.data.length; }
   }

   function solution(A: number[]): number {
     let relocations = 0;
     let prefixSum = 0;
     const minHeap = new MinHeap();

     for (let i = 0; i < A.length; i++) {
       prefixSum += A[i];
       if (A[i] < 0) {
         minHeap.push(A[i]);
       }
       while (prefixSum < 0 && minHeap.size() > 0) {
         // Remove the most negative expense
         const minNeg = minHeap.pop();
         prefixSum -= minNeg; // Remove its negative effect
         relocations++;
       }
     }
     return relocations;
   }
   ```

6. **Covering the given examples**

   * `[10, -10, -1, 10]`

     * prefix: 10, 0, -1 → needs one relocation
   * `[-1, -1, 1, 1, 1, 1]`

     * prefix: -1, -2 → needs two relocations
   * `[5, -2, 3, -1]`

     * prefix: 5, 3, 6, 5 → never negative, needs 0 relocations

7. **Additional test cases**

   | A                                        | Output | Notes                                           |
   | ---------------------------------------- | ------ | ----------------------------------------------- |
   | `[1, 2, 3, 4, 5]`                        | 0      | All positive, no relocations needed             |
   | `[-3, 3, -2, 2, -1, 1]`                  | 1      | Remove -3 from front for positive prefix sums   |
   | `[-10, 10, -10, 10, -10, 10]`            | 2      | Remove two -10’s to avoid prefix going negative |
   | `[-1, -2, -3, 6]`                        | 2      | Remove -1, -2 to avoid negative prefix sum      |
   | `[0, 0, 0, 0]`                           | 0      | No expenses, nothing to move                    |
   | `[1000000, -1000000, -1000000, 1000000]` | 1      | Large values, test performance                  |

This greedy heap solution runs in O(N log N) time, suitable for N up to 100,000.
