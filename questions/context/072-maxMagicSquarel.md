# MaxMagicSquare

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

A **magic square** of size `K` is a `K × K` square grid filled with integers such that:
- the sum of the integers in **each row**, **each column**, and **both diagonals** is the same.

---

### Example (3×3 Magic Square):

```
7  3  8
7  6  5
4  9  5
```

- Top row sum: 7 + 3 + 8 = 18  
- Last column sum: 8 + 5 + 5 = 18  
- Main diagonal sum: 7 + 6 + 5 = 18  
- Other diagonal sum: 8 + 6 + 4 = 18  
- All rows, columns, and both diagonals sum to 18.

---

## Function signature

```
function solution(A: number[][]): number;
```

Given a matrix `A` consisting of `N` rows and `M` columns, return the **size of the largest magic square** that can be found within this matrix.

---

## Notes

- Integers in the magic square **do not need to be distinct**.
- Every square of size `1` is considered magic.

---

## Examples

### Example 1:

```
Input:
A = [
  [1, 2, 3, 5, 4],
  [2, 3, 7, 5, 3],
  [7, 3, 8, 5, 4],
  [7, 6, 5, 5, 5]
]

Output: 3  
(3×3 square with all row/col/diagonal sums = 18)
```

### Example 2:

```
Input:
A = [
  [1, 2, 2, 2],
  [2, 2, 2, 2],
  [2, 2, 2, 2]
]

Output: 2  
(All sums in 2×2 square = 8)
```

### Example 3:

```
Input:
A = [
  [0, 7, 2],
  [1, 7, 2],
  [9, 5, 1],
  [4, 3, 8],
  [3, 5, 4]
]

Output: 3  
(Sum of all lines in 3×3 square = 15)
```

### Example 4:

```
Input:
A = [[7]]

Output: 1
```

---

## Assumptions

- `N` and `M` are integers in range `[1..20]`
- Each element in matrix `A` is an integer in range `[1..1,000,000]`

---

Write an **efficient and correct** solution. Performance is not the primary focus.

1. **Restate the question in clear language**
   Given a 2D grid of integers, find the largest integer `K` such that there exists a `K x K` square inside the grid where every row, every column, and both diagonals sum to the same value (the square is "magic").

2. **Important points**

   * Any `1x1` square is always magic.
   * Matrix is up to `20x20`, so brute-force is acceptable.
   * Need to check all possible top-left positions and all possible sizes.

3. **Algorithm type**

   * Brute-force check all squares, largest to smallest, return first valid.

4. **Step-by-step solution**

   1. For size `K` from min(N, M) down to 1:

      * For each possible `K x K` square in the matrix:

        * Compute sum of first row as `targetSum`.
        * For each row and column in the square, check if their sum matches `targetSum`.
        * Check both diagonals.
        * If all checks pass, return `K`.
   2. If no larger square is magic, fall back to `K=1`.

5. **TypeScript solution**

   ```ts copy
   function solution(A: number[][]): number {
     const N = A.length;
     const M = A[0].length;
     const minSide = Math.min(N, M);
     for (let size = minSide; size >= 1; size--) {
       for (let i = 0; i + size <= N; i++) {
         for (let j = 0; j + size <= M; j++) {
           if (isMagic(A, i, j, size)) {
             return size;
           }
         }
       }
     }
     return 1;

     function isMagic(A: number[][], x: number, y: number, size: number): boolean {
       const target = sumRow(A, x, y, size, 0);

       // Check all rows
       for (let row = 0; row < size; row++) {
         if (sumRow(A, x, y, size, row) !== target) return false;
       }
       // Check all columns
       for (let col = 0; col < size; col++) {
         if (sumCol(A, x, y, size, col) !== target) return false;
       }
       // Check main diagonal
       let diag1 = 0;
       for (let k = 0; k < size; k++) diag1 += A[x + k][y + k];
       if (diag1 !== target) return false;

       // Check anti-diagonal
       let diag2 = 0;
       for (let k = 0; k < size; k++) diag2 += A[x + k][y + size - 1 - k];
       if (diag2 !== target) return false;

       return true;
     }

     function sumRow(A: number[][], x: number, y: number, size: number, row: number): number {
       let s = 0;
       for (let col = 0; col < size; col++) s += A[x + row][y + col];
       return s;
     }
     function sumCol(A: number[][], x: number, y: number, size: number, col: number): number {
       let s = 0;
       for (let row = 0; row < size; row++) s += A[x + row][y + col];
       return s;
     }
   }
   ```

6. **Examples from the question**

   * Example 1: Output is **3**
   * Example 2: Output is **2**
   * Example 3: Output is **3**
   * Example 4: Output is **1**

7. **Additional test cases**

   | A                             | Output | Notes                        |
   | ----------------------------- | ------ | ---------------------------- |
   | \[\[1,1],\[1,1]]              | 2      | All same value               |
   | \[\[5,6,5],\[6,5,6],\[5,6,5]] | 3      | Symmetric, diagonal is magic |
   | \[\[1]]                       | 1      | 1x1 always magic             |
   | 20x20 grid of 7s              | 20     | All values same, whole grid  |
