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


# AngleBrackets

**Hard**
60 min
Find the maximum possible length of a symmetric fragment which can be obtained after replacing question marks in a given string with '<' or '>'.

---

## Task description

A string made of an even number of characters ('<' and/or '>') is called symmetric if all characters in its first half are '<' and all characters in its second half '>'. Example of symmetric strings are: "" (empty string), "<>", "<<>>", "<<<>>>", etc.

Write a function:

function solution(S);

that, given a string S made of N characters ('<', '>', and/or '?'), returns the length of the longest symmetric substring that can be obtained after replacing question marks with '<' or '>' characters.

### Examples

1. For S = "<?>??><", after replacing all question marks with '<', the string "<<>>" is obtained. Its longest symmetric substring is "<<>>", so the function should return 4.

2. For S = "??<???>", the optimal option is to replace the first three question marks with '<' and the next three question marks with '>', thus obtaining the string "<<<>>>". The function should return 6.

3. For S = "<<>", the function should return 2.

Write an efficient algorithm for the following assumptions:

* the length of string S is within the range \[1..200,000];
* string S is made only of the following characters: '<', '>', and/or '?'.

---

# DecreasePollution

1. **Explain the question in more readable language**
   You have `N` factories each emitting some pollution (given by array `A`).  Each time you install a filter on a factory, its current pollution is halved.  You can apply multiple filters to the same factory (each one halves whatever remains).  Your goal is to reduce the **total** pollution by at least **half** of its original sum, using as few filters as possible.

2. **Important points**

   * A filter picks the factory with the highest current pollution to maximize the immediate reduction.
   * After each filter, that factory’s pollution is updated to half its previous value and may still be the best candidate for the next filter.
   * You stop once the running total ≤ (original total) / 2.

3. **Algorithm type**
   Greedy with a **max-heap** (priority queue) to always reduce the largest emission next.

4. **Step-by-step explanation**

   1. Compute `total = sum(A)` and `target = total / 2`.
   2. Build a max-heap containing all positive values in `A` (zero emissions can be ignored).
   3. Initialize `filters = 0`, `remaining = total`.
   4. While `remaining > target`:

      1. Pop the largest emission `p` from the heap.
      2. Compute `halved = p / 2`.
      3. Subtract the reduction `(p - halved)` from `remaining`.
      4. Push `halved` back into the heap.
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
       const halved = p / 2;
       remaining -= (p - halved);
       heap.push(halved);
       filters++;
     }
     
     return filters;
   }
   ```

6. **Cover the given examples**

   * **A = \[5, 19, 8, 1]**

     * Original sum = 33, target = 16.5.
     * Filters: 19→9.5 (sum→23.5), 9.5→4.75 (sum→18.75), 8→4 (sum→14.75).
     * **Result:** 3
   * **A = \[10, 10]**

     * Original sum = 20, target = 10.
     * Filters: each 10→5 twice (sum→10).
     * **Result:** 2
   * **A = \[3, 0, 5]**

     * Original sum = 8, target = 4.
     * Filters: 5→2.5 (sum→5.5), 3→1.5 (sum→4).
     * **Result:** 2

7. **Additional test cases**

   | A                          | Expected | Description                                |
   | -------------------------- | -------- | ------------------------------------------ |
   | `[1]`                      | `1`      | Single factory must be halved once.        |
   | `[0,0,0]`                  | `0`      | No pollution → no filters needed.          |
   | `[100,50,25]`              | `3`      | sum=175→87.5 target; filters on 100,50,25. |
   | `[8,4,2,1]`                | `3`      | 8→4, then 4→2, then remaining 4→2.         |
   | Uniform size 70 000×30 000 | —        | Performance: worst-case heap ops.          |

---

# AngleBrackets

1. **Explain the question in more readable language**
   You have a string `S` of length `N` containing `'<'`, `'>'`, and `'?'`.  You may replace each `'?'` with either `'<'` or `'>'`.  A substring is **symmetric** if it has even length `2k`, its first `k` characters are all `'<'` and its last `k` characters are all `'>'`.  Find the length of the longest symmetric substring you can obtain after optimally replacing the question marks.

2. **Important points**

   * Only **even-length** substrings can be symmetric.
   * In the chosen substring of length `2k`, the **left half** must contain **no** `'>'` (only `'<'` or `'?'`), and the **right half** must contain **no** `'<'` (only `'>'` or `'?'`).
   * You can test each candidate substring in O(1) time by using prefix sums for counts of `'<'` and `'>'`.
   * Use a binary search over possible lengths `2k` to achieve O(N log N) overall.

3. **Algorithm type**
   Binary search + sliding-window checks using **prefix sums**.

4. **Step-by-step explanation**

   1. Let `n = S.length`.  Build two arrays:

      * `prefGreater[i] =` number of `'>'` in `S[0..i-1]`.
      * `prefLess[i]    =` number of `'<'` in `S[0..i-1]`.
   2. Define a function `can(len: number): boolean` that checks if there is any substring of length `len` that can be made symmetric:

      * Let `half = len/2`.
      * For each start index `i` from `0` to `n - len`:

        1. `mid = i + half`, `end = i + len`.
        2. Check left half `S[i..mid-1]` has no `'>'`:
           `prefGreater[mid] - prefGreater[i] === 0`.
        3. Check right half `S[mid..end-1]` has no `'<'`:
           `prefLess[end] - prefLess[mid] === 0`.
        4. If both hold, return `true`.
      * Return `false` if none work.
   3. Binary-search the maximum `k` in `[0..⌊n/2⌋]` for which `can(2*k)` is `true`.  The answer is `2*k`.

5. **TypeScript solution**

   ```typescript
   function solution(S: string): number {
     const n = S.length;
     const prefGreater = new Uint32Array(n + 1);
     const prefLess    = new Uint32Array(n + 1);
     for (let i = 0; i < n; i++) {
       prefGreater[i + 1] = prefGreater[i] + (S[i] === '>' ? 1 : 0);
       prefLess   [i + 1] = prefLess   [i] + (S[i] === '<' ? 1 : 0);
     }
     function can(len: number): boolean {
       const half = len >> 1;
       for (let i = 0; i + len <= n; i++) {
         const mid = i + half, end = i + len;
         if (prefGreater[mid] - prefGreater[i] === 0
          && prefLess   [end] - prefLess   [mid] === 0) {
           return true;
         }
       }
       return false;
     }
     let low = 0, high = Math.floor(n / 2);
     while (low < high) {
       const midK = Math.ceil((low + high + 1) / 2);
       if (can(midK * 2)) low = midK;
       else             high = midK - 1;
     }
     return low * 2;
   }
   ```

6. **Cover the given examples**

   * **S = "<?>??><"** → can(6)? No → can(4)? Yes → **4** (`"<<>>"`).
   * **S = "??<???>"** → can(6)? Yes → **6** (`"<<<>>>"`).
   * **S = "<<>"** → can(2)? Yes at positions \[1,2] → **2**.

7. **Additional test cases**

   | S                     | Expected | Notes                                    |
   | --------------------- | -------- | ---------------------------------------- |
   | `"????"`              | `4`      | All can be made `"<<>>"`.                |
   | `"><><"`              | `0`      | No even-length valid segment.            |
   | `"<><<>>?"`           | `4`      | Best is `"<<>>"`.                        |
   | `"<<<<<<<<>>>>>>"`    | `14`     | Already `7 '<'` + `7 '>'`.               |
   | Random length 200 000 | —        | Performance test for O(N log N).         |
   | `"<"?><?<>>?<?>"`     | —        | Mixed chars and `?`, verify correctness. |

