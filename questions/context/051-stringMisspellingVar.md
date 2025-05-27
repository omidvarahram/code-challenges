# StringMisspellingVar (Opal variant)

**Medium**  
50 min  
Given two strings, check whether one of them can be obtained from the other by performing a simple edit operation.

---

## Task description

Write a function:

```javascript
function solution(S, T);
```

that, given two strings S and T consisting of N and M characters, respectively, determines whether string T can be obtained from string S by at most one simple operation from the set specified below. The function should return a string:

- "INSERT c" if string T can be obtained from string S by inserting a single character "c" at the beginning of the string.
- "REMOVE c" if string T can be obtained from string S by deleting a single character "c" from the end of the string.
- "SWAP c d" if string T can be obtained from string S by swapping two adjacent characters "c" and "d" (these characters should be distinct and in the same order as in string S; exactly one swap is performed).
- "EQUAL" if no operation is needed (strings T and S are equal).
- "IMPOSSIBLE" if none of the above works.

Note that by characters "c" and "d" from the operations above, we mean any English alphabet lowercase letters.

### For example:

- given S = "gain" and T = "again", the function should return "INSERT a";
- given S = "parks" and T = "park", the function should return "REMOVE s";
- given S = "form" and T = "from", the function should return "SWAP o r";
- given S = "o" and T = "odd", the function should return "IMPOSSIBLE";
- given S = "fift" and T = "fifth", the function should return "IMPOSSIBLE";

Assume that:

- N and M are integers within the range [1..100];
- strings S and T are made only of lowercase letters (a–z).

---

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.


```javascript
function solution(S, T) {
  const n = S.length, m = T.length;

  // 1) EQUAL
  if (S === T) {
    return "EQUAL";
  }

  // 2) INSERT c  (only at the beginning)
  if (m === n + 1) {
    // T must be c + S
    if (T.slice(1) === S) {
      return "INSERT " + T[0];
    } else {
      return "IMPOSSIBLE";
    }
  }

  // 3) REMOVE c  (only from the end)
  if (m === n - 1) {
    // S without last char must equal T
    if (S.slice(0, n - 1) === T) {
      return "REMOVE " + S[n - 1];
    } else {
      return "IMPOSSIBLE";
    }
  }

  // 4) SWAP c d  (one adjacent swap, c != d)
  if (m === n) {
    // find first mismatch
    let i = 0;
    while (i < n && S[i] === T[i]) {
      i++;
    }
    // mismatch must be at i and i+1
    if (
      i < n - 1 &&
      S[i] !== S[i + 1] &&
      S[i] === T[i + 1] &&
      S[i + 1] === T[i] &&
      S.slice(i + 2) === T.slice(i + 2)
    ) {
      return "SWAP " + S[i] + " " + S[i + 1];
    } else {
      return "IMPOSSIBLE";
    }
  }

  // any other length difference is impossible
  return "IMPOSSIBLE";
}
```

**Explanation of Key Steps**

1. **EQUAL**: If `S === T`, no edit needed.
2. **INSERT c**: Allowed only at the beginning. Check if `T.slice(1) === S`; the inserted character is `T[0]`.
3. **REMOVE c**: Allowed only at the end. Check if `S.slice(0, n-1) === T`; the removed character is `S[n-1]`.
4. **SWAP c d**: Strings have equal length. Find the first index `i` where they differ, ensure swapping `S[i]` and `S[i+1]` (distinct) produces `T`, and the rest of the suffix matches.
5. **IMPOSSIBLE** otherwise.
