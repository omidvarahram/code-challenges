# GardenArrangement

**Medium**  
**50 min**  
Calculate the minimum number of trees that must be planted or replanted in order to make the number of them equal in every section of a garden.

---

### Task description

A garden is divided into N sections numbered from 0 to N−1. It is described by an array A, where A[K] denotes the number of trees in the K-th section. To make the garden look more organized, we want the number of trees in every section to be the same. As we don't want to cut any trees down, we can perform either of the following actions:

- planting a new tree in one of the sections;
- replanting an existing tree, moving it from one section to another.

We want to minimize the number of actions performed.

---

### Write a function:

```function solution(A);```

that, given an array A consisting of N integers describing the garden, returns the minimum number of actions we need to perform in order to make all sections of the garden contain the same number of trees.

---

### Examples:

1. Given A = [1, 1, 2, 2, 4], the function should return 4.  
   We can move one tree from A[3] to A[1] and obtain A = [1, 3, 2, 3, 2]. Then we can plant two trees in A[0] and one tree in A[2] to make every section contain three trees.

2. Given A = [4, 2, 4, 6], the function should return 2.  
   We can move two trees from A[3] to A[1]. This way, every section in the garden will contain four trees.

3. Given A = [1, 1, 2, 1], the function should return 3.  
   We can plant one tree in A[0], A[1] and A[3] so that each section in the garden contains two trees.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [1..1,000,000,000];
- the answer is always less than or equal to 2,000,000,000.


## GardenArrangement

**Step-by-Step Explanation**

### 1. Problem Restatement

We have $N$ sections, each with $A[k]$ trees. We want every section to end up with the same number $T$ of trees.
Allowed actions (each counts as one move):

* **Planting** a new tree in a section ($+1$ to that section).
* **Replanting** a tree from one section to another ($-1$ from one, $+1$ to another).

We cannot cut down trees, so no section’s final count may be less than its initial count.

### 2. Determining the Target $T$

Let

$$
  S = \sum_{k=0}^{N-1} A[k].
$$

After redistribution and planting, the total number of trees will be $N \times T$. Because we never remove trees,

$$
  N \times T \;\ge\; S
  \quad\Longrightarrow\quad
  T \;\ge\; \bigl\lceil \tfrac{S}{N}\bigr\rceil.
$$

Choosing the smallest feasible $T = \lceil S/N\rceil$ minimizes the total number of new trees planted, and replanting moves simply transfer trees from surplus sections to deficit sections.

### 3. Computing the Number of Actions

Once $T$ is fixed, any section $k$ with $A[k] < T$ needs $(T - A[k])$ trees brought in (by planting or replanting). Sections with $A[k]\ge T$ supply those trees, at no extra “planting” cost. The total moves required is therefore

$$
  \sum_{k=0}^{N-1} \max\bigl(0,\,T - A[k]\bigr).
$$

### 4. Examples

* **A = \[1, 1, 2, 2, 4]**
  $N=5$, $S=10$ → $T=\lceil10/5\rceil=2$.
  Deficits = \[1,1,0,0,0] → sum = 2 moves.

* **A = \[4, 2, 4, 6]**
  $N=4$, $S=16$ → $T=\lceil16/4\rceil=4$.
  Deficits = \[0,2,0,0] → sum = 2 moves.

* **A = \[1, 1, 2, 1]**
  $N=4$, $S=5$ → $T=\lceil5/4\rceil=2$.
  Deficits = \[1,1,0,1] → sum = 3 moves.

### 5. TypeScript Solution

```ts
function solution(A: number[]): number {
  const N = A.length;
  const S = A.reduce((sum, x) => sum + x, 0);
  const T = Math.ceil(S / N);

  let actions = 0;
  for (const trees of A) {
    if (trees < T) {
      actions += (T - trees);
    }
  }

  return actions;
}
```

* **Time Complexity:** O(N)
* **Space Complexity:** O(1) (aside from input storage)
