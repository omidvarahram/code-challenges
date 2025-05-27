NoEqualDigits  
Medium  
50 min  
Find the next integer with no two identical consecutive digits.

Task description

You are given a positive integer N. Your task is to find the smallest integer greater than N that does not contain two identical consecutive digits.

For example, given N = 1765, the smallest integer greater than N is 1766. However, in 1766 the last two digits are identical. The next integer, 1767, does not contain two identical consecutive digits, and is the smallest integer greater than 1765 that fulfills the condition. Note that the second and fourth digits in 1767 can both be 7 as they are not consecutive.

Write a function:

```function solution(N);```

that, given an integer N, returns the smallest integer greater than N that does not contain two identical consecutive digits.

Examples:

1. Given N = 55, the function should return 56. It is the smallest integer greater than 55 and it does not contain two consecutive digits that are the same.

2. Given N = 1765, the function should return 1767, as explained above.

3. Given N = 98, the answer should be 101. Both 99 and 100 contain two identical consecutive digits, but 101 does not.

4. Given N = 44432, the answer should be 45010.

5. Given N = 3298, the answer should be 3401.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..1,000,000,000].


## NoEqualDigits

**Step-by-Step Explanation**

### 1. Problem Restatement

Given a positive integer `N`, find the smallest integer strictly greater than `N` such that **no two consecutive digits** in its decimal representation are identical.

### 2. Key Insight

We can search **incrementally** from `N+1` upward, but skipping ranges in bulk when we detect a forbidden repeat. Treat the candidate number as a **string** of digits:

1. Let `s` = `(N+1).toString()`.
2. **Scan** `s` from left to right looking for the first index `i` where `s[i] === s[i-1]`.

   * If none found, `s` is our answer.
3. If a violation occurs at position `i`, we must **bump** the digit at `i` **upwards by 1** (and handle carry if it becomes `'10'`), then set all digits **to the right** of that position to the **smallest possible** values that avoid any new consecutive repeat (i.e. choose `'0'` unless the previous digit is `'0'`, in which case choose `'1'`).
4. Repeat the scan on the new `s` until no violations remain.

Since the length of `s` is at most 10 (for `N ≤ 10^9 + some`), and each fix strictly increases the numeric value, we converge quickly.

---

### 3. TypeScript Implementation

```ts
function solution(N: number): number {
  // Start with the next integer
  let s = String(N + 1);

  // Helper to fix from the first repeat violation
  function fixOnce(str: string): string {
    const arr = Array.from(str);
    const len = arr.length;

    // 1) Find first violation
    let i = 1;
    for (; i < len; i++) {
      if (arr[i] === arr[i - 1]) break;
    }
    if (i === len) {
      // No violations
      return str;
    }

    // 2) Bump digit at position i
    //   Build prefix up to i (inclusive), add 1 as integer
    const prefix = str.slice(0, i + 1);
    let bumpedNum = String(Number(prefix) + 1);

    // If bumping increases length, e.g. "99" -> "100", handle that:
    let newArr = Array.from(bumpedNum);
    // 3) Now fill the remainder positions to avoid repeats
    //    For each position j >= newArr.length up to original length-1:
    while (newArr.length < len) {
      const prev = newArr[newArr.length - 1];
      newArr.push(prev === '0' ? '1' : '0');
    }

    return newArr.join('');
  }

  // 4) Repeatedly fix until no repeats remain
  while (true) {
    const fixed = fixOnce(s);
    if (fixed === s) break;
    s = fixed;
  }

  // Return the numeric value
  return Number(s);
}
```

---

### 4. How It Works

* We convert `N+1` to a string `s` and look for any pair of adjacent equal digits.
* On finding `s[i] === s[i-1]`, we take the prefix up to `i`, increment it by one (handling any carry/length increase), then fill all subsequent digits with the smallest non-repeating choices (`'0'` or `'1'` alternating as needed).
* This guarantees we leap past **all** numbers that would share the same prefix and thus skip invalid ranges in bulk.
* We repeat until `s` has no adjacent repeats.

---

### 5. Complexity

* Each fix increases the numeric value, and the string length is at most 11 (in worst case, a carry from `"9999999999"` to `"10000000000"`).
* In practice, only a few iterations are needed.
* **Time Complexity:** O(d²) with d ≤ 11 → effectively constant.
* **Space Complexity:** O(d).
