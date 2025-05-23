XYSplit  
Easy  
40 min  
Given a string, return the number of ways to split it into two parts, such that at least one of the parts has an equal number of 'x's and 'y's.

---

### Task description

You are given a string S consisting of N lowercase English letters. In how many ways can we split S into two non-empty parts, such that in at least one part the letter 'x' and the letter 'y' occur the same number of times?

### Write a function:
```function solution(S);```

that, given a string S of length N, returns the number of splits S satisfying the condition above.

---

### Examples:

1. Given S = "ayxbx", the function should return 3.  
   There are four possible splits of S: "a/yxbx", "ay/xbx", "ayx/bx" and "ayxb/x".  
   Only "ay/xbx" does not fulfill the condition, so the answer is 3.  
   Note that in "a/yxbx" the left part has 0 occurrences of 'x' and 'y', so it counts as a correct split.

2. Given S = "xzzzy", the function should return 0.

3. Given S = "toyxmy", the function should return 5.

4. Given S = "apple", the function should return 4.

---

### Write an efficient algorithm for the following assumptions:
- N is an integer within the range [2..200,000];
- string S is made only of lowercase letters (a–z).
