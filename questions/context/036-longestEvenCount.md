LongestEvenCount  
Medium  
50 min  
Given a string, return the longest substring in which every letter occurs an even number of times.

Task description  

Write a function:  
```function solution(S);```

that, given a string S consisting of N lowercase English letters, returns the length of the longest substring in which every letter occurs an even number of times. A substring is defined as a contiguous segment of a string. If no such substring exists, return 0.

Examples:  
1. Given S = "bdaaadadb", the function should return 6. Substrings in which every letter occurs an even number of times are "aa", "adad", "daaad" and "aaadad". The length of the longest of them is 6.

2. Given S = "habcb", the function should return 0. There is no non-empty substring in which every letter occurs an even number of times.

3. Given S = "zthtzh", the function should return 6. Every letter in the whole string occurs an even number of times.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- string S consists only of lowercase letters ('a'–'z').
