# DistinctNumbersCount

**Easy**  
**40 min**  
Count the minimum number of integers that must be deleted from an array so that no two integers occur the same number of times.

## Task description

An array `A` consisting of `N` integers is given. Our goal is to obtain an array in which every value occurs a unique number of times. We only consider integers that appear at least once in the resulting array. To achieve the goal, we can delete some integers from `A`. What is the **minimum number of integers** that must be deleted from `A` so that every remaining value occurs a unique number of times?

Write a function:

```function solution(A);```

that, given an array `A` consisting of `N` integers, returns the minimum number of integers that must be deleted from it so that every remaining value occurs a unique number of times.

### Examples:

1. Given `A = [1, 1, 1, 2, 2, 2]`, the function should return `1`.  
   We can delete one occurrence of `1` or one occurrence of `2`. After this operation, one value will occur three times and the other two times.

2. Given `A = [5, 3, 3, 2, 5, 2, 3, 2]`, the function should return `2`.  
   After deleting number `3` twice, the remaining elements of the array are `[5, 2, 5, 2, 3, 2]`. In this array no two numbers occur the same number of times.

3. Given `A = [127, 15, 3, 8, 10]`, the function should return `4`.  
   All elements of the array occur exactly once. We have to delete all but one element.

4. Given `A = [1000000000, 1000000000, 5, 5, 5, 2, 2, 2, 0, 0]`, the function should return `4`.

## Write an efficient algorithm for the following assumptions:

- `N` is an integer within the range `[1..200,000]`;
- each element of array `A` is an integer within the range `[0..1,000,000,000]`.

# DistinctNumbersCount

**Step-by-Step Explanation**

### Step 1: Count Frequencies  
Use a map to count how many times each integer appears in `A`.

### Step 2: Extract and Sort Frequencies  
Collect all frequency values into an array `freqs` and sort descending.

### Step 3: Greedy Reduction to Unique Counts  
Maintain `maxAllowed = Infinity`.  
For each frequency `f` in `freqs`:
1. Let `allowed = Math.min(f, maxAllowed)`.
2. If `allowed < 0`, set `allowed = 0`.
3. Add `(f - allowed)` to the deletion count.
4. Update `maxAllowed = allowed - 1` for the next iteration.

This ensures each chosen `allowed` frequency is strictly less than the previous one, hence all unique.

---

### TypeScript Code

```ts
function solution(A: number[]): number {
  // Step 1: build frequency map
  const freqMap = new Map<number, number>();
  for (const x of A) {
    freqMap.set(x, (freqMap.get(x) || 0) + 1);
  }

  // Step 2: extract and sort frequencies descending
  const freqs = Array.from(freqMap.values()).sort((a, b) => b - a);

  // Step 3: greedily reduce to unique frequencies
  let deletions = 0;
  let maxAllowed = Infinity;

  for (const f of freqs) {
    // choose the highest allowed count <= f
    const allowed = Math.max(0, Math.min(f, maxAllowed));
    deletions += f - allowed;
    maxAllowed = allowed - 1;
  }

  return deletions;
}
```  

---

**Time Complexity:**  
- Counting: O(N)  
- Sorting U frequencies: O(U log U), where U ≤ N distinct values  
- Total: O(N + U log U)

**Space Complexity:** O(U) for the frequency map and list.  
Efficient for N up to 200,000.  
