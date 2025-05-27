FreeingStorageSpace  
Medium  
50 min  
Compute how many types of items can stay in a storeroom after removing R consecutive items.

---

### Task description

A storeroom is used to organize items stored in it on N shelves. Shelves are numbered from 0 to N−1. The K-th shelf is dedicated to items of only one type, denoted by a positive integer A[K].

Recently it was decided that it is necessary to free R consecutive shelves. Shelves cannot be reordered. What is the maximum number of types of items which still can be stored in the storeroom after freeing R consecutive shelves?

---

### Write a function:

```function solution(A, R);```

that, given an array A of N integers representing types of items stored on storeroom shelves, and an integer R representing the number of consecutive shelves to be freed, returns the maximum number of different types of items that can be stored in the storeroom after freeing R consecutive shelves.

---

### Examples:

1. Given A = [2, 1, 2, 3, 2, 2] and R = 3, your function should return 2.  
   It can be achieved, for example, by freeing shelves 2, 3 and 4 (shelves are numbered from 0).

2. Given A = [2, 3, 1, 1, 2] and R = 2, your function should return 3.  
   All three types can still be stored by freeing the last two shelves.

3. Given A = [20, 10, 10, 10, 10, 30, 20] and R = 3, your function should return 3.  
   It can be achieved by freeing the first three shelves.

4. Given A = [1, 100000] and R = 3, your function should return 0.  
   All shelves need to be freed.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- R is an integer within the range [1..N];
- each element of array A is integer within range [1..100,000]


## FreeingStorageSpace

**Step-by-Step Explanation**

### Step 1: Understand the Problem  
We have `N` shelves in a row, each storing items of a single type `A[k]`. We must choose `R` **consecutive** shelves to free (remove), and we want to **maximize** the number of **distinct** item types that **remain** on the other `N−R` shelves.

---

### Step 2: Reformulate with Frequencies  
1. Let `totalFreq[t]` be the total count of type `t` across **all** shelves.  
2. Let `totalDistinct =` number of keys in `totalFreq`.  
3. When we remove a block of `R` shelves (say indices `i..i+R−1`), types whose **entire** occurrences lie in that block will **disappear**.  
4. For each candidate block, count how many types `t` satisfy  
```

windowFreq\[t] == totalFreq\[t]

```
(i.e. that type’s occurrences are **all** inside the block). Call that `goneCount`.  
5. The number of distinct types **remaining** is  
```

remainingDistinct = totalDistinct − goneCount

```
6. We slide an `R`-length window from start to end, maintain `windowFreq` and `goneCount`, and track the **maximum** `remainingDistinct`.

This runs in **O(N)** time with a hash map for frequencies.

---

### Step 3: Examples

- **Example 1**  
- `A = [2,1,2,3,2,2], R=3`  
- Total freq: `{1:1,2:4,3:1}`, totalDistinct=3  
- Slide windows of length 3:
 1. Remove `[2,1,2]`: windowFreq `{1:1,2:2}` → types gone: none (1 appears once but totalFreq[1]=1? Actually windowFreq[1]=1==totalFreq[1], so type 1 disappears; windowFreq[2]=2<4, 3 unaffected) → goneCount=1 → remaining=2  
 2. `[1,2,3]`: `{1:1,2:1,3:1}` → 1 and 3 fully gone → goneCount=2 → rem=1  
 3. `[2,3,2]`: `{2:2,3:1}` → 3 gone → rem=2  
 4. `[3,2,2]`: `{2:2,3:1}` → 3 gone → rem=2  
- Maximum-remaining = **2**

- **Example 2**  
- `A = [2,3,1,1,2], R=2`  
- totalFreq `{1:2,2:2,3:1}`, distinct=3  
- Windows (length 2):  
 - `[2,3]` → `{2:1,3:1}` → none fully gone → rem=3  
 - `[3,1]` → `{3:1,1:1}` → 3 gone → rem=2  
 - `[1,1]` → `{1:2}` → 1 gone → rem=2  
 - `[1,2]` → `{1:1,2:1}` → none → rem=3  
- Answer = **3**

---

```ts
function solution(A: number[], R: number): number {
const N = A.length;
// 1) total frequencies
const totalFreq = new Map<number, number>();
for (const t of A) {
 totalFreq.set(t, (totalFreq.get(t) || 0) + 1);
}
const totalDistinct = totalFreq.size;

// 2) sliding window of length R
const windowFreq = new Map<number, number>();
let goneCount = 0;
// helper to adjust a type's count in window and goneCount
const add = (t: number) => {
 const prev = windowFreq.get(t) || 0;
 windowFreq.set(t, prev + 1);
 if (prev + 1 === totalFreq.get(t)) goneCount++;
};
const remove = (t: number) => {
 const prev = windowFreq.get(t)!;
 if (prev === totalFreq.get(t)) goneCount--;
 if (prev === 1) windowFreq.delete(t);
 else windowFreq.set(t, prev - 1);
};

// initialize first window
for (let i = 0; i < R; i++) {
 add(A[i]);
}
let best = totalDistinct - goneCount;

// slide
for (let i = R; i < N; i++) {
 add(A[i]);
 remove(A[i - R]);
 best = Math.max(best, totalDistinct - goneCount);
}

return best;
}
```
