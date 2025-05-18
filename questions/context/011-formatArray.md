# FormatArray

**Easy**  
**75 min**

Given an array of integers, output a string that presents the integers in tabular form.

---

## Task description

You have an array of numbers and you would like to print these numbers in a tabular format to make them look more organized. Each cell of the table contains exactly one number and is surrounded by exactly four edges:

``` text
+----+----+----+-----+
|  4 | 35 | 80 | 123 |
+----+----+----+-----+
```

As you can see above, each corner of the cell is represented by a `+` sign, vertical edges by `|` signs and horizontal edges by `-` signs. The width of the cell adjusts to accommodate the number of digits of the number written within it. There can be many cells in a row. Adjacent cells share an edge.

Note that each cell has the same width. The width of the cell adjusts to match the width of the longest number in the table. The numbers in cells are aligned to the right, with any unused area in each cell filled with spaces.

The table can consist of many rows, and adjacent rows share an edge:

``` text
+-------+-------+-------+-------+
|     4 |    35 |    80 |   123 |
+-------+-------+-------+-------+
| 12345 |    44 |     8 |     5 |
+-------+-------+-------+-------+
|    24 |     3 |    22 |    35 |
+-------+-------+-------+-------+
```

Your goal is to output a table containing all the numbers from a given array such that each row contains exactly K numbers. The last row can contain fewer numbers.

Write a function:

``` ts
function solution(A, K);
```

that, given a non-empty array A consisting of N integers and an integer K, prints a string representing the formatted array. The numbers in the table should appear in the same order as the numbers in the array.

---

### Examples

1. Given  
   A = [4, 35, 80, 123, 12345, 44, 8, 5] and  
   K = 10,  
   the resultant table will contain exactly one row:
   
``` text
+-------+-------+-------+-------+--------+-------+-------+-------+
|     4 |    35 |    80 |   123 |  12345 |    44 |     8 |     5 |
+-------+-------+-------+-------+--------+-------+-------+-------+
```

2. Given  
   A = [4, 35, 80, 123, 12345, 44, 8, 5, 24, 3] and  
   K = 4,  
   the table would appear as:

``` text
+-------+-------+-------+-------+
|     4 |    35 |    80 |   123 |
+-------+-------+-------+-------+
| 12345 |    44 |     8 |     5 |
+-------+-------+-------+-------+
|    24 |     3 |       |       |
+-------+-------+-------+-------+
```

3. Given  
   A = [4, 35, 80, 123, 12345, 44, 8, 5, 24, 3, 22, 35] and  
   K = 4,  
   the table would appear as:

``` text
+-------+-------+-------+-------+
|     4 |    35 |    80 |   123 |
+-------+-------+-------+-------+
| 12345 |    44 |     8 |     5 |
+-------+-------+-------+-------+
|    24 |     3 |    22 |    35 |
+-------+-------+-------+-------+
```

---

The function shouldn't return any value.

You can print a string to the output (without or with the end-of-line character) as follows:

``` ts
process.stdout.write('sample string');  
process.stdout.write('whole line\n');
```

---

### Assume that:

- N is an integer within the range [1..200];
- K is an integer within the range [1..1,000,000,000];
- each element of array A is an integer within the range [0..1,000,000,000].

---

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.


# Task 11

## FormatArray

**Step-by-Step Explanation**

### Step 1: Understand the Task

You are given:
- An array `A` of integers.
- An integer `K`, the number of **columns per row**.

You need to **print** a formatted table:
- Each number is inside a **cell**.
- **Cell width** is determined by the **longest number** in `A`.
- Numbers are **right-aligned**.
- Rows and cells are drawn using `+`, `-`, and `|`.

---

### Step 2: Rules

- Each cell has a fixed width = `maxLength` of any number in `A`.
- If the last row has fewer than `K` values, pad with empty cells.
- All rows are bounded by horizontal borders.

---

### Step 3: Approach

1. Convert all numbers in `A` to strings.
2. Find the maximum length (`cellWidth`) of these strings.
3. Group the array into rows of length `K` (pad last row with `''`).
4. For each row:
   - Construct horizontal line: `+-------+...`
   - Construct content line: `|   123 | ...`
5. Print horizontal, then content, then horizontal for each row.

---

### Step 4: TypeScript Code

```ts
function solution(A: number[], K: number): void {
  const stringA = A.map(String);
  const cellWidth = Math.max(...stringA.map(s => s.length));
  const numRows = Math.ceil(A.length / K);

  const makeHorizontalLine = () => {
    return '+' + Array(K).fill('-'.repeat(cellWidth + 2)).join('+') + '+\n';
  };

  for (let r = 0; r < numRows; r++) {
    const start = r * K;
    const rowItems = A.slice(start, start + K);
    while (rowItems.length < K) rowItems.push(''); // pad with empty cells

    const horizontalLine = makeHorizontalLine();
    process.stdout.write(horizontalLine);

    const rowLine = rowItems
      .map(n => {
        const s = n === '' ? '' : String(n);
        return ' '.repeat(cellWidth - s.length) + s;
      })
      .map(cell => ` ${cell} `)
      .join('|');

    process.stdout.write('|' + rowLine + '|\n');
  }

  process.stdout.write(makeHorizontalLine());
}
```

---

### Step 5: Example

**Input:**

A = [4, 35, 80, 123, 12345, 44, 8, 5, 24, 3];

K = 4;


**Output:**

+-------+-------+-------+-------+
|     4 |    35 |    80 |   123 |
+-------+-------+-------+-------+
| 12345 |    44 |     8 |     5 |
+-------+-------+-------+-------+
|    24 |     3 |       |       |
+-------+-------+-------+-------+


### Step 6: Time & Space Complexity
- Time: O(N), where N = length of A
- Space: O(N), for internal string manipulation