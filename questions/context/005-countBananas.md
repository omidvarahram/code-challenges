# CountBananas

**Easy**  
**20 min**

Calculate how many times you can print the word "BANANA" using the letters given in string S.

---

## Task description

A string S made of uppercase English letters is given. In one move, six letters forming the word **"BANANA"** (one 'B', three 'A's and two 'N's) can be deleted from S. What is the maximum number times such a move can be applied to S?

Write a function:

``` ts
function solution(S);
```

that, given a string S of length N, returns the maximum number of moves that can be applied.

---

### Examples:

1. Given S = "NAABXXAN", the function should return 1.

2. Given S = "NAANAAXNABABYNNBZ", the function should return 2.

3. Given S = "QABAAAWOBL", the function should return 0.

---

## Write an efficient algorithm for the following assumptions:

- N is an integer within the range [1..100,000];
- string S is made only of uppercase letters (A–Z).
