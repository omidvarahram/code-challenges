# CommonLetter

**Easy**  
**40 min**

Given an array of strings, find a pair of strings that share the same letter at the same position.

---

## Task description

You are given an array S consisting of N strings. Every string is of the same length M. Your task is to find a pair of strings in array S, such that there exists a position in which both of the strings have the same letter. Both the index in array S and the positions in the strings are numbered from zero.

For example, given S = ["abc", "bca", "dbe"], string 0 ("abc") and string 2 ("dbe") have the same letter 'b' in position 1. On the other hand, for strings "abc" and "bca" there does not exist a position in which they have the same letter.

Write a function:

``` ts
function solution(S);
```

that, given a zero-indexed array S of N strings, returns an array describing a pair of strings from S which share a common letter at some index. If there is no such pair, the function should return an empty array. If there is more than one correct answer, the function can return any of them.

The result should be represented as an array containing three integers. The first two integers are the indexes in S of the strings belonging to the pair. The third integer is the position of the common letter.

For S = ["abc", "bca", "dbe"], as above, the result array should be represented as [0, 2, 1].  
Another correct answer is [2, 0, 1], as the order of indexes of strings does not matter.

---

### Examples:

1. Given S = ["abc", "bca", "dbe"], your function may return [0, 2, 1] as described above.

2. Given S = ["zzzz", "ferz", "zdsr", "fgtd"], your function may return [0, 1, 3]. Both "zzzz" and "ferz" have 'z' in position 3. The function may also return [1, 3, 0], which would reflect strings "ferz", "fgtd" and letter 'f'.

3. Given A = ["gr", "sd", "rg"], your function should return []. There is no pair of strings that fulfils the criteria.

4. Given A = ["bdafg", "ceagi"], your function may return [0, 1, 2].

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..30,000];
- M is an integer within the range [1..2,000];
- each element of S consists only of lowercase English letters (a–z);
- N * M ≤ 30,000.


# Task 4

## CommonLetter

**Step-by-Step Explanation**

### Step 1: Understand the Problem

You are given:
- An array of `N` strings `S`, each of length `M`.
- You need to find a **pair of strings** `i` and `j` and a **position `k`**, such that:
  - `S[i][k] === S[j][k]`
- Return `[i, j, k]` (or `[j, i, k]`)
- If no such pair exists, return `[]`.

---

### Step 2: Constraints and Optimization

- N can be up to 30,000
- M can be up to 2,000
- But the **total number of characters** is capped at 30,000 → so average string length is small

We want a **fast lookup** for each character at each position.

---

### Step 3: Efficient Approach

1. For each **position `k`** (0 to M-1):
   - Create a hash map: `Map<letter + k, index>`
   - For each string:
     - Check if map contains the key `letter@k`
       - If yes → we found a pair, return `[prevIndex, currentIndex, k]`
       - If no → store it in the map

This ensures:
- One pass over all strings and characters.
- Early exit when we find the first valid match.

---

### Step 4: TypeScript Code

```ts
function solution(S: string[]): number[] {
  const seen = new Map<string, number>();

  for (let i = 0; i < S.length; i++) {
    const word = S[i];

    for (let k = 0; k < word.length; k++) {
      const key = `${word[k]}@${k}`;

      if (seen.has(key)) {
        return [seen.get(key)!, i, k];
      }

      seen.set(key, i);
    }
  }

  return [];
}
```

---

### Step 5: Example Walkthrough

**Input:**
- S = ["abc", "bca", "dbe"]

Loop:
- i = 0 → "abc":
  - key: a@0 → store
  - key: b@1 → store
  - key: c@2 → store
- i = 1 → "bca":
  - key: b@0 → new
  - key: c@1 → new
  - key: a@2 → new
- i = 2 → "dbe":
  - key: d@0 → new
  - key: b@1 → found → return [0, 2, 1]

---

### Step 6: Time & Space Complexity

- **Time Complexity:** O(N * M) — since total N * M ≤ 30,000
- **Space Complexity:** O(N * M) for map storage

This solution is optimal within given constraints.

