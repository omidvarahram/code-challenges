# PlayersMovements

**Easy**  
**40 min**

Calculate the number of players that will perform a move.

---

## Task description

There are N players standing in a row, one player on a field.  
They are numbered from 0 to N−1 from left to right.

Players perform moves one by one from left to right, that is, in ascending order of numbers.  
Each player presses an arrow key in one of the four cardinal directions:  
- left ('<'),  
- right ('>'),  
- up ('^') or  
- down ('v').  

A key press in the given direction means that the player attempts to move onto the closest field in the direction specified.  
A move can be performed only if there is no other player already standing on the target field.

Moves are represented as a string S of length N,  
where S[K] (for K within the range 0..N−1) is the direction of the K-th player's move.  

How many players will actually perform a move successfully?

---

### Write a function:

``` ts
function solution(S);
```

which, given a string S of length N representing arrow keys pressed by each of the players,  
returns the number of players that will perform a move successfully.

---

### Examples:

1. Given  
   S = "><^v",  
   your function should return **2**.

2. Given  
   S = "<<<<<>v",  
   your function should return **6**.

3. Given  
   S = "><><",  
   your function should return **0**.

---

### Assumptions:

- N is an integer within the range [1..50];
- string S is made only of the following characters: '^', 'v', '<' and/or '>'.

---

In your solution, focus on correctness.  
The performance of your solution will not be the focus of the assessment.


# PlayersMovements

**Step-by-Step Explanation**

### Step 1: Understand the Problem

- There are `N` players standing on fields `0…N−1` (one per field).
- Each player presses a direction key (`<`, `>`, `^`, or `v`) in order from player `0` to player `N−1`.
- A move succeeds if the **target field** is **not occupied** at the time of that player’s turn.
  - `<` → target = `index − 1`
  - `>` → target = `index + 1`
  - `^` or `v` → move off the row (no one stands there ⇒ always free)
- After a successful move, the player vacates their original field and—if the move was `<` or `>` and stays on the row—occupies the target field.

We just need to **simulate** in O(N) time with a set of occupied positions.

---

### Step 2: Algorithm

1. Initialize a `Set` of occupied fields: `{0,1,…,N−1}`.
2. `count = 0`
3. For each player `k` from `0` to `N−1`:
   - Determine `target`:
     - If `S[k] === '<'`: `t = k−1`
     - If `S[k] === '>'`: `t = k+1`
     - Else (`^` or `v`): `t = null`  (off the row)
   - Check if move can succeed:
     - If `t === null` ⇒ succeeds
     - Else if `t < 0` or `t >= N` ⇒ succeeds (field outside row)
     - Else if `occupied.has(t)` ⇒ fails
     - Else ⇒ succeeds
   - If succeeds:
     - `occupied.delete(k)`
     - If `t !== null` and `0 ≤ t < N`, `occupied.add(t)`
     - `count++`
4. Return `count`

---

### Step 3: TypeScript Code

```ts
function solution(S: string): number {
  const N = S.length;
  const occupied = new Set<number>();
  for (let i = 0; i < N; i++) occupied.add(i);

  let count = 0;
  for (let k = 0; k < N; k++) {
    const dir = S[k];
    let t: number | null;
    if (dir === '<') t = k - 1;
    else if (dir === '>') t = k + 1;
    else t = null; // '^' or 'v', off the row

    let canMove: boolean;
    if (t === null) {
      canMove = true;
    } else if (t < 0 || t >= N) {
      canMove = true;
    } else {
      canMove = !occupied.has(t);
    }

    if (canMove) {
      occupied.delete(k);
      if (t !== null && t >= 0 && t < N) {
        occupied.add(t);
      }
      count++;
    }
  }

  return count;
}
```

---

### Step 4: Example

- `S = "><^v"`  
  - Player 0 (`'>'` → target 1 occupied) → fail  
  - Player 1 (`'<'` → target 0 occupied) → fail  
  - Player 2 (`'^'` → off row) → succeeds, vacates 2  
  - Player 3 (`'v'` → off row) → succeeds, vacates 3  
  → **count = 2**

---

**Time Complexity:** O(N)  
**Space Complexity:** O(N)  
Efficient for N up to 50.
