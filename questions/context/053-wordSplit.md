# WordSplit

**Medium**  
20 min  
Given a string consisting only of lowercase letters, split it into a minimal number of substrings such that each substring contains no letter more than once.

## Task description

You are given a string consisting of lowercase letters of the English alphabet. You must split this string into a minimal number of substrings in such a way that no letter occurs more than once in each substring.

For example, here are some correct splits of the string "abacdec": ('a', 'bac', 'dec'), ('a', 'bacd', 'ec') and ('ab', 'ac', 'dec').

Write a function:

```function solution(S);```

that, given a string S of length N, returns the minimum number of substrings into which the string has to be split.

## Examples:

1. Given 'world', your function should return 1. There is no need to split the string into substrings as all letters occur just once.

2. Given 'dddd', your function should return 4. The result can be achieved by splitting the string into four substrings ('d', 'd', 'd', 'd').

3. Given 'cycle', your function should return 2. The result can be achieved by splitting the string into two substrings ('cy', 'cle') or ('c', 'ycle').

4. Given 'abba', your function should return 2. The result can be achieved by splitting the string into two substrings ('ab', 'ba').

## Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..1,000,000];
- string S is made only of lowercase letters (a–z).

To minimize the number of substrings so that each has no repeated letters, you can use a simple greedy scan:

1. Initialize a counter `count = 1` (at least one substring).
2. Maintain a `seen` array of 26 booleans for letters in the current substring.
3. For each character `c` in `S`:

   * If `seen[c]` is `false`, mark it `true` and continue.
   * If `seen[c]` is already `true`, you must start a new substring:

     * Increment `count`.
     * Reset `seen` to all `false`.
     * Mark `seen[c] = true` for the new substring.
4. Return `count`.

This runs in $O(N)$ time and $O(1)$ extra space (just a 26‐element array).

```js
function solution(S) {
  let count = 1;
  const seen = Array(26).fill(false);

  for (let i = 0; i < S.length; i++) {
    const idx = S.charCodeAt(i) - 97;
    if (seen[idx]) {
      // start new substring
      count++;
      seen.fill(false);
    }
    seen[idx] = true;
  }

  return count;
}
```

**Explanation of Key Steps**

* We always extend the current substring while possible (no repeats).
* When we encounter a repeated letter, we “cut” before it, increment our substring count, reset our tracking, and begin a new substring at that letter.
* This greedy strategy is optimal, because any encounter of a repeat *must* force a split at or before that point, and delaying the split cannot reduce the total number of splits.
