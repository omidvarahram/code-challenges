### CleaningRobot

**Medium**  
**50 min**  
Count the number of squares on a rectangular grid visited by a cleaning robot. The robot only moves forward, turning right if it cannot make a move.

---

### Task description

There is a cleaning robot which is cleaning a rectangular grid of size N × M, represented by array `R` consisting of N strings. Rows are numbered from 0 to N−1 (from top to bottom) and columns are numbered from 0 to M−1 (from left to right).

The robot starts cleaning in the top-left corner, facing rightwards. It moves in a straight line for as long as it can, in other words, while there is an unoccupied grid square ahead of it. When it cannot move forward, it rotates 90 degrees clockwise and tries to move forward again until it encounters another obstacle, and so on. Dots in the array (".") represent empty squares and "x"'s represent occupied squares (ones the robot cannot move through). Each square that the robot occupied at least once is considered clean. The robot moves indefinitely.

---

### Write a function:

```python
function solution(R);
```

that, given an array `R` consisting of N strings, each of length M, representing the grid, returns the number of clean squares.

---

### Examples:

1. Given `A = [". . x . . .", ". . x x . .", "x . . . . ."]`, your function should return `6`.

> The robot starts at (0,0), facing rightwards, and moves to (0,2), where it turns due to the obstacle at (0,3). Then it goes down from (0,2) to (1,2), where it changes direction again due to another obstacle. Next it goes left from (1,2) to (1,0), where it turns once because of the grid boundary, then it moves once and turns once more, which makes it stand again at position (0,0) facing rightwards, just as at the beginning, which means it will now repeat the loop indefinitely. The total number of cleaned squares is 6.

2. Given  
`A = [". . . x . . .", ". x . . . . .", ". . . . x .", ". . . . . ."]`  
your function should return `15`.

3. Given  
`A = [". . . x .", ". x . . x", ". x . x", ". . . ."]`  
your function should return `9`.

4. Given `A = ["."]`, your function should return `1`, because there is only one square on the grid and it is cleaned in the first move.

---

### Assume that:

- N and M are integers within the range [1..20];
- top-left cell is empty;
- each string in R consists only of the following characters: '.' and/or 'x'.

> In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.


## CleaningRobot

**Step-by-Step Explanation**

### 1. Problem Restatement

We have an `N×M` grid `R` of characters:

* `'.'` = empty (cleanable) cell
* `'x'` = obstacle (blocked) cell

A robot starts at the top-left corner `(0,0)`, facing **right**. It moves forward along its current direction (`→`, `↓`, `←`, `↑`) as long as the **next** cell in front is within the grid and is **not** an obstacle.

* If it **can** move forward, it does so.
* If it **cannot** (because of a boundary or an `'x'`), it turns 90° to the **right** (clockwise), then retries.

The robot never stops; however, once it returns to a previously seen **state** (same position **and** same facing direction), its trajectory will simply repeat. Any empty cell the robot has ever occupied is considered **cleaned**. We must count how many distinct cells get cleaned.

---

### 2. Simulation Outline

1. **Parse** the input into a 2D array `grid[r][c]`.
2. Maintain:

   * Current position `(r,c)` (start `(0,0)`).
   * Current direction `d` in `{0,1,2,3}` mapping to right, down, left, up.
   * A set `cleaned` of `(r,c)` pairs the robot has visited.
   * A set `seenStates` of `(r,c,d)` triples to detect when we return to a prior state.
3. **Loop** until the current state `(r,c,d)` is already in `seenStates`:

   * Mark `(r,c)` as cleaned.
   * Add `(r,c,d)` to `seenStates`.
   * Compute the cell in front `(nr,nc)` = `(r + dr[d], c + dc[d])`.
   * If `(nr,nc)` is in bounds **and** `grid[nr][nc] === '.'`, then move to `(nr,nc)` (keep `d`).
   * Otherwise, rotate right: `d = (d+1) % 4`.
4. Once we detect a repeated state, **stop**. The size of `cleaned` is the answer.

---

### 3. TypeScript Code

```ts
function solution(R: string[]): number {
  const N = R.length;
  const M = R[0].length;
  const grid = R.map(row => row.split(''));

  // Direction vectors: 0=→,1=↓,2=←,3=↑
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  // Starting position and direction
  let r = 0, c = 0, d = 0;

  // Track cleaned cells and seen states
  const cleaned = new Set<string>();
  const seen = new Set<string>();

  while (true) {
    // Mark current cell cleaned
    cleaned.add(`${r},${c}`);

    // Serialize current state
    const state = `${r},${c},${d}`;
    if (seen.has(state)) {
      // We've looped back to a previous state → stop
      break;
    }
    seen.add(state);

    // Attempt to step forward
    const nr = r + dr[d];
    const nc = c + dc[d];
    if (
      nr >= 0 && nr < N &&
      nc >= 0 && nc < M &&
      grid[nr][nc] === '.'
    ) {
      // Can move forward
      r = nr;
      c = nc;
    } else {
      // Blocked → turn right
      d = (d + 1) % 4;
    }
  }

  return cleaned.size;
}
```

---

### 4. Complexity

* **Time:** In the worst case there are at most `N×M×4` distinct `(r,c,d)` states. Each loop iteration does O(1) work, so overall O(N·M).
* **Space:** O(N·M) to store `cleaned` and up to O(N·M) for `seen`.

This is efficient for `N, M ≤ 20`.
