**CreateDiverseWord**  
**Medium**  
50 min  
Join some of the given strings to create the longest possible string that contains neither "AAA" nor "BBB" as a fragment.

---

### Task description

There are two-letter strings, "AA", "AB" and "BB", which appear AA, AB and BB times respectively. The task is to join some of these strings to create the longest possible string which does not contain "AAA" or "BBB".

For example, having AA = 5, AB = 0 and BB = 2, it is possible to join five strings by taking both of the "BB" strings and three of the "AA" strings. Then they can be joined into:
```"AABBAABBAA"```
Note that it is not possible to add another "AA" string as the result would then contain "AAA".

---

### Write a function:
```function solution(AA, AB, BB);```

that, given three integers AA, AB and BB, returns the longest string that can be created according to the rules described above. If there is more than one possible answer, the function may return any of them.

---

### Examples:

1. Given AA = 5, AB = 0 and BB = 2, the function should return ```"AABBAABBAA"```, as explained above.  
2. Given AA = 1, AB = 2 and BB = 1, possible results are ```"ABABAAB"```, ```"ABAABAB"```, ```"ABABABA"```  
3. Given AA = 0, AB = 2 and BB = 0, the function should return ```"ABAB"```  
4. Given AA = 0, AB = 0 and BB = 10, the function should return ```"BB"```

---

### Assume that:

- AA, AB and BB are integers within the range [0..10];  
- the resulting string will not be empty.

---

**In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.**

## CreateDiverseWord

**Step-by-Step Explanation**

### 1. Problem Restatement

We have three types of two-letter blocks:

* `"AA"` available `AA` times
* `"AB"` available `AB` times
* `"BB"` available `BB` times

We want to concatenate some of these blocks (up to their available counts) into one long string that **never** contains `"AAA"` or `"BBB"` as a substring. Among all valid results, we must return **any** one whose length (in blocks used) is as large as possible.

### 2. Key Insight

Because `AA, AB, BB ≤ 10`, we can afford a dynamic‐programming search over states defined by:

* How many blocks of each type remain,
* What the last character was (`'A'` or `'B'` or none),
* How many times that character has repeated consecutively at the current end (1 or 2).

We memoize the best (longest) suffix we can build from each state.

### 3. State and Transitions

* **State** `(a, b, c, last, rep)` where

  * `a` = blocks `"AA"` remaining
  * `b` = blocks `"AB"` remaining
  * `c` = blocks `"BB"` remaining
  * `last` ∈ `{'A','B',''}` = the last character we have so far (empty at start)
  * `rep` ∈ `{0,1,2}` = how many times `last` repeated at the very end

* **Transitions**: For each block type with remaining count > 0, check if appending its two letters to the current tail would ever make three in a row. If safe, recurse on the new state with that count decremented and updated `(last, rep)`, then prepend the block.

We pick the block whose recursive suffix is **longest**, and memoize.

---

### 4. TypeScript Implementation

```ts
function solution(AA: number, AB: number, BB: number): string {
  // Memo key → best suffix
  const memo = new Map<string, string>();

  // Helper: given (last, rep, block), determine if safe and return new (last, rep)
  function tryAppend(
    last: string, rep: number,
    block: string
  ): [boolean, string, number] {
    let cur = last, cnt = rep;
    for (const ch of block) {
      if (ch === cur) {
        cnt++;
        if (cnt === 3) return [false, '', 0];  // would form AAA or BBB
      } else {
        cur = ch;
        cnt = 1;
      }
    }
    return [true, cur, cnt];
  }

  // DP recursion
  function dfs(a: number, b: number, c: number, last: string, rep: number): string {
    const key = `${a},${b},${c},${last},${rep}`;
    if (memo.has(key)) return memo.get(key)!;

    let best = "";  // best suffix from this state

    // Try using "AA"
    if (a > 0) {
      const [ok, nl, nr] = tryAppend(last, rep, "AA");
      if (ok) {
        const suffix = dfs(a - 1, b, c, nl, nr);
        if (suffix.length + 2 > best.length) {
          best = "AA" + suffix;
        }
      }
    }

    // Try using "AB"
    if (b > 0) {
      const [ok, nl, nr] = tryAppend(last, rep, "AB");
      if (ok) {
        const suffix = dfs(a, b - 1, c, nl, nr);
        if (suffix.length + 2 > best.length) {
          best = "AB" + suffix;
        }
      }
    }

    // Try using "BB"
    if (c > 0) {
      const [ok, nl, nr] = tryAppend(last, rep, "BB");
      if (ok) {
        const suffix = dfs(a, b, c - 1, nl, nr);
        if (suffix.length + 2 > best.length) {
          best = "BB" + suffix;
        }
      }
    }

    memo.set(key, best);
    return best;
  }

  // Start with no last character, rep=0
  const result = dfs(AA, AB, BB, "", 0);
  return result;
}
```

---

### 5. Examples

1. **AA=5, AB=0, BB=2**
   One valid maximal result is

   ```
   "AABBAABBAA"
   ```

   (uses all 2×"BB" and 3×"AA" blocks, no `"AAA"` or `"BBB"`).

2. **AA=1, AB=2, BB=1**
   Possible answers (all length 4 blocks = 8 chars):

   ```
   "ABABAB"
   "ABAABAB"
   ```

   etc., each avoiding triple runs.

3. **AA=0, AB=2, BB=0**
   Only `"ABAB"` is possible.

4. **AA=0, AB=0, BB=10**
   We can only use at most 1 `"BB"` block → `"BB"`.

The function returns any one of these maximal-length valid strings.
