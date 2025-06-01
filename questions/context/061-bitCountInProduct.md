# BitCountInProduct

**Programming language:** TypeScript  

---

## Task description

Write a function:

```
function solution(A: number, B: number): number;
```

that, given two non-negative integers `A` and `B`, returns the **number of bits set to 1** in the binary representation of the number `A * B`.

For example, given `A = 3` and `B = 7`, the function should return `3`, because the binary representation of `A * B = 3 * 7 = 21` is `10101`, and it contains three bits set to 1.

### Assume that:

- A and B are integers within the range [0..100,000]

---

In your solution, focus on **correctness**. The performance of your solution will not be the focus of the assessment.


1. **Restate the question in clear language**
   Given two non-negative integers `A` and `B`, return the count of `1` bits in the binary representation of their product (`A * B`).

2. **Important points**

   * You must compute `A * B` first, then count the `1`s in its binary representation.
   * Input range is small, so simple methods are acceptable.

3. **Algorithm type**

   * Basic arithmetic and bit manipulation.

4. **Step-by-step solution**

   1. Compute `product = A * B`.
   2. Convert `product` to binary.
   3. Count the number of `'1'` bits.

5. **TypeScript solution**

   ```ts copy
   function solution(A: number, B: number): number {
     const product = A * B;
     
     return product.toString(2).split('').filter(ch => ch === '1').length;
   }
   ```

6. **Covering the example in the question**

   * `A = 3`, `B = 7` → `product = 21` → binary: `10101` → three `1` bits → output: **3**

7. **Additional test cases**

   | A      | B      | Product     | Binary                              | Expected |
   | ------ | ------ | ----------- | ----------------------------------- | -------- |
   | 0      | 0      | 0           | `0`                                 | 0        |
   | 0      | 100    | 0           | `0`                                 | 0        |
   | 1      | 1      | 1           | `1`                                 | 1        |
   | 5      | 5      | 25          | `11001`                             | 3        |
   | 12345  | 1      | 12345       | `11000000111001`                    | 6        |
   | 100000 | 100000 | 10000000000 | `100101010000001011111001000000000` | 9        |
   | 2      | 8      | 16          | `10000`                             | 1        |
