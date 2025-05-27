## AngryFrogs  
**Medium**  
**50 min**  
Given blocks in a row, find the distance between the two most distant blocks, such that the heights between them are first decreasing and then increasing.  

---

### Task description  
There are N blocks, numbered from 0 to N−1, arranged in a row. A couple of frogs were sitting together on one block when they had a terrible quarrel. Now they want to jump away from one another so that the distance between them will be as large as possible.  

The distance between blocks numbered J and K, where J ≤ K, is computed as K − J + 1. The frogs can only jump up, meaning that they can move from one block to another only if the two blocks are adjacent and the second block is of the same or greater height as the first.  

**What is the longest distance that they can possibly create between each other, if they also chose to sit on the optimal starting block initially?**  

---

### Write a function:  
```function solution(blocks);```  

that, given an array `blocks` consisting of N integers denoting the heights of the blocks, returns the longest possible distance that two frogs can make between each other starting from one of the blocks.  

---

### Examples:  

1. Given `blocks = [2, 6, 8, 5]`, the function should return `3`.  
   - If starting from `blocks[0]`, the first frog can stay where it is and the second frog can jump to `blocks[2]` (but not to `blocks[3]`).  

2. Given `blocks = [1, 5, 5, 2, 6]`, the function should return `4`.  
   - If starting from `blocks[3]`, the first frog can jump to `blocks[1]` (but not `blocks[0]`), and the second frog can jump to `blocks[4]`.  

3. Given `blocks = [1, 1]`, the function should return `2`.  
   - If starting from `blocks[1]`, the first frog can jump to `blocks[0]` and the second frog can stay where it is.  
   - Starting from `blocks[0]` would result in the same distance.  

---

### Write an efficient algorithm for the following assumptions:  
- `N` is an integer within the range [2..200,000]  
- each element of array `blocks` is an integer within the range [1..1,000,000,000]  


## AngryFrogs

**Step-by-Step Explanation**

### 1. Problem Restatement

We have an array `blocks` of length `N`, where `blocks[i]` is the height of block `i`. Two frogs start on the **same** block `S`. One frog jumps **left**, and the other jumps **right**. A frog may move to an **adjacent** block only if the destination block’s height is **greater than or equal** to its current block’s height (i.e. it can only go “uphill” or stay level).

We want to choose the **best** starting index `S` so that after their jumps, the frogs end up on positions `J` (left frog) and `K` (right frog) with **maximum** distance

$$
\text{distance} = K - J + 1.
$$

### 2. Key Insight

For each index `i`, precompute:

* `L[i]` = the **leftmost** index reachable by a frog starting at `i` and moving left under the “non-decreasing” rule.
* `R[i]` = the **rightmost** index reachable by a frog starting at `i` and moving right under the same rule.

Then, if the frogs start at `i`, the maximal distance they can achieve is

$$
\;R[i] \;-\; L[i]\;+\;1.
$$

The answer is the **maximum** of that value over all `i = 0..N-1`.

### 3. Computing `L[]` and `R[]` in O(N)

* **Compute `L` in a left-to-right pass**:

  ```ts
  L[0] = 0;
  for (let i = 1; i < N; i++) {
    if (blocks[i-1] <= blocks[i]) {
      // can step from i to i-1
      L[i] = L[i-1];
    } else {
      L[i] = i;
    }
  }
  ```
* **Compute `R` in a right-to-left pass**:

  ```ts
  R[N-1] = N-1;
  for (let i = N-2; i >= 0; i--) {
    if (blocks[i+1] >= blocks[i]) {
      // can step from i to i+1
      R[i] = R[i+1];
    } else {
      R[i] = i;
    }
  }
  ```

### 4. Find the Maximum Distance

Finally, scan `i = 0..N-1` and compute

```ts
distance = R[i] - L[i] + 1;
```

Keep track of the maximum.

---

### Examples

