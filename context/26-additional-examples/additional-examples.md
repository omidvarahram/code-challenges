## Problem 1 — Cycle Pointer Jumps

### Context:
You're given an array where each element points to the next index. Starting at index 0, follow the jumps:
- Stop if index is -1
- Or if a **cycle** occurs (already visited index)

### Approach:
Use a `Set` to track visited indices. Traverse while index is in bounds, not -1, and not yet visited.

### Solution:

```typescript
function solution(A: number[]): number {
  const visited = new Set<number>();
  let index = 0;
  let steps = 0;

  while (index !== -1 && !visited.has(index) && index >= 0 && index < A.length) {
    visited.add(index);
    index = A[index];
    steps++;
  }

  return steps;
}
```

### Examples:

```typescript
solution([1, 4, -1, 3, 2]) // → 4
solution([2, 2, 2, 2, -1]) // → 3
solution([1, 1, 1])        // → 2
```

---

### Similar Problem 1 — Email Forward Chain

You're given an array `A`, where `A[i]` is the person `i` forwards an email to.  
Count how many people receive the email until:
- It reaches someone who stops forwarding (`-1`)
- Or it loops

✅ Same logic: pointer-following with cycle detection

---

### Similar Problem 2 — Robot Jump Simulation

Each `A[i]` gives the next index for a robot to jump to.  
The robot starts at index `0`, and stops on `-1`, out-of-bounds, or repeat.

✅ Exact same structure as original

---

## Problem 2 — Circular Pair Sum (With Optional Overlap)

### Context:
Given a circular array, count how many **adjacent pairs** sum to a given target.  
If `noOverlap = true`, each index can only be used once.

### Approach:
Loop through each index `i`, and compare `A[i] + A[(i+1) % N]`  
Use a `used[]` array if overlap is disallowed.

### Solution:

```typescript
function circularPairSum(A: number[], T: number, noOverlap: boolean): number {
  const N = A.length;
  let count = 0;
  const used = new Array(N).fill(false);

  for (let i = 0; i < N; i++) {
    const j = (i + 1) % N;
    if (A[i] + A[j] === T) {
      if (!noOverlap || (!used[i] && !used[j])) {
        count++;
        if (noOverlap) {
          used[i] = true;
          used[j] = true;
        }
      }
    }
  }

  return count;
}
```

### Examples:

```typescript
circularPairSum([1, 2, 3, 1], 4, false) // → 1
circularPairSum([2, 2, 2, 2], 4, true)  // → 2
circularPairSum([1, 3, 1, 3], 4, false) // → 4
```

---

### Similar Problem 1 — Circular Seating Conflict

Each person has a number (e.g., tolerance), and you want to find adjacent pairs that sum to a conflict value.  
Treat the seating as circular. Prevent overlaps if needed.

✅ Same logic: circular pairs, optional no-reuse

---

### Similar Problem 2 — Wraparound Alert Detection

You’re scanning a circular array of sensor readings.  
Count how many adjacent sensor pairs (including last→first) exceed a threshold.

✅ Same scanning logic, with or without overlap rules

---

## Problem 3 — Maximum Rectangle Side from Two Sticks

### Context:
Given two wooden sticks of length `a` and `b`, and you can cut them.  
Find the **maximum possible side length** `L` for a **square** (i.e., 4 sides of length `L` total).

### Approach:
Use binary search on answer. Greedily check for how many pieces of length `L` can be made from both sticks.

### Solution:

```typescript
function maxLengthOfSide(a: number, b: number): number {
  let left = 1, right = Math.max(a, b);
  let answer = 0;

  function canMake(length: number): boolean {
    return Math.floor(a / length) + Math.floor(b / length) >= 4;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canMake(mid)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}
```

### Examples:

```typescript
maxLengthOfSide(9, 3) // → 3
maxLengthOfSide(5, 3) // → 2
maxLengthOfSide(8, 8) // → 4
```

---

### Similar Problem 1 — Cable Equal Cut

Given two cables, what's the max length `L` you can cut to make **exactly 4 equal segments**?

✅ Same solution: binary search on length, greedy check for # of pieces

---

### Similar Problem 2 — Rope Fence Construction

You have two ropes and want to cut them into equal pieces to form a 4-side fenced square.  
Maximize side length.

✅ Same as original in different wording

---

## Problem 4 — Game Level Difficulty Scheduling

### Context:
You're given an array of game level difficulties, and `K` = max number of days to complete them.  
Split the levels into **K contiguous parts** to **minimize the max difficulty** of any part.

### Approach:
Binary search on the difficulty limit.  
Greedily check if you can split the array into ≤ K groups under that limit.

### Solution:

```typescript
function minDaysRequired(A: number[], maxPerDay: number): number {
  let days = 1, currentSum = 0;
  for (let a of A) {
    if (currentSum + a > maxPerDay) {
      days++;
      currentSum = a;
    } else {
      currentSum += a;
    }
  }
  return days;
}

function minDifficulty(A: number[], K: number): number {
  let left = Math.max(...A);
  let right = A.reduce((a, b) => a + b, 0);
  let result = right;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (minDaysRequired(A, mid) <= K) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}
```

### Examples:

```typescript
minDifficulty([3, 1, 4, 1, 5, 9], 3) // → 9
minDifficulty([1, 2, 3, 4, 5], 2)    // → 9
minDifficulty([7, 2, 5, 10, 8], 2)   // → 18
```

---

### Similar Problem 1 — Workload Distribution

You have tasks of various weights. Distribute them over `D` days, keeping **each day’s workload ≤ X**.  
Find the smallest such `X`.

✅ Binary Search + Greedy split check

---

### Similar Problem 2 — Disk Storage Partitioning

Given file sizes and number of disks `K`, partition files (in order) so that the **max storage per disk** is minimized.

✅ Same algorithm, different context

---
## Problem 5 — Grouping People by Room Tolerance

### Context:
You are given an array `A` of length `N`, where each element `A[i]` represents a person's **maximum acceptable group size** (including themselves).  
Your task is to assign people into the **minimum number of rooms**, such that:
- Each room has exactly `k` people.
- Every person in a room must be okay being in a group of size `k` or less (i.e., their value `A[i] ≥ k`).

Each person must be assigned to **exactly one** room.

---

### Approach:
- **Sort the array** in ascending order.
- Traverse left to right, and build groups greedily:
  - Start a group
  - Keep adding people to it
  - Once the group size matches the tolerance of the last person added, close the group and start a new one

---

### Solution:

```typescript
function minRooms(A: number[]): number {
  A.sort((a, b) => a - b);
  let rooms = 0;
  let size = 0;

  for (let i = 0; i < A.length; i++) {
    size++;
    if (size === A[i]) {
      rooms++;
      size = 0;
    }
  }

  return rooms;
}
```

---

### Examples:

```typescript
minRooms([2, 3, 1, 2, 2]) // → 2
minRooms([1, 1, 1, 1])    // → 4
minRooms([2, 2, 2, 2])    // → 2
```

---

### Similar Problem 1 — Taxi Sharing

Each passenger gives a number: max people they're willing to share a taxi with (including themselves).  
Minimize the number of taxis required.  
✅ Same logic applies.

---

### Similar Problem 2 — Team Formation for a Game

Each player says the max number of players they want on a team.  
Form teams such that every member is okay with the team size.  
✅ Identical greedy grouping structure.

