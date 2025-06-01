# SpeedViolationNumberOfFines

**Programming language:** Java 11  
**Language:** English

---

## Task description

There is a street described by a string S. Each car is denoted in S as one of the following:

- '>' : denotes a car going to the left,  
- '<' : denotes a car going to the right,  
- '.' : denotes a speed camera.

Count the total number of times the cars pass a speed camera. If a car going to the left will pass every speed camera that is to the left of it and similarly, a car going to the right will pass every speed camera to the right of it.

---

### Write a function:

```
function solution(S: string): number {}
```

that, given a string S of length N, returns the total number of times that cars pass by speed cameras.

---

### Examples

- Given `S = ">.<.<"`  
  The function should return 4. The first car will pass by two speed cameras to the right of it, and the third car will not pass by any cameras. The second car will pass two speed cameras to the left.

- Given `S = ".>..<..>"`  
  The function should return 5. Each car will pass one speed camera.

---

### Assume that:

- N is an integer within the range [1..100];  
- S consists only of the following characters: '.', '>', '<'

In your solution, focus on correctness. The performance of your solution will not be the focus of assessment.


1. **Restate the question in clear language**
   Given a string with cars going left (`'>'`), right (`'<'`), and speed cameras (`'.'`), count how many times cars will pass by speed cameras.

   * A `'>'` car passes all cameras to its **right**.
   * A `'<'` car passes all cameras to its **left**.

2. **Important points**

   * For each `'>'`, count `'.'` to its right.
   * For each `'<'`, count `'.'` to its left.

3. **Algorithm type**

   * Two passes (one left-to-right for `<`, one right-to-left for `>`).

4. **Step-by-step solution**

   * Pass 1 (left to right): For each `'<'`, add current count of cameras seen so far.
   * Pass 2 (right to left): For each `'>'`, add current count of cameras seen so far.

5. **Java 11 solution**

```ts copy
function solution(S: string): number {
  const N = S.length;
  let count = 0;

  // Pass 1: Left to right for '<' cars
  let camerasToLeft = 0;
  for (let i = 0; i < N; i++) {
    const c = S[i];
    if (c === '.') camerasToLeft++;
    else if (c === '<') count += camerasToLeft;
  }

  // Pass 2: Right to left for '>' cars
  let camerasToRight = 0;
  for (let i = N - 1; i >= 0; i--) {
    const c = S[i];
    if (c === '.') camerasToRight++;
    else if (c === '>') count += camerasToRight;
  }

  return count;
}
```

6. **Examples from the question**

   * `">.<.<"` → Output: 4
   * `".>..<..>"` → Output: 5

7. **Additional test cases**

   * `"...."` → 0 (no cars)
   * `"<<<<>>>>"` → 0 (no cameras)
   * `".<.<.<."` → 3 (each `<` passes all cameras to left)
   * `".>.>.>."` → 3 (each `>` passes all cameras to right)
