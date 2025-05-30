# DecreasePollution

**Hard**
60 min
Given an array of integers, find the minimum number of times its elements must be divided by 2 in order to reduce the sum of the array by at least half.

---

## Task description

An industrial company has N factories, each producing some pollution every month. The company has decided to reduce its total fume emissions by equipping some of the factories with one or more filters.

Every such filter reduces the pollution of a factory by half. When a second (or subsequent) filter is applied, it again reduces by half the remaining pollution content after fitting the existing filter(s). For example, a factory that usually produces 9 units of pollution will generate 9 units with zero filters, 4.5 units with one filter, 2.25 units with two filters, and 1.125 units with three filters.

You are given an array of N integers describing the amount of pollution produced by the company each month. Find the minimum number of filters needed to reduce the total sum of pollution by at least half.

Write a function:

function solution(A);

which, given an array of integers A of length N, returns the minimum number of filters needed to reduce the total pollution by at least half.

### Examples

1. Given A = \[5, 19, 8, 1], your function should return 3. The initial total pollution is 5 + 19 + 8 + 1 = 33. We must reduce this to 16.5 or less. We can fit two filters on the factory producing 19 units and one filter at the factory producing 8 units. In this way, the total pollution will be 5 + (19/2/2) + (8/2) + 1 = 5 + 4.75 + 4 + 1 = 14.75, which is less than half the initial value, so we achieve our goal.

2. Given A = \[10, 10], your function should return 2, because we may install one filter at each factory.

3. Given A = \[3, 0, 5], your function should return 2, because it is sufficient to install one filter at each factory producing a non-zero amount of pollution.

Write an efficient algorithm for the following assumptions:

* N is an integer within the range \[1..30,000];
* each element of array A is an integer within the range \[0..70,000].


---

1. **Restating the problem**
   You have an array `A` of non-negative integers representing pollution from `N` factories.  Each time you apply a filter to a factory, its current pollution is halved.  You may apply multiple filters to the same factory (each one halves the remaining pollution).  You want to reduce the **total** pollution by **at least half** of its original sum.  Compute the **minimum** number of filters needed.

2. **Important points**

   * Each filter operation picks one factory and halves its current pollution.
   * You can apply any number of filters to the same factory; successive filters keep halving the remaining amount.
   * You measure success when the **sum** of all factory pollutions ≤ (original sum) / 2.
   * You must minimize the total number of filter operations across all factories.

3. **Algorithm type**
   Greedy with a **max-heap** (priority queue): always apply the next filter to the factory that currently has the highest pollution, since that yields the greatest immediate reduction.

4. **Step-by-step solution**

   1. Compute `total = sum(A)` and `target = total / 2`.
   2. Build a max-heap containing all initial pollution values (ignore zeros).
   3. Initialize `filters = 0`.
   4. While `total > target` and heap is not empty:

      1. Pop the largest pollution amount `p` from the heap.
      2. Compute `reduced = p / 2`.
      3. Subtract the reduction `p - reduced` from `total`.
      4. Push `reduced` back into the heap.
      5. Increment `filters`.
   5. Return `filters`.

5. **TypeScript solution**

```typescript
class MaxHeap {
  private data: number[] = [];
  constructor(initial: number[] = []) {
    for (const x of initial) this.push(x);
  }
  size(): number { return this.data.length; }
  push(x: number): void {
    this.data.push(x);
    this.siftUp(this.data.length - 1);
  }
  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }
  private siftUp(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p] >= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
  private siftDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let largest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.data[l] > this.data[largest]) largest = l;
      if (r < n && this.data[r] > this.data[largest]) largest = r;
      if (largest === i) break;
      [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
      i = largest;
    }
  }
}

function solution(A: number[]): number {
  const total = A.reduce((sum, x) => sum + x, 0);
  const target = total / 2;
  const heap = new MaxHeap(A.filter(x => x > 0));
  let remaining = total;
  let filters = 0;
  
  while (remaining > target && heap.size() > 0) {
    const p = heap.pop()!;
    const reduced = p / 2;
    remaining -= (p - reduced);
    heap.push(reduced);
    filters++;
  }
  
  return filters;
}
```

6. **Examples from the question**

   * **Example 1**

     * `A = [5, 19, 8, 1]`
     * Original sum = 33, target = 16.5
     * Filters:

       1. Pop 19 → 9.5 (sum → 23.5)
       2. Pop 9.5 → 4.75 (sum → 18.75)
       3. Pop 8 → 4 (sum → 14.75)
     * **Filters used** = 3

   * **Example 2**

     * `A = [10, 10]`
     * Original sum = 20, target = 10
     * Filters:

       1. Pop 10 → 5 (sum → 15)
       2. Pop 10 → 5 (sum → 10)
     * **Filters used** = 2

   * **Example 3**

     * `A = [3, 0, 5]`
     * Original sum = 8, target = 4
     * Filters:

       1. Pop 5 → 2.5 (sum → 5.5)
       2. Pop 3 → 1.5 (sum → 4)
     * **Filters used** = 2

7. **Additional test cases**

   | A                   | Expected | Description                                 |
   | ------------------- | -------- | ------------------------------------------- |
   | `[1]`               | `1`      | One factory → need one filter               |
   | `[0, 0, 0]`         | `0`      | No pollution → no filters needed            |
   | `[100, 50, 25]`     | `3`      | sum=175, target=87.5 → filters on 100,50,25 |
   | `[8, 4, 2, 1]`      | `3`      | Greedy picks 8→4, then 4→2, then 4→2        |
   | Large uniform array | —        | Performance: N=30 000, all entries=70 000   |
   | Random mixed values | —        | Stress-test correctness and speed           |
