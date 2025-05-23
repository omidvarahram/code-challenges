EqualSegments  
Medium  
50 min  
Find the maximum number of non-intersecting segments of length 2 with equal sums in a given array of integers.

---

### Task description

You are given an array A of integers. Find the maximum number of non-intersecting segments of length 2 (two adjacent elements), such that segments have an equal sum.

For example, given A = [10, 1, 3, 1, 2, 2, 1, 0, 4], there are three non-intersecting segments, each whose sum is equal to 4: (1, 3), (2, 2), (0, 4).  
Another three non-intersecting segments are: (3, 1), (2, 2), (0, 4).

---

### Write a function:
```function solution(A);```

that, given an array A of N integers, returns the maximum number of segments with equal sums.

---

### Examples:

1. Given A = [10, 1, 3, 1, 2, 2, 1, 0, 4], the function should return 3, as explained above.

2. Given A = [5, 3, 1, 3, 2, 3], the function should return 1.  
   Each sum of two adjacent elements is different from the others.

3. Given A = [9, 9, 9, 9, 9], the function should return 2.

4. Given A = [1, 5, 2, 4, 3, 3], the function should return 3.  
   There are three segments: (1, 5), (2, 4), (3, 3) whose sums are equal to 6.

---

### Write an efficient algorithm for the following assumptions:

- N is an integer within the range [2..100,000];
- each element of array A is an integer within the range [0..1,000,000,000].
