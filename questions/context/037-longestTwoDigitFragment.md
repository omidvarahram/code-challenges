LongestTwoDigitFragment  
Medium  
50 min  
Find the length of the longest fragment in a given array which can be written down using at most two different digits.

Task description  

Write a function:  
```function solution(A);```

that, given an array A of N integers, returns the length of the longest consistent fragment of A in which all elements can be generated using at most two different digits. You must use the same digits for all elements.

Examples:  
1. Given A = [23, 333, 33, 30, 0, 505], the function should return 4. Elements 333, 33, 30 and 0 can be generated using only digits 0 and 3.

2. Given A = [615, 88, 498, 99, 9], the function should return 2. The last two elements can be generated using only digit 9.

3. Given A = [123, 456], the function should return 0.

Assume that:
- N is an integer within the range [1..100];
- each element of array A is an integer within the range [0..1,000,000,000].

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.
