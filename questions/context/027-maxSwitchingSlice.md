MaxSwitchingSlice  
Easy  
40 min  
Given an array, find the length of the longest switching slice.

## Task description

We call an array switching if all numbers in even positions are equal and all numbers in odd positions are equal.

For example: [3, −7, 3, −7, 3] and [4, 4, 4, 4] are switching, but [5, 5, 4, 5, 4] and [−3, 2, 3] are not switching.

What is the length of the longest switching slice (continuous fragment) in a given array A?

### Write a function:

```function solution(A);```

that, given an array A consisting of N integers, returns the length of the longest switching slice in A.

### Examples:

1. Given A = [3, 2, 3, 2, 3], the function should return 5, because the whole array is switching.  
2. Given A = [7, 4, −2, 4, −2, −9], the function should return 4. The longest switching slice is [4, −2, 4, −2].  
3. Given A = [7, −5, −5, −5, 7, −1, 7], the function should return 3. There are two switching slices of equal length: [−5, −5, −5] and [7, −1, 7].  
4. Given A = [4], the function should return 1. A single-element slice is also a switching slice.

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].

# MaxSwitchingSlice

**Step-by-Step Explanation**

### Step 1: Understand the Problem
We want the longest contiguous subarray (“slice”) of `A` such that:
- Every element at an even index within the slice is the same value.
- Every element at an odd index within the slice is the same value.

Indices here are **relative** to the start of the slice (slice index 0,1,2…).

### Step 2: Greedy Two-Pointer Scan
We’ll scan once with a “start” pointer `s` and extend an end pointer `i`.  
Maintain:
- `evenVal` = value expected at even positions in the current slice (initialized to `A[s]`)
- `oddVal`  = value expected at odd positions in the current slice
- `oddSet`  = whether `oddVal` is already defined

At each `i`:
1. Compute `pos = i - s` (relative index within slice).
2. If `pos` is even:
   - Check `A[i] === evenVal`.
3. If `pos` is odd:
   - If `oddSet` is false, set `oddVal = A[i]`, `oddSet = true`.
   - Else check `A[i] === oddVal`.
4. If it matches, continue.
5. On **mismatch**, we finalize the previous slice of length `(i - s)`, update `ans`, and **restart** a new slice from `s = i - 1`:
   - `evenVal = A[s]`
   - `oddVal  = A[i]`
   - `oddSet  = true`
   - (since the new slice positions 0 and 1 are at `s` and `i`)

After the loop, check the last slice length `N - s`.

---

### TypeScript Code

```ts
function solution(A: number[]): number {
  const N = A.length;
  if (N === 0) return 0;

  let ans = 0;
  let s = 0;                    // start of current slice
  let evenVal = A[0];           // value for even positions
  let oddVal = 0;               // value for odd positions
  let oddSet = false;           // whether oddVal is set

  for (let i = 1; i < N; i++) {
    const pos = i - s;
    const isEvenPos = (pos % 2 === 0);
    let match = false;

    if (isEvenPos) {
      match = (A[i] === evenVal);
    } else {
      if (!oddSet) {
        oddVal = A[i];
        oddSet = true;
        match = true;
      } else {
        match = (A[i] === oddVal);
      }
    }

    if (!match) {
      // finalize previous slice
      ans = Math.max(ans, i - s);

      // start new slice at i-1
      s = i - 1;
      evenVal = A[s];
      oddVal  = A[i];
      oddSet  = true;
      // (we do NOT increment i here; next loop iteration continues)
    }
  }

  // final slice to end
  ans = Math.max(ans, N - s);
  return ans;
}
```  

---

### Example Walkthrough

**A = [7, 4, −2, 4, −2, −9]**

- Start `s=0`, `evenVal=7`
- `i=1` (pos=1 odd): set `oddVal=4`
- `i=2` (pos=2 even): `A[2]=−2≠7` → mismatch  
  → slice length = `2`, restart `s=1`, `evenVal=4`, `oddVal=−2`
- `i=3` (pos=2 even): `A[3]=4===4` → ok
- `i=4` (pos=3 odd): `A[4]=−2===oddVal` → ok
- `i=5` (pos=4 even): `A[5]=−9≠4` → mismatch  
  → slice length = `5−1=4`, restart `s=4`, `evenVal=−2`, `oddVal=−9`
- End: final slice `[−2, −9, 7]` length `6−4=2`  
- **Answer = max(2, 4, 2) = 4**

---

**Time Complexity:** O(N)  
**Space Complexity:** O(1)  
Efficient for N up to 100,000.  
