# EqualPairs

**Programming language:** TypeScript
**Language:** English

## Task description

You are given an array of integers. Your task is to create pairs of them, such that every pair consists of equal numbers.
Each array element may belong to one pair only.

Is it possible to use all of the integers?

### Function signature

function solution(A: number\[]): boolean;

Given an array `A` consisting of `N` integers, return whether it is possible to split **all** integers into **pairs**.

## Examples

1. Given `A = [1, 2, 2, 1]`
   Return: `true`
   Pairs: \[A\[0], A\[3]] → both 1, and \[A\[1], A\[2]] → both 2

2. Given `A = [7, 7, 7]`
   Return: `false`
   You can form one pair of 7s, but one 7 remains unpaired.

3. Given `A = [1, 2, 2, 3]`
   Return: `false`
   No element to pair with A\[0] (value 1).

## Constraints

* `N` is an integer within the range `[1..100,000]`
* Each element of array `A` is an integer within the range `[-1,000,000,000..1,000,000,000]`

Write an efficient algorithm for the above assumptions. Focus on **correctness**. Performance is not the main evaluation criteria.


1. **Restate the question in clear language**
   Given an array of integers, can you group all elements into pairs of equal numbers (each number used in exactly one pair)?

2. **Important points**

   * Each number must appear an even number of times to be paired off completely.
   * If any number appears an odd number of times, it is impossible to pair them all.

3. **Algorithm type**

   * Frequency count and parity check.

4. **Step-by-step solution**

   1. Use a `Map<number, number>` to count occurrences of each number.
   2. For each value in the map, check if its count is odd. If so, return `false`.
   3. If all counts are even, return `true`.

5. **TypeScript solution**

   ```ts copy
   function solution(A: number[]): boolean {
     const counts = new Map<number, number>();
     for (const num of A) {
       counts.set(num, (counts.get(num) || 0) + 1);
     }
     for (const count of counts.values()) {
       if (count % 2 !== 0) {
         return false;
       }
     }
     return true;
   }
   ```

6. **Examples from the question**

   * `A = [1, 2, 2, 1]` → counts: {1:2, 2:2} → all even → **true**
   * `A = [7, 7, 7]` → counts: {7:3} → odd → **false**
   * `A = [1, 2, 2, 3]` → counts: {1:1, 2:2, 3:1} → 1 and 3 are odd → **false**

7. **Additional test cases**

   | A                      | Output | Reason                           |
   | ---------------------- | ------ | -------------------------------- |
   | `[4, 4, 4, 4]`         | true   | 4 appears 4 times                |
   | `[1]`                  | false  | single element, cannot be paired |
   | `[-2, -2, 3, 3]`       | true   | negative numbers work too        |
   | `[10, 20, 10, 20, 30]` | false  | 30 occurs once                   |
   | `[0, 0, 0, 0, 0, 0]`   | true   | 0 appears 6 times                |
