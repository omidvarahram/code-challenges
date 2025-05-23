ArraySlicing  
Medium  
50 min  
Given a sequence of distinct integers, split it into the maximum possible number of slices such that sorting the separate slices sorts the full sequence.

Task description  
We are given an array A consisting of N distinct integers. We would like to sort array A into ascending order using a simple algorithm. First, we divide it into one or more slices (a slice is a contiguous subarray). Then we sort each slice. After that, we join the sorted slices in the same order. Write a function ```solution``` that returns the maximum number of slices for which the algorithm will return a correctly sorted array.

Examples:  
1. Given A = [2, 4, 1, 6, 5, 9, 7], the function should return 3. The array can be split into three slices: [2, 4, 1], [6, 5] and [9, 7]. Then, after sorting each slice and joining them together, the whole array will be sorted into ascending order.

2. Given A = [4, 3, 2, 6, 1], the function should return 1. The array cannot be split into smaller slices; it has to be sorted all at once.

3. Given A = [2, 1, 6, 4, 3, 7], the function should return 3.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [1..1,000,000,000];
- the elements of A are all distinct.
