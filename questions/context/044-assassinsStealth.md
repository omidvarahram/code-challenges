**AssassinsStealth**

**Medium**  
**50 min**  
Given a two-dimensional board with an assassin and guards on it, determine whether the assassin can get to the bottom-right corner undetected.

---

### Task description

We are given a two-dimensional board of size N × M (N rows and M columns). Each field of the board can be empty ('.'), may contain an obstacle ('X') or may have a character in it. The character might be either an assassin ('A') or a guard. Each guard stands still and looks straight ahead, in the direction they are facing.

Every guard looks in one of four directions (up, down, left or right on the board) and is represented by one of four symbols.  
A guard denoted by '<' is looking to the left; by '>', to the right; '^', up; or 'v', down.  
**The guards can see everything in a straight line in the direction in which they are facing**, as far as the first obstacle ('X' or any other guard) or the edge of the board.

The assassin can move from the current field to any other empty field with a shared edge.  
The assassin **cannot move onto fields containing obstacles or enemies**.

---

### Write a function:

```function solution(B);```

that, given an array B consisting of N strings denoting rows of the array, returns `true` if it is possible for the assassin to sneak from their current location to the bottom-right cell of the board undetected, and `false` otherwise.

---

### Examples:

1.  
Given `B = ["...x..>", "..v.x..", "..>.x..", "..>.x..", "A......." ]`,  
your function should return `false`.  
All available paths lead through a field observed by a guard.

2.  
Given `B = ["...xv", "a..x.", "xx..>"]`,  
your function should return `true`.  
The guard in the second row is blocking the other one from watching the bottom-right square.

3.  
Given `B = ["...", "..>", ">..a"]`,  
your function should return `false`,  
as the assassin gets spotted right at the start.

4.  
Given `B = ["A..v", "...>", "..>."]`,  
your function should return `false`.  
It’s not possible for the assassin to enter the bottom-right cell undetected, as the cell is observed.

---

### Write an efficient algorithm for the following assumptions:

- `N` is an integer within the range `[1..500]`;
- all strings in `B` are of the same length `M` from range `[1..500]`;
- there is exactly one assassin on the board;
- there is no guard or wall on `B[N−1][M−1]`;
- every string in `B` consists only of the following characters: `'.'`, `'X'`, `'<'`, `'>'`, `'^'`, `'v'` and `'A'`.

## AssassinsStealth

**Step-by-Step Explanation**

### 1. Problem Restatement

We have an `N×M` grid `B`.

* Empty cells: `.`
* Obstacles: `X`
* Assassin: `A` (exactly one)
* Guards, each facing one of four directions, using symbols `<`, `>`, `^`, `v`.

Each guard “sees” in a straight line from its position in the direction it faces, across empty cells (`.`) until blocked by an obstacle (`X`) or another guard. Any cell in its line of sight is **watched**.

The assassin can move in four directions (up/down/left/right) onto empty cells only (not onto `X` or guard symbols), and must avoid ever stepping into a watched cell. We want to know if there exists a path from the assassin’s starting cell to the bottom-right cell `(N−1, M−1)` such that no step (including start and end) is watched.

---

### 2. Outline of the Solution

1. **Parse** the grid, record:

   * Positions of all guards and their facing directions.
   * Position of the assassin.
2. **Mark watched cells**:

   * Initialize a 2D boolean array `watched[N][M] = false`.
   * For each guard at `(r,c)` facing `dir`, walk cell-by-cell in that direction:

     * Stop if you hit outside the grid, an obstacle `X`, or another guard symbol.
     * Otherwise mark `watched[nr][nc] = true`.
3. **Breadth‐First Search** from the assassin’s start `(ar,ac)`:

   * Only enqueue neighbors `(nr,nc)` that satisfy:

     * In bounds.
     * `B[nr][nc] !== 'X'` and is not a guard symbol.
     * `watched[nr][nc] === false`.
     * Not visited before.
   * Also, the start cell itself must not be watched.
4. If BFS reaches `(N−1, M−1)`, return `true`; else `false`.

This runs in **O(N·M)** time and space, suitable for up to `500×500`.

---

### 3. TypeScript Implementation

```ts
function solution(B: string[]): boolean {
  const N = B.length;
  const M = B[0].length;
  // Parse into array of chars for easy indexing
  const grid = B.map(row => row.split(''));
  
  // Locate guards, assassin
  const guards: { r: number; c: number; dir: string }[] = [];
  let ar = -1, ac = -1;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      const ch = grid[r][c];
      if (ch === 'A') {
        ar = r; ac = c;
      } else if ('<>^v'.includes(ch)) {
        guards.push({ r, c, dir: ch });
      }
    }
  }

  // Directions map
  const deltas: Record<string, [number,number]> = {
    '<': [0, -1],
    '>': [0,  1],
    '^': [-1,0],
    'v': [ 1,0],
  };

  // 2) Mark watched cells
  const watched: boolean[][] = Array.from({ length: N },
    () => Array(M).fill(false)
  );

  for (const { r, c, dir } of guards) {
    const [dr, dc] = deltas[dir];
    let nr = r + dr, nc = c + dc;
    while (nr >= 0 && nr < N && nc >= 0 && nc < M) {
      const ch = grid[nr][nc];
      if (ch === 'X' || '<>^v'.includes(ch)) {
        break;
      }
      watched[nr][nc] = true;
      nr += dr; nc += dc;
    }
  }

  // If start or end is watched, fail immediately
  if (watched[ar][ac] || watched[N-1][M-1]) {
    return false;
  }

  // 3) BFS from (ar,ac)
  const visited: boolean[][] = Array.from({ length: N },
    () => Array(M).fill(false)
  );
  const queue: [number,number][] = [];
  queue.push([ar, ac]);
  visited[ar][ac] = true;

  const moves = [[1,0],[-1,0],[0,1],[0,-1]] as const;

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    if (r === N-1 && c === M-1) {
      return true;
    }
    for (const [dr, dc] of moves) {
      const nr = r + dr, nc = c + dc;
      if (
        nr >= 0 && nr < N && nc >= 0 && nc < M &&
        !visited[nr][nc] &&
        !watched[nr][nc]
      ) {
        const cell = grid[nr][nc];
        if (cell === '.' || cell === 'A') {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  }

  return false;
}
```

---

### 4. Explanation of Key Steps

* We first **convert** the input strings into a 2D character array for easy inspection.
* We gather every guard’s location and facing direction, and the assassin’s starting coordinates.
* For each guard, we march in its direction, marking every empty cell it can “see” as `watched`, until blocked by an obstacle or another guard.
* If either the start or the goal cell is watched, we immediately return `false`.
* Otherwise we run a standard BFS, only stepping onto cells that are:

  1. Unvisited,
  2. Not watched,
  3. Not a wall (`X`) or guard,
  4. In-bounds.
* If BFS ever dequeues the bottom-right cell, we have found a safe path → return `true`.
* If BFS exhausts possibilities without reaching the goal, return `false`.

This guarantees we detect a valid stealth path if one exists, in linear time relative to the board size.
