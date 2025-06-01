# PassTheMessage

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

There are `N` people, numbered from `0` to `N-1`, playing a game.  
- The `K`-th person is assigned the letter `S[K]`.

At the beginning:
- The 0th person sends a message (a single letter `S[0]`) to `A[0]` (the first person in the chain).

From that point:
- When the `K`-th person receives the message, they **append** their letter `S[K]` to it and **forward it** to the next person `A[K]`.

The game ends when the 0th person receives the message back.  
Your task is to return the **final message** received by the 0th person.

---

## Function signature

```
function solution(S: string, A: number[]): string;
```

---

## Examples

1. `S = "code"`  
   `A = [2, 0, 1, 0]`  
   - 0 → sends "c" to 2  
   - 2 → appends "d" → "cd", sends to 1  
   - 1 → appends "o" → "cdo", sends to 0  

   Output: `"cdo"`

2. `S = "centipede"`  
   `A = [5, 2, 0, 1, 6, 4, 8, 3, 7]`  
   Output: `"centipede"`

3. `S = "brtdyq"`  
   `A = [4, 0, 3, 1, 2, 5]`  
   - Not all letters are used  
   Output: `"bqt"`

---

## Assumptions

- `N` is an integer in range `[1..1000]`
- `S` is a string of **lowercase English letters** of length `N`
- `A` contains all integers in range `[0..N−1]`
- `A` has a **loop** that ends at index `0`

---

In your solution, **focus on correctness**. Performance is not the focus of assessment.


1. **Restate the question in clear language**
   You have `N` people in a message chain, each with a letter. Starting at person 0, you follow the path described by array `A` (starting with `A[0]`, then at each step using `A[K]` as the next index) and build a string by appending each person’s letter in turn. The process ends when the message returns to person 0.

2. **Important points**

   * The message path starts at 0, then goes to `A[0]`, then `A[A[0]]`, and so on, until it comes back to 0.
   * Each person appends their letter once; you stop before looping again at 0.

3. **Algorithm type**

   * Simulation using a visited set to prevent infinite loops.

4. **Step-by-step solution**

   1. Start with the letter at index 0.
   2. Move to `A[0]`, then follow `A` recursively/appending letters.
   3. Stop when you return to 0.

5. **TypeScript solution**

   ```ts copy
   function solution(S: string, A: number[]): string {
     let result = S[0];
     let idx = A[0];
     while (idx !== 0) {
       result += S[idx];
       idx = A[idx];
     }
     return result;
   }
   ```

6. **Examples from the question**

   * `"code", [2,0,1,0]`
     Path: 0 → 2 → 1 → 0
     Letters: c → d → o → returns to 0
     Output: **"cdo"**
   * `"centipede", [5,2,0,1,6,4,8,3,7]`
     Path: 0 → 5 → 4 → 6 → 8 → 7 → 3 → 1 → 2 → 0
     Output: **"centipede"**
   * `"brtdyq", [4,0,3,1,2,5]`
     Path: 0 → 4 → 2 → 3 → 1 → 0
     Output: **"bqt"**

7. **Additional test cases**

   | S               | A | Output | Notes           |
   | --------------- | - | ------ | --------------- |
   | "a", \[0]       |   | "a"    | Only one person |
   | "abc", \[2,0,1] |   | "ac"   | path: 0→2→1→0   |
   | "xyz", \[0,2,1] |   | "x"    | 0→0, no others  |

**Summary:**

* Simulate the path, appending letters, until you return to the start.
* Stop at the first return to 0.
