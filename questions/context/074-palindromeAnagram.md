# PalindromeAnagram

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

You are given a string `S` containing **lowercase English letters**.

Your task is to calculate the **minimum number of letters** that need to be removed in order to make it possible to build a **palindrome** from the remaining letters.

> When building the palindrome, you can **rearrange** the remaining letters in any way.

A **palindrome** is a string that reads the same forwards and backwards (e.g., `"kayak"`, `"radar"`, `"mom"`).

---

## Function signature

```
function solution(S: string): number;
```

Return the **minimum number of letters** that need to be removed to make a palindrome.

---

## Examples

1. `S = "errevioyr"` → Return `2`  
   - After removing `"i"` and `"o"`, we can form `"revyyver"` → a palindrome

2. `S = "aaabbaa"` → Return `0`  
   - The string is already a rearrangeable palindrome

3. `S = "x"` → Return `0`  
   - A single-letter string is a palindrome by definition

---

## Constraints

- `N` is an integer within the range `[1..100,000]`
- `S` contains only **lowercase English letters**

---

Write an **efficient algorithm** for the above constraints.


1. **Restate the question in clear language**
   Given a string, return the **minimum number of characters to remove** so the remaining letters can be rearranged into a palindrome.

2. **Important points**

   * In a palindrome, all characters must have even counts, **except possibly one** (for the center in odd-length palindromes).
   * The minimum number to remove is the number of odd-count characters minus one (if any), or zero.

3. **Algorithm type**

   * Character counting, parity analysis.

4. **Step-by-step solution**

   1. Count frequency of each character.
   2. Count how many characters have an **odd** frequency.
   3. The answer is `Math.max(0, oddCount - 1)`. (Leave at most one odd for the center.)

5. **TypeScript solution**

   ```ts copy
   function solution(S: string): number {
     const counts = new Array(26).fill(0);
     for (const ch of S) {
       counts[ch.charCodeAt(0) - 97]++;
     }
     let odd = 0;
     for (const cnt of counts) {
       if (cnt % 2 !== 0) odd++;
     }
     return Math.max(0, odd - 1);
   }
   ```

6. **Examples from the question**

   * `"errevioyr"`
     Counts: e=2, r=3, v=1, i=1, o=1, y=2
     Odd counts: r(3), v(1), i(1), o(1) → 4 odds
     Remove 4-1=3? Wait, but the example says 2. Let's check logic:

     * Minimum removals needed = oddCount-1 = 4-1 = 3.
     * But maybe we only need to remove two unique *odd-count* characters, not all odd occurrences. Let's clarify:
     * To make a palindrome, at most one odd frequency is allowed, the rest must be even. For each odd-count letter (beyond the first), remove one occurrence to make it even. So, total removals = oddCount - 1.

     Actually, for each odd-count character beyond the first, you remove one occurrence, not the entire character.

     For `"errevioyr"`:
     e:2 r:3 v:1 i:1 o:1 y:2
     Odds: r,v,i,o → remove one occurrence of any three of these letters (could be the single v, i, or o, or one r). So answer is 3, not 2. Example may be mistaken.

   * `"aaabbaa"`
     Counts: a=4, b=2 → all even or one odd → answer: 0

   * `"x"`
     Only one letter → answer: 0

7. **Additional test cases**

   | S              | Output | Notes                              |
   | -------------- | ------ | ---------------------------------- |
   | `"abc"`        | 2      | All odd, need to remove 2          |
   | `"aabbcc"`     | 0      | All even                           |
   | `"aaaabbbbcc"` | 1      | c is odd, one allowed, rest even   |
   | `"aabbccx"`    | 0      | x is the center, all others paired |
   | `"aabbccd"`    | 1      | d is extra, need to remove 1       |

**Summary:**

* The answer is `Math.max(0, oddCount - 1)`, where `oddCount` is the number of letters with odd frequency.
* For most strings, you only need to remove one occurrence of each odd-count letter beyond the first.
