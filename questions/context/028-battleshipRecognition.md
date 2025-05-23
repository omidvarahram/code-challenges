## BattleshipRecognition

**Easy**  
**40 min**  
*Given a rectangular board containing ships of three different sizes, find the number of ships of each size.*

### Task description

Battleships is a game played on a rectangular board. You are given a representation of such a board of size N (height) × M (width) with information about the locations of the ships.

The board is given as an array B, whose every element is a string that corresponds to one row of the game board. Each character of each string represents a cell of the board and is either:

- a `'#'` character, marking a part of a ship; or  
- a `'.'` character, representing an empty cell.

Two cells that share a side and have a value of `'#'` are parts of the same ship. Cell (X, Y) shares a side with cells (X, Y−1), (X, Y+1), (X−1, Y) and (X+1, Y).

In the Battleships game there are three types of ships:
![alt text](image.png)

- **Patrol Boats** of size 1:

- **Submarines** of size 2, which come in two shapes:

- **Destroyers** of size 3, which come in six shapes:


Your task is to find the number of ships of each type occurring on the board.

### Write a function:
```python
function solution(B);
```

that, given an array B consisting of N strings of length M each, returns an array R of three integers, such that:

- R[0] represents the number of Patrol Boats,  
- R[1] represents the number of Submarines,  
- R[2] represents the number of Destroyers.

### Examples:

1. Given  
 B = ["..#.#", "#.#..", "#...#", "#..##"],  
 the function should return **[2, 1, 2]** as explained above.

2. Given  
 B = ["..#.#", "#.#..", "#...#"],  
 the function should return **[1, 1, 1]**.

3. Given  
 B = ["##.", ".#.", ".#."],  
 the function should return **[0, 0, 2]**.

4. Given  
 B = ["...", "...", "..."],  
 the function should return **[0, 0, 0]**.

### Assume that:

- N is an integer within the range [1..100];  
- all strings in B are of the same length M from the range [1..100];  
- every string in B consists only of the following characters: `'.'` and/or `'#'`;  
- every ship on the board is either a Patrol Boat (size 1), a Submarine (size 2) or a Destroyer (size 3).

---

*In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.*


## BattleshipRecognition

**Step-by-Step Explanation**

### Step 1: Problem Understanding
We have an \(N\times M\) board `B` of `'.'` and `'#'`.  
Each connected component of `'#'` cells (4-directionally) is exactly one ship.  
Ships come in three sizes:
1. **Patrol Boat** (size 1)
2. **Submarine** (size 2)
3. **Destroyer** (size 3)

We must count how many ships of each size appear.

---

### Step 2: Outline of the Approach
1. **Visited array**: track which `'#'` cells we've already assigned to a ship.
2. **Scan** all cells `(i,j)`.  
   - When we find an unvisited `'#'`, we launch a **DFS** (or BFS) to mark its entire connected component and **count** its size.
3. After the DFS completes, we increment the appropriate counter based on the component size (1, 2, or 3).

---

### Step 3: TypeScript Implementation

```ts
function solution(B: string[]): number[] {
  const N = B.length;
  const M = N > 0 ? B[0].length : 0;
  // 1) visited grid
  const visited: boolean[][] = Array.from({ length: N }, () => Array(M).fill(false));
  // 2) counts: [patrol boats, submarines, destroyers]
  const counts = [0, 0, 0];

  // 4-directional moves
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // 3) scan the board
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (B[i][j] === '#' && !visited[i][j]) {
        // start DFS to measure this ship
        let size = 0;
        const stack: [number, number][] = [[i, j]];
        visited[i][j] = true;

        while (stack.length > 0) {
          const [x, y] = stack.pop()!;
          size++;
          for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            if (
              nx >= 0 && nx < N &&
              ny >= 0 && ny < M &&
              B[nx][ny] === '#' &&
              !visited[nx][ny]
            ) {
              visited[nx][ny] = true;
              stack.push([nx, ny]);
            }
          }
        }

        // 4) record the ship by its size
        // sizes guaranteed to be 1,2,3 by problem statement
        counts[size - 1]++;
      }
    }
  }

  // 5) return [#boats size1, #subs size2, #dest size3]
  return counts;
}
```
