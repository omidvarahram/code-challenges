# EvenWord

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

In an **even word**, each letter occurs an **even number of times**.

Write a function:

```
function solution(S: string): number;
```

that, given a string `S` consisting of `N` characters, returns the **minimum number of letters that must be deleted** to obtain an even word.

---

## Examples

1. Given `S = "acbbca"`, the function should return `1`  
   - One letter (b) must be deleted.

2. Given `S = "axxaxa"`, the function should return `2`  
   - One letter `a` and one letter `x` must be deleted.

3. Given `S = "aaaa"`, the function should return `0`  
   - No need to delete any letters.

---

## Constraints

- `N` is an integer within the range `[0..200,000]`
- String `S` is made **only of lowercase letters** (`a–z`)

---

Write an **efficient algorithm** for the constraints above.


1. **Restate the question in clear language**
   Given a string, how many letters must be deleted so that every character appears an even number of times?

2. **Important points**

   * For each character, if it appears an odd number of times, we need to delete one occurrence to make it even.
   * The answer is the sum of (count % 2) for each character.

3. **Algorithm type**

   * Character frequency counting.

4. **Step-by-step solution**

   1. Create an array of length 26 to count occurrences of each letter.
   2. Loop through the string and increment the corresponding count for each character.
   3. For each count, if it is odd, add 1 to the total deletions needed.
   4. Return the total deletions.

5. **TypeScript solution**

   ```ts copy
   function solution(S: string): number {
     const counts = new Array(26).fill(0);
     for (const ch of S) {
       counts[ch.charCodeAt(0) - 97]++;
     }
     let deletions = 0;
     for (const cnt of counts) {
       if (cnt % 2 !== 0) deletions++;
     }
     return deletions;
   }
   ```

6. **Examples from the question**

   * `"acbbca"`: counts: a=2, c=2, b=2 → all even → 0 (But see example wants 1: original input has b=2; b=2 is even. But let's check carefully.)

     * Actually: "acbbca": a=2, c=2, b=2 → all even → 0, but example says 1. Let's see: acbbca (a:2, b:2, c:2): all even, so 0 deletions.
     * Are the examples correct? Wait, "acbbca" after removing any b becomes a=2, b=1, c=2? No, let's follow the sum of odds. Let's keep the code as above, but keep in mind the explanation.

   * `"axxaxa"`: a=4, x=2 → all even → 0 (but example wants 2). Let's check carefully.

     * Actually, axxaxa: a=3, x=3. So both are odd; need to delete 1 'a' and 1 'x' → 2 deletions.

   * `"aaaa"`: a=4 → 0 deletions.

7. **Additional test cases**

   | S          | Output | Reason                              |
   | ---------- | ------ | ----------------------------------- |
   | `""`       | 0      | Empty string, no deletions needed   |
   | `"a"`      | 1      | One letter, needs one deletion      |
   | `"aaabbb"` | 2      | Both a and b appear 3 times         |
   | `"abcabc"` | 0      | All letters even                    |
   | `"abcd"`   | 4      | All appear once, need to delete all |

**Note:**
You only need to delete enough characters so that each letter appears an even number of times. If a letter appears an odd number of times, you delete 1 occurrence. The sum for all odd-count letters is your answer.
