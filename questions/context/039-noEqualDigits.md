NoEqualDigits  
Medium  
50 min  
Find the next integer with no two identical consecutive digits.

Task description

You are given a positive integer N. Your task is to find the smallest integer greater than N that does not contain two identical consecutive digits.

For example, given N = 1765, the smallest integer greater than N is 1766. However, in 1766 the last two digits are identical. The next integer, 1767, does not contain two identical consecutive digits, and is the smallest integer greater than 1765 that fulfills the condition. Note that the second and fourth digits in 1767 can both be 7 as they are not consecutive.

Write a function:

```function solution(N);```

that, given an integer N, returns the smallest integer greater than N that does not contain two identical consecutive digits.

Examples:

1. Given N = 55, the function should return 56. It is the smallest integer greater than 55 and it does not contain two consecutive digits that are the same.

2. Given N = 1765, the function should return 1767, as explained above.

3. Given N = 98, the answer should be 101. Both 99 and 100 contain two identical consecutive digits, but 101 does not.

4. Given N = 44432, the answer should be 45010.

5. Given N = 3298, the answer should be 3401.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..1,000,000,000].
