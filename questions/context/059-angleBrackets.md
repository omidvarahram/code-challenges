# AngleBrackets

**Hard**
60 min
Find the maximum possible length of a symmetric fragment which can be obtained after replacing question marks in a given string with '<' or '>'.

---

## Task description

A string made of an even number of characters ('<' and/or '>') is called symmetric if all characters in its first half are '<' and all characters in its second half '>'. Example of symmetric strings are: "" (empty string), "<>", "<<>>", "<<<>>>", etc.

Write a function:

function solution(S);

that, given a string S made of N characters ('<', '>', and/or '?'), returns the length of the longest symmetric substring that can be obtained after replacing question marks with '<' or '>' characters.

### Examples

1. For S = "<?>??><", after replacing all question marks with '<', the string "<<>>" is obtained. Its longest symmetric substring is "<<>>", so the function should return 4.

2. For S = "??<???>", the optimal option is to replace the first three question marks with '<' and the next three question marks with '>', thus obtaining the string "<<<>>>". The function should return 6.

3. For S = "<<>", the function should return 2.

Write an efficient algorithm for the following assumptions:

* the length of string S is within the range \[1..200,000];
* string S is made only of the following characters: '<', '>', and/or '?'.

---

1. **Restate the question in clear language**
   You are given a string `S` with `<`, `>`, and `?` (where `?` can be replaced by either `<` or `>`).
   A *symmetric fragment* is any even-length substring whose first half consists only of `<` and the second half only of `>`.
   What is the length of the longest symmetric fragment you can create after optimally replacing all question marks?

2. **Important points**

   * Only substrings of even length can be symmetric.
   * For any candidate substring of length `2k`, its first `k` characters must be `<` or `?`, its last `k` must be `>` or `?`.
   * Goal: maximize `2k`.
   * Efficient solution is needed: O(N log N).

3. **Algorithm type**
   Sliding window with prefix sums, binary search for maximum length.

4. **Step-by-step solution**

   1. For all even lengths `2k` from largest down to 2, try all substrings of that length.
   2. For each window, check:

      * First half (positions `[i, i+k-1]`): all chars must be `<` or `?`.
      * Second half (positions `[i+k, i+2k-1]`): all chars must be `>` or `?`.
   3. To make checking O(1), precompute two prefix sums:

      * `notLeft[i+1]`: number of positions 0..i that are **not** `<` or `?`
      * `notRight[i+1]`: number of positions 0..i that are **not** `>` or `?`
   4. Use binary search for `k = N/2 .. 1` to find largest possible symmetric length.

5. **TypeScript solution**

   ```typescript
   function solution(S: string): number {
     const n = S.length;
     // Prefix sums: number of not-'<' in left, not-'>' in right
     const notLeft = new Uint32Array(n + 1);
     const notRight = new Uint32Array(n + 1);
     for (let i = 0; i < n; i++) {
       notLeft[i + 1] = notLeft[i] + (S[i] !== '<' && S[i] !== '?' ? 1 : 0);
       notRight[i + 1] = notRight[i] + (S[i] !== '>' && S[i] !== '?' ? 1 : 0);
     }

     // Try all even lengths, largest first
     for (let len = n - (n % 2); len >= 2; len -= 2) {
       const half = len / 2;
       for (let i = 0; i + len <= n; i++) {
         // [i, i+half-1] left half, [i+half, i+len-1] right half
         const badLeft = notLeft[i + half] - notLeft[i];
         const badRight = notRight[i + len] - notRight[i + half];
         if (badLeft === 0 && badRight === 0) {
           return len;
         }
       }
     }
     return 0;
   }
   ```

6. **Covering the examples**

   * `"<?>??><"` → longest symmetric substring is `"<<>>"`, output: **4**
   * `"??<???>"` → longest is `"<<<>>>"`, output: **6**
   * `"<<>"` → only possible is `"<<"`, output: **2**

7. **Additional test cases**

   | S          | Expected | Reason                                  |
   | ---------- | -------- | --------------------------------------- |
   | `"???"`    | 2        | can become `"<<"` or `">>"`             |
   | `"<>>><<"` | 2        | only `"<>"`, `">>"`, etc. are possible  |
   | `"??????"` | 6        | all can be made `<<<>>>`                |
   | `"<<<>>>"` | 6        | already symmetric                       |
   | `"????"`   | 4        | all can be made `"<<>>"`                |
   | `">>>>"`   | 0        | no left side of all `<`                 |
   | `"<<<<"`   | 0        | no right side of all `>`                |
   | `"<><><>"` | 2        | Only short fragments are possible       |
   | `""`       | 0        | Empty string (not possible here, N ≥ 1) |

This method works in O(N^2) in the worst case, but can be made O(N log N) with binary search on length and window sliding if needed for very large inputs.
