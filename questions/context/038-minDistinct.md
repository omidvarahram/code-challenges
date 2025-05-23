MinDistinct  
Medium  
50 min  
Given an array of N numbers within the range [1..N], find the minimum number of increments and decrements of a single element required to make the array a permutation.

Task description

You are given an array A consisting of N integers within the range [1..N]. In one move, you can increase or decrease the value of any element by 1. After each move, all numbers should remain within the range [1..N].

Your task is to find the smallest required number of moves to make all elements in the array pairwise distinct (in other words, no value can appear in the array more than once).

Write a function:

```function solution(A);```

that, given an array A consisting of N integers, returns the smallest number of moves required to make all elements in the array pairwise distinct. If the result is greater than 1,000,000,000, the function should return −1.

Examples:

1. Given A = [1, 2, 1], the function should return 2, because you can increase A[2] twice: [1, 2, 1] → [1, 2, 2] → [1, 2, 3]. In this example, you could also change the array to the following values in two moves: [3, 2, 1], [1, 3, 2], [2, 3, 1].

2. Given A = [1, 2, 1, 4], the function should return 1, as it is sufficient to decrease A[2] or A[3] by 1, resulting in [2, 1, 3, 4] or [2, 1, 4, 3].

3. Given A = [6, 2, 3, 5, 6, 3], the function should return 4, because you can achieve the following array in four moves: [6, 2, 1, 5, 4, 3].

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..200,000];
- each element of array A is an integer within the range [1..N].
