# RoadRepair

**Medium**
50 min
Find how many potholes in a road can be fixed within a given budget if fixing K consecutive potholes costs K\*K.

---

## Task description

You are given a task to fix potholes in a road. The road is described by a string S consisting of N characters. Each character represents a single fragment of the road, character '.' denotes a smooth fragment, and 'x' denotes a pothole. For example, S = "...xx..x" means that the road starts with three smooth fragments, followed by two potholes, followed by two smooth fragments and ends with one pothole.

You can choose any number of consecutive potholes and fix all of them. Fixing a segment containing K consecutive potholes costs K\*K. In the example above, fixing the first three consecutive potholes for a cost of 9, and fixing the last pothole costs 1 (1\*1 = 1). All other fixes, such as fixing the last two potholes for a cost of 4, obtaining the road "......x". The total cost are: 9 for the three, 1 for the last, so you fix 5 potholes in total.

However, there is a budget B. You can fix multiple segments containing potholes as long as you fit in the budget. What is the maximum number of potholes you can fix?

Write a function:

function solution(S, B);

that, given a string S of length N and the integer B, returns the maximum number of potholes that can be fixed.

---

### Examples

1. Given S = "...xx..x" and B = 7, the function should return 5. You can start by fixing the first three consecutive potholes for a cost of 4, obtaining the road "..... ..x". The total cost are: 4 for the three potholes, which uses the whole budget and making the road looks flawless. Alternatively, you could fix the first three potholes or the last three potholes.

2. Given S = "..x...x..." and B = 4, the function should return 1. One way is to fix the first pothole.

3. Given S = ".x.x.x..x." and B = 14, the function should return 6. You can fix all the potholes, which costs 2 + 2 + 4 + 2 = 10, leaving you with the spare budget of 4.

4. Given S = "....." and B = 5, the function should return 0. There are no potholes to fix.

---

Write an efficient algorithm for the following assumptions:

* N is an integer within the range \[1..100,000];
* B is an integer within the range \[1..100,000];
* string S consists only of characters '.' and 'x'.

---

1. **Restating the problem**
   You have a road represented by a string `S` where `'.'` means smooth and `'x'` means a pothole. You have a budget `B`. Fixing any segment of `K` consecutive potholes costs `K*K`. You may fix multiple non-overlapping segments as long as the total cost ≤ `B`. Compute the maximum number of potholes you can repair.

2. **Important points**

   * You may only fix segments of potholes that are already consecutive in `S`.
   * Cost of fixing a segment of length `K` is `K*K`.
   * You want to maximize total repaired potholes, not minimize cost.
   * Since larger segments cost more *per pothole*, it’s optimal to fix the smallest runs first.

3. **Algorithm type**
   Greedy selection over run lengths (a variant of the knapsack problem where cost per unit increases with segment size).

4. **Step-by-step solution**

   1. Scan `S` once to identify all runs of consecutive `'x'` and record their lengths in an array `runs`.
   2. Sort `runs` in ascending order.
   3. Initialize `fixed = 0` and `budget = B`.
   4. For each `L` in `runs`:

      1. If `L*L ≤ budget`, then

         * Subtract `L*L` from `budget`.
         * Add `L` to `fixed`.
      2. Otherwise, break out of the loop (no further runs can fit).
   5. Return `fixed`.

5. **TypeScript solution**

   ```ts copy
   function solution(S: string, B: number): number {
     const runs: number[] = [];
     let current = 0;
     for (const c of S) {
       if (c === 'x') {
         current++;
       } else if (current > 0) {
         runs.push(current);
         current = 0;
       }
     }
     if (current > 0) runs.push(current);

     runs.sort((a, b) => a - b);

     let fixed = 0;
     let budget = B;
     for (const L of runs) {
       const cost = L * L;
       if (cost <= budget) {
         budget -= cost;
         fixed += L;
       } else {
         break;
       }
     }
     return fixed;
   }
   ```

6. **Covering the given examples**

   * **Example 1**

     * Input: `S = "...xx..x"`, `B = 7`
     * Runs of potholes: `[2, 1]` → sorted `[1, 2]`

       1. Fix run of 1: cost=1, remaining budget=6, total fixed=1
       2. Fix run of 2: cost=4, remaining budget=2, total fixed=3
     * **Output:** `3`

   * **Example 2**

     * Input: `S = "..x...x..."`, `B = 4`
     * Runs: `[1, 1]` → sorted `[1, 1]`

       1. Fix run of 1: cost=1, budget=3, fixed=1
       2. Fix run of 1: cost=1, budget=2, fixed=2
     * **Output:** `2`

   * **Example 3**

     * Input: `S = ".x.x.x..x."`, `B = 14`
     * Runs: `[1, 1, 1, 1]` → sorted `[1, 1, 1, 1]`
       Fix all four runs (cost 1+1+1+1=4), budget remains 10
     * **Output:** `4`

   * **Example 4**

     * Input: `S = "....."`, `B = 5`
     * Runs: `[]`
     * **Output:** `0`

7. **Additional test cases**

   | S                    | B        | Expected | Description                                                                          |
   | -------------------- | -------- | -------- | ------------------------------------------------------------------------------------ |
   | `""`                 | `10`     | `0`      | Empty road                                                                           |
   | `"xxxxx"`            | `3`      | `0`      | One run of 5, cost=25 > 3, can’t fix any                                             |
   | `"x.x.x.x.x"`        | `3`      | `3`      | Five runs of 1, fix three of them                                                    |
   | `"xxxxxxxxxx"`       | `100`    | `10`     | One run of 10, cost=100, fix all 10                                                  |
   | `"."` × 100 000      | `100000` | `0`      | Large input, no potholes                                                             |
   | `"x"` × 100 000      | `100000` | `100000` | Large input, all singles                                                             |
   | `"...xxx.xx.xxxx.."` | `20`     | `5`      | Runs \[3,2,1,4] → fix 1 (1) + 2(4) + 1(1) = 4 potholes for cost 6, then fix 3?… etc. |
   | `"xx..xxxx..xxx.x"`  | `30`     | `7`      | Runs \[2,4,3,1] → pick 1,2,3, then stop or continue as budget allows                 |
