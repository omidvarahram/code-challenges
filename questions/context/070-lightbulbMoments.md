# LightbulbMoments

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

There are `N` bulbs numbered from 1 to N, arranged in a row.  
- The first bulb is plugged into the power socket.
- Each successive bulb is connected to the previous one.  
So the second bulb lights up only if the first is on, the third bulb only if the second is on, and so on.

Initially, all the bulbs are **turned off**.  
At moment `K` (from 0 to N−1), we turn on the bulb `A[K]`.  
A bulb shines if:
- it is **on**, **and**
- **all previous bulbs** are also **on**

---

## Goal

Write a function:

```
function solution(A: number[]): number;
```

that, given an array `A` of distinct integers from `1` to `N`, returns the **number of moments** when **every turned-on bulb shines**.

---

## Examples

### Example 1:

```
A = [2, 1, 3, 5, 4]

Moment 0 → turn on 2 → only 2 is on → does not shine  
Moment 1 → turn on 1 → bulbs 1 and 2 are on → both shine  
Moment 2 → turn on 3 → bulbs 1, 2, 3 are on → all shine  
Moment 3 → turn on 5 → bulb 4 still off → not all shine  
Moment 4 → turn on 4 → bulbs 1–5 all on → all shine  

Output: 3
```

### Example 2:

```
A = [2, 3, 4, 1, 5] → Output: 2  
(Moments 4 and 1 are when all bulbs on so far are also shining)
```

### Example 3:

```
A = [1, 2, 3, 4, 5] → Output: 5  
All moments result in bulbs shining.
```

---

## Assumptions

- `N` is an integer in range `[1..100,000]`
- The elements of array `A` are **distinct**
- Each element of array `A` is an integer in the range `[1..N]`

---

Write an **efficient algorithm** for the constraints above.


1. **Restate the question in clear language**
   Given a sequence in which bulbs numbered 1..N are turned on one at a time, count the number of moments when **every turned-on bulb so far shines** (which means bulbs 1 to the highest turned-on number so far are all on).

2. **Important points**

   * A bulb “shines” if it and all previous bulbs are on.
   * At any moment, all bulbs turned on so far will shine **iff** all bulbs from 1 up to the maximum turned-on bulb are on.
   * This happens if the number of bulbs turned on so far equals the highest-numbered bulb turned on so far.

3. **Algorithm type**

   * Simple single-pass, O(N).

4. **Step-by-step solution**

   1. Iterate through the sequence.
   2. Track two values: `maxBulb` (the largest bulb number turned on so far) and `onCount` (how many bulbs have been turned on so far).
   3. For each bulb switched on:

      * Increment `onCount`.
      * Update `maxBulb` if needed.
      * If `onCount === maxBulb`, increment the answer.

5. **TypeScript solution**

   ```ts copy
   function solution(A: number[]): number {
     let moments = 0;
     let maxBulb = 0;
     let onCount = 0;
     for (let i = 0; i < A.length; i++) {
       onCount++;
       if (A[i] > maxBulb) maxBulb = A[i];
       if (onCount === maxBulb) moments++;
     }
     return moments;
   }
   ```

6. **Examples from the question**

   * `[2, 1, 3, 5, 4]`:
     Moments when all on bulbs shine: after moments 1, 2, and 4 ⇒ output: **3**
   * `[2, 3, 4, 1, 5]`:
     Moments 1 (after turning on 3) and 4 (after turning on 5) ⇒ output: **2**
   * `[1, 2, 3, 4, 5]`:
     All moments shine ⇒ output: **5**

7. **Additional test cases**

   | A            | Output | Notes                        |
   | ------------ | ------ | ---------------------------- |
   | \[1]         | 1      | Only one bulb, always shines |
   | \[2,3,4,5,1] | 1      | Only last moment all shine   |
   | \[5,4,3,2,1] | 1      | Only last moment all shine   |
   | \[1,3,2,4,5] | 3      | Moments 0, 2, 4              |