1. **blocks = \[2, 6, 8, 5]**

   * `L = [0,0,0,3]`, `R = [2,2,2,3]`
   * distances = `[3,3,3,1]` → **3**.

2. **blocks = \[1, 5, 5, 2, 6]**

   * `L = [0,0,0,3,3]`, `R = [2,2,2,4,4]`
   * distances = `[3,3,3,2,2]` → best at `i=2` or `i=1` gives `3`, but the sample says `4` starting at `i=3`:

     * Starting at `i=3` (height=2), left frog goes to `1` (`2→5` no, but 5≥2 means it can jump left: oh the rule is “adjacent and destination≥current” so from 3→2 index: blocks\[2]=5 ≥2 so yes; then 2→1: 5→5 yes; then 1→0:5→1? 1≥5? no, stops at index 1). So `L[3]=1`.
     * Right frog from `3` goes to `4` (6≥2), so `R[3]=4`.
       So `L[3]=1, R[3]=4` → distance = `4−1+1 = 4`.
   * Our precompute must respect that a frog can move left from `i` to `i-1` iff `blocks[i-1] >= blocks[i]`.
   * Recomputing with that rule yields `L = [0,1,1,3,3]`, `R = [2,2,2,4,4]`, distances `[3,2,2,2,2]` for i=0..4, and at i=3: `4−3+1=2`. That’s wrong.
   * **Fix**: Movement left: from `i` to `i-1` requires `blocks[i-1] >= blocks[i]` (destination≥current). So `L[i] = (blocks[i-1] >= blocks[i]) ? L[i-1] : i`.
   * Movement right: from `i` to `i+1` requires `blocks[i+1] >= blocks[i]` (same as before).

   Applying correctly:

   * For `[1,5,5,2,6]`:

     * `L[0]=0`;
       `i=1`:  blocks\[0]=1 ≥5? no → L\[1]=1
       `i=2`: blocks\[1]=5 ≥5? yes → L\[2]=L\[1]=1
       `i=3`: blocks\[2]=5 ≥2? yes → L\[3]=L\[2]=1
       `i=4`: blocks\[3]=2 ≥6? no → L\[4]=4
       → `L=[0,1,1,1,4]`.
     * `R[4]=4`;
       `i=3`: blocks\[4]=6 ≥2? yes → R\[3]=R\[4]=4
       `i=2`: blocks\[3]=2 ≥5? no → R\[2]=2
       `i=1`: blocks\[2]=5 ≥5? yes → R\[1]=R\[2]=2
       `i=0`: blocks\[1]=5 ≥1? yes → R\[0]=R\[1]=2
       → `R=[2,2,2,4,4]`.
   * distances:

     * i=0: 2−0+1=3
     * i=1: 2−1+1=2
     * i=2: 2−1+1=2
     * i=3: 4−1+1=4  ← **max**
     * i=4: 4−4+1=1

   Gives **4**, as desired.

3. **blocks = \[1, 1]**

   * `L = [0,0]`, `R = [1,1]` → distances `[2,2]` → **2**.

---

```ts
function solution(blocks: number[]): number {
  const N = blocks.length;
  const L = new Array<number>(N);
  const R = new Array<number>(N);

  // Compute L[]: leftmost reachable
  L[0] = 0;
  for (let i = 1; i < N; i++) {
    if (blocks[i - 1] >= blocks[i]) {
      L[i] = L[i - 1];
    } else {
      L[i] = i;
    }
  }

  // Compute R[]: rightmost reachable
  R[N - 1] = N - 1;
  for (let i = N - 2; i >= 0; i--) {
    if (blocks[i + 1] >= blocks[i]) {
      R[i] = R[i + 1];
    } else {
      R[i] = i;
    }
  }

  // Find maximum distance
  let best = 1;
  for (let i = 0; i < N; i++) {
    const dist = R[i] - L[i] + 1;
    if (dist > best) best = dist;
  }
  return best;
}
```

* **Time Complexity:** O(N)
* **Space Complexity:** O(N)

This solves the problem in linear time and space.
