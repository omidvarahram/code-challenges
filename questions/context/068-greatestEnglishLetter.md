# GreatestEnglishLetter

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

You are given a string `S` consisting of English letters.  
We want to find the **greatest English letter** that appears in **both uppercase and lowercase** in the string.

> The result should be returned in **uppercase**.  
> If no such letter exists, return an **empty string**.

---

### Notes:
- One letter is considered **greater** than another if it appears **later** in the English alphabet.
- For example, `'B'` is greater than `'A'`, and `'Z'` is the greatest possible letter.

---

### Function signature

```
function solution(S: string): string;
```

---

## Examples

1. Given `S = "admeDCAB"`, your function should return `"D"`  
   - Letters occurring in both upper and lower cases: A, B, C, D  
   - D is the greatest among them.

2. Given `S = "AaBbCc"`, your function should return `"C"`

3. Given `S = "abc"`, your function should return `""` (empty string)

---

## Constraints

- `S` is a string with length in range `[1..200,000]`
- `S` contains only English letters (`a–z`, `A–Z`)
- The result must be returned in **uppercase**

---

Write an **efficient algorithm** for the given constraints.


1. **Restate the question in clear language**
   Given a string, return the **greatest English letter** (alphabetically, uppercase) that appears **in both uppercase and lowercase** forms in the string. Return `""` if none.

2. **Important points**

   * "Greatest" means the letter closest to `'Z'`.
   * Must appear as both uppercase and lowercase at least once.
   * Output is always uppercase.
   * Efficient solution needed for large strings.

3. **Algorithm type**

   * Set membership check for fast lookup.

4. **Step-by-step solution**

   1. Build two Sets: one for lowercase letters in `S`, one for uppercase.
   2. For each letter from `'Z'` down to `'A'`, check if both uppercase and lowercase forms appear in the sets.
   3. Return the first such letter found, or `""` if none.

5. **TypeScript solution**

   ```ts copy
   function solution(S: string): string {
     const lower = new Set<string>();
     const upper = new Set<string>();
     for (const ch of S) {
       if (ch >= 'a' && ch <= 'z') {
         lower.add(ch);
       } else if (ch >= 'A' && ch <= 'Z') {
         upper.add(ch);
       }
     }
     for (let i = 25; i >= 0; i--) {
       const up = String.fromCharCode(65 + i);
       const low = String.fromCharCode(97 + i);
       if (upper.has(up) && lower.has(low)) {
         return up;
       }
     }
     return "";
   }
   ```

6. **Examples from the question**

   * `"admeDCAB"` → greatest in both cases: D → returns `"D"`
   * `"AaBbCc"` → C → returns `"C"`
   * `"abc"` → none → returns `""`

7. **Additional test cases**

   | S                              | Output | Notes                      |
   | ------------------------------ | ------ | -------------------------- |
   | `"aAbBcCzZ"`                   | `"Z"`  | Z is the greatest          |
   | `"abcdefghijklmnopqrstuvwxyz"` | `""`   | No uppercase               |
   | `"ABCDEFGHIJKLMNOPQRSTUVWXYZ"` | `""`   | No lowercase               |
   | `"aAzZ"`                       | `"Z"`  | Both a/A and z/Z, return Z |
   | `"qQwWeErRtTyY"`               | `"Y"`  | Y is greatest among shared |
   | `"xYz"`                        | `""`   | No lowercase 'y', only 'Y' |
