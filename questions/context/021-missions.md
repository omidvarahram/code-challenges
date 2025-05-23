# Missions

**Easy**  
**40 min**

Calculate the minimum number of days required to complete all of the missions in a game.

---

## Task description

In order to finish a game, a player has to complete N missions.  
The missions are numbered from 0 to N−1.  
The K-th mission has an integer D[K] assigned, representing its difficulty level.

During a day, you can perform any number of missions given the two following rules:

- missions should be performed in the specified order,  
  in other words, a mission can be undertaken only if all of the missions preceding it have already been completed;

- the difference between the difficulty levels of any two missions performed on the same day  
  should not be greater than an integer X.

---

Write a function:

``` ts
function solution(D, X);
```

that, given an array D of N integers and an integer X,  
returns the minimum number of days required to complete all of the missions in the game.

---

### Examples:

1. Given  
   D = [5, 8, 2, 7]  
   X = 3,  
   your function should return **3**.

2. Given  
   D = [2, 5, 9, 2, 1, 4]  
   X = 4,  
   your function should return **3**.

3. Given  
   D = [1, 12, 10, 4, 5, 2]  
   X = 2,  
   your function should return **4**.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..200,000];
- X is an integer within the range [0..1,000,000,000];
- each element of array D is an integer within the range [1..1,000,000,000].

---



# Missions

**Step-by-Step Explanation**

### Step 1: Understand the Problem
You have an array `D` of mission difficulties and a threshold `X`.  
Missions **must** be done in order (0 → N−1).  
In one **day**, you can do a **contiguous** block of missions as long as:

```
max(difficulties in the block) − min(difficulties in the block) ≤ X
```


Your goal is to split the sequence into the **fewest** such blocks (days).

---

### Step 2: Greedy Segmentation
1. Initialize `days = 1` (at least one day needed).
2. Track `currentMin = D[0]` and `currentMax = D[0]` for the block you’re building.
3. Iterate `i` from 1 to `N−1`:
   - Update:
     ```
     currentMin = min(currentMin, D[i])
     currentMax = max(currentMax, D[i])
     ```
   - If `currentMax − currentMin > X`, you **cannot** include `D[i]` in the current day:
     - Increment `days++`
     - Start a **new** block at `D[i]`:
       ```
       currentMin = currentMax = D[i]
       ```
4. Return `days`.

This greedy approach works because extending a day as far as possible before breaking minimizes the number of days.

---

### Step 3: TypeScript Code

```ts
function solution(D: number[], X: number): number {
  if (D.length === 0) return 0;

  let days = 1;
  let currentMin = D[0];
  let currentMax = D[0];

  for (let i = 1; i < D.length; i++) {
    currentMin = Math.min(currentMin, D[i]);
    currentMax = Math.max(currentMax, D[i]);

    if (currentMax - currentMin > X) {
      days++;
      currentMin = currentMax = D[i];
    }
  }

  return days;
}
```

---

### Step 4: Example Walkthrough

**Input:** 
D = \[5, 8, 2, 7], X = 3


- Day 1: start with 5 → min=5, max=5
- Add 8 → min=5, max=8, diff=3 ≤3 → OK
- Add 2 → min=2, max=8, diff=6 >3 → break → Day 2 starts at 2
- Day 2: min=max=2
- Add 7 → min=2, max=7, diff=5 >3 → break → Day 3 starts at 7
- Total `days = 3`

---

### Complexity

- **Time:** O(N) — single pass  
- **Space:** O(1) — constant extra memory

This is efficient for N up to 200,000.
